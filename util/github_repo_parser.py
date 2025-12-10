import requests
import json
import os
from typing import Dict, List, Optional, Union
from pathlib import Path

#    export GITHUB_TOKEN='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'
#    python3 util/github_repo_parser.py

class GitHubRepoParser:
    def __init__(self, token: Optional[str] = None, use_tree_api: bool = True):
        self.token = token
        self.headers = {
            'Accept': 'application/vnd.github.v3+json',
        }
        if token:
            self.headers['Authorization'] = f'token {token}'
        
        # Create projects directory if it doesn't exist
        self.projects_dir = Path('src/config/projects')
        self.projects_dir.mkdir(parents=True, exist_ok=True)
        
        # 性能统计
        self.api_calls = 0
        self.directories_parsed = 0
        self.files_found = 0
        self.use_tree_api = use_tree_api  # 是否使用 Tree API 优化

    def get_repo_info(self, owner: str, repo: str) -> Dict:
        """获取仓库基本信息，包括默认分支"""
        self.api_calls += 1
        url = f'https://api.github.com/repos/{owner}/{repo}'
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def get_repo_tree(self, owner: str, repo: str, sha: str) -> Dict:
        """使用 Tree API 获取整个目录树（递归）"""
        self.api_calls += 1
        print(f"📡 API 请求 #{self.api_calls} - 使用 Tree API 获取完整目录树...", end='\r', flush=True)
        
        url = f'https://api.github.com/repos/{owner}/{repo}/git/trees/{sha}?recursive=1'
        response = requests.get(url, headers=self.headers)
        
        if response.status_code == 403:
            error_data = response.json() if response.headers.get('content-type', '').startswith('application/json') else {}
            if 'rate limit exceeded' in str(error_data).lower() or 'X-RateLimit-Remaining' in response.headers:
                remaining = response.headers.get('X-RateLimit-Remaining', '0')
                reset_time = response.headers.get('X-RateLimit-Reset', '0')
                if reset_time != '0':
                    from datetime import datetime
                    reset_datetime = datetime.fromtimestamp(int(reset_time))
                    print(f"\n❌ GitHub API 速率限制已超出！")
                    print(f"   剩余请求数: {remaining}")
                    print(f"   重置时间: {reset_datetime.strftime('%Y-%m-%d %H:%M:%S')}")
                    print(f"\n💡 解决方案:")
                    print(f"   1. 等待速率限制重置（约 1 小时）")
                    print(f"   2. 使用 GitHub Personal Access Token 提高限制（推荐）")
                    print(f"      - 访问: https://github.com/settings/tokens")
                    print(f"      - 创建新 token（至少需要 'public_repo' 权限）")
                    print(f"      - 设置环境变量: export GITHUB_TOKEN='ghp_YOUR_TOKEN'")
                raise requests.exceptions.HTTPError(f"403 Client Error: rate limit exceeded. Remaining: {remaining}")
        
        response.raise_for_status()
        return response.json()
    
    def convert_tree_to_structure(self, tree_data: Dict, repo_name: str) -> Dict:
        """将 Tree API 返回的数据转换为目录结构格式"""
        tree_items = tree_data.get('tree', [])
        
        # 按路径排序，确保父目录在子目录之前处理
        tree_items.sort(key=lambda x: x['path'])
        
        # 构建路径到节点的映射
        path_map = {}
        root = {
            'name': repo_name,
            'type': 'directory',
            'children': []
        }
        path_map[''] = root
        
        # 处理所有树节点
        for item in tree_items:
            path = item['path']
            item_type = item['type']  # 'blob' (文件) 或 'tree' (目录)
            path_parts = path.split('/')
            
            # 找到或创建父目录
            if len(path_parts) == 1:
                # 根目录下的直接子项
                parent = root
                name = path_parts[0]
            else:
                # 需要构建父路径
                parent_path = '/'.join(path_parts[:-1])
                name = path_parts[-1]
                
                # 确保所有父目录都存在
                current_path = ''
                for i, part in enumerate(path_parts[:-1]):
                    if current_path:
                        current_path += '/' + part
                    else:
                        current_path = part
                    
                    if current_path not in path_map:
                        # 创建父目录
                        parent_dir = {
                            'name': part,
                            'type': 'directory',
                            'children': []
                        }
                        # 找到父目录的父目录
                        if i == 0:
                            parent_parent = root
                        else:
                            grandparent_path = '/'.join(path_parts[:i])
                            parent_parent = path_map.get(grandparent_path, root)
                        
                        parent_parent['children'].append(parent_dir)
                        path_map[current_path] = parent_dir
                        self.directories_parsed += 1
                
                parent = path_map[parent_path]
            
            # 添加当前节点
            if item_type == 'tree':  # 目录
                if path not in path_map:
                    dir_node = {
                        'name': name,
                        'type': 'directory',
                        'children': []
                    }
                    parent['children'].append(dir_node)
                    path_map[path] = dir_node
                    self.directories_parsed += 1
            else:  # 文件 (blob)
                file_node = {
                    'name': name,
                    'type': 'file'
                }
                parent['children'].append(file_node)
                self.files_found += 1
        
        return root
    
    def get_repo_contents(self, owner: str, repo: str, path: str = '') -> List[Dict]:
        """Get contents of a repository path (传统方法，作为回退)"""
        url = f'https://api.github.com/repos/{owner}/{repo}/contents/{path}'
        self.api_calls += 1
        
        # 显示进度（每10个请求显示一次，避免刷屏）
        if self.api_calls % 10 == 0 or self.api_calls == 1:
            print(f"📡 API 请求 #{self.api_calls} - 正在获取: {path or '根目录'}", end='\r', flush=True)
        
        response = requests.get(url, headers=self.headers)
        
        if response.status_code == 403:
            error_data = response.json() if response.headers.get('content-type', '').startswith('application/json') else {}
            if 'rate limit exceeded' in str(error_data).lower() or 'X-RateLimit-Remaining' in response.headers:
                remaining = response.headers.get('X-RateLimit-Remaining', '0')
                reset_time = response.headers.get('X-RateLimit-Reset', '0')
                if reset_time != '0':
                    from datetime import datetime
                    reset_datetime = datetime.fromtimestamp(int(reset_time))
                    print(f"\n❌ GitHub API 速率限制已超出！")
                    print(f"   剩余请求数: {remaining}")
                    print(f"   重置时间: {reset_datetime.strftime('%Y-%m-%d %H:%M:%S')}")
                    print(f"\n💡 解决方案:")
                    print(f"   1. 等待速率限制重置（约 1 小时）")
                    print(f"   2. 使用 GitHub Personal Access Token 提高限制（推荐）")
                    print(f"      - 访问: https://github.com/settings/tokens")
                    print(f"      - 创建新 token（至少需要 'public_repo' 权限）")
                    print(f"      - 设置环境变量: export GITHUB_TOKEN='ghp_YOUR_TOKEN'")
                raise requests.exceptions.HTTPError(f"403 Client Error: rate limit exceeded. Remaining: {remaining}")
        
        response.raise_for_status()
        return response.json()

    def parse_directory(self, owner: str, repo: str, path: str = '') -> Dict:
        """Recursively parse a directory structure (传统方法，作为回退)"""
        display_path = path or '根目录'
        print(f"📁 解析目录: {display_path} (已解析 {self.directories_parsed} 个目录, {self.files_found} 个文件)", end='\r', flush=True)
        
        contents = self.get_repo_contents(owner, repo, path)
        self.directories_parsed += 1
        
        result = {
            'name': Path(path).name if path else repo,
            'type': 'directory',
            'children': []
        }

        for item in contents:
            if item['type'] == 'dir':
                result['children'].append(self.parse_directory(owner, repo, item['path']))
            else:
                self.files_found += 1
                result['children'].append({
                    'name': item['name'],
                    'type': 'file'
                })

        return result
    
    def parse_directory_tree_api(self, owner: str, repo: str) -> Dict:
        """使用 Tree API 解析整个目录结构（快速方法）"""
        print(f"🚀 使用 Tree API 快速解析仓库: {owner}/{repo}")
        print("=" * 60)
        
        import time
        start_time = time.time()
        
        try:
            # 步骤 1: 获取仓库信息和默认分支 SHA
            print("📡 步骤 1/3: 获取仓库信息...", end='\r', flush=True)
            repo_info = self.get_repo_info(owner, repo)
            default_branch = repo_info.get('default_branch', 'main')
            
            # 步骤 1.5: 获取默认分支的 SHA
            print("📡 步骤 2/3: 获取默认分支 SHA...", end='\r', flush=True)
            self.api_calls += 1
            branch_url = f'https://api.github.com/repos/{owner}/{repo}/branches/{default_branch}'
            branch_response = requests.get(branch_url, headers=self.headers)
            branch_response.raise_for_status()
            default_branch_sha = branch_response.json()['commit']['sha']
            
            # 步骤 3: 使用 Tree API 获取完整目录树
            print("📡 步骤 3/3: 获取完整目录树（递归）...", end='\r', flush=True)
            tree_data = self.get_repo_tree(owner, repo, default_branch_sha)
            
            # 步骤 4: 转换数据格式
            print("🔄 转换数据格式...", end='\r', flush=True)
            structure = self.convert_tree_to_structure(tree_data, repo)
            
            elapsed_time = time.time() - start_time
            print(f"\n{'=' * 60}")
            print(f"✅ 解析完成！")
            print(f"   📊 统计信息:")
            print(f"      - API 请求数: {self.api_calls} (Tree API 优化)")
            print(f"      - 目录数: {self.directories_parsed}")
            print(f"      - 文件数: {self.files_found}")
            print(f"      - 耗时: {elapsed_time:.2f} 秒")
            print(f"      - 平均速度: {self.files_found/elapsed_time:.2f} 文件/秒" if elapsed_time > 0 else "")
            print()
            
            return structure
            
        except Exception as e:
            print(f"\n⚠️  Tree API 失败: {str(e)}")
            print("🔄 回退到传统方法...\n")
            self.use_tree_api = False
            # 重置统计
            self.api_calls = 0
            self.directories_parsed = 0
            self.files_found = 0
            return self.parse_directory(owner, repo, '')

    def create_project_json(self, owner: str, repo: str, title: str, description: str, 
                          repo_url: str, live_url: str, tech_stack: List[str]) -> Dict:
        """Create a project JSON object in the required format"""
        # 重置统计
        self.api_calls = 0
        self.directories_parsed = 0
        self.files_found = 0
        
        # 根据配置选择解析方法
        if self.use_tree_api:
            structure = self.parse_directory_tree_api(owner, repo)
        else:
            print(f"\n🚀 开始解析仓库: {owner}/{repo} (传统方法)")
            print("=" * 60)
            import time
            start_time = time.time()
            structure = self.parse_directory(owner, repo)
            elapsed_time = time.time() - start_time
            print(f"\n{'=' * 60}")
            print(f"✅ 解析完成！")
            print(f"   📊 统计信息:")
            print(f"      - API 请求数: {self.api_calls}")
            print(f"      - 目录数: {self.directories_parsed}")
            print(f"      - 文件数: {self.files_found}")
            print(f"      - 耗时: {elapsed_time:.2f} 秒")
            print(f"      - 平均速度: {self.api_calls/elapsed_time:.2f} 请求/秒" if elapsed_time > 0 else "")
            print()
        
        return {
            'id': repo.lower(),
            'title': title,
            'description': description,
            'repoUrl': repo_url,
            'liveUrl': live_url,
            'techStack': tech_stack,
            'structure': {
                'root': repo,
                'children': structure['children']
            },
            'images': []  # You can add images manually later
        }

    def save_project_json(self, project_json: Dict) -> str:
        """Save project JSON to file and return the relative path"""
        filename = f"{project_json['id']}.json"
        filepath = self.projects_dir / filename
        
        with open(filepath, 'w') as f:
            json.dump(project_json, f, indent=4)
        
        return str(filepath.relative_to('src/config'))
    
def main():
    # 从环境变量读取 GitHub Token（可选）
    # 使用 token 可以提高 API 速率限制：从 60/小时 提升到 5000/小时
    github_token = os.getenv('GITHUB_TOKEN') or None
    
    if not github_token:
        print("⚠️  未提供 GitHub Token，使用匿名访问（速率限制：60 次/小时）")
        print("💡 提示: 设置环境变量 GITHUB_TOKEN 以提高限制\n")
    else:
        print("✅ 使用 GitHub Token，速率限制：5000 次/小时\n")
    
    parser = GitHubRepoParser(token=github_token)
    
    # Example project details
    # 修改以下参数以解析不同的仓库
    project_json = parser.create_project_json(
        owner='trueLoving', #dont forget to change this to your github username
        repo='Stationuli', #dont forget to change this to your github repo name
        title='Stationuli', #dont forget to change this to your project title
        description='🔗 Stationuli - Fully Offline & Private P2P Transfer & Control | PC-Android Bridge', #dont forget to change this to your project description
        repo_url='https://github.com/trueLoving/Stationuli', #dont forget to change this to your github repo url
        live_url='https://github.com/trueLoving/Stationuli/releases/tag/v0.0.1', #dont forget to change this to your live website url or leave it blank if you dont have one
        tech_stack=['React', 'TypeScript', 'Tailwind CSS', 'Tauri', 'Rust'] #dont forget to change this to your project tech stack
    )

    # Save project JSON and get the path
    project_path = parser.save_project_json(project_json)
    print(f"Project JSON saved to: {project_path}")

if __name__ == '__main__':
    main() 