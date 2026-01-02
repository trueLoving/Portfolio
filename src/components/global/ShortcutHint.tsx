import React, { useState, useEffect } from 'react';
import { IoSearch, IoMail, IoDocumentTextOutline, IoClose } from 'react-icons/io5';
import { FaRegKeyboard } from 'react-icons/fa';
import { useI18n } from '../../i18n/context';

interface ShortcutHintProps {
  show?: boolean;
  onToggle?: (show: boolean) => void;
}

export default function ShortcutHint({ show: controlledShow, onToggle }: ShortcutHintProps) {
  const { t } = useI18n();
  // 服务器端和客户端都初始化为 false，避免 hydration mismatch
  // 客户端挂载后再根据实际条件更新
  const [internalShow, setInternalShow] = useState(false);
  // 客户端挂载后设置实际值
  useEffect(() => {
    if (controlledShow === undefined) {
      const saved = localStorage.getItem('showShortcutHint');
      if (saved !== null) {
        setInternalShow(saved === 'true');
      } else {
        // Default: show on desktop, hide on mobile
        const isDesktop = window.innerWidth >= 768;
        setInternalShow(isDesktop);
        localStorage.setItem('showShortcutHint', isDesktop.toString());
      }
    }
  }, [controlledShow]);

  const show = controlledShow !== undefined ? controlledShow : internalShow;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      if (controlledShow === undefined) {
        const isMobile = window.innerWidth < 768;
        if (isMobile && internalShow) {
          setInternalShow(false);
          localStorage.setItem('showShortcutHint', 'false');
        }
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [controlledShow, internalShow]);

  const handleToggle = () => {
    const newShow = !show;
    if (controlledShow === undefined) {
      setInternalShow(newShow);
      if (typeof window !== 'undefined') {
        localStorage.setItem('showShortcutHint', newShow.toString());
      }
    }
    onToggle?.(newShow);
  };

  if (!show) return null;

  const shortcuts = [
    { key: '(CTRL/⌘)+K', label: t('shortcutHint.search'), icon: <IoSearch size={14} /> },
    { key: '(CTRL/⌘)+C', label: t('shortcutHint.contact'), icon: <IoMail size={14} /> },
    { key: '? or (CTRL/⌘)+H', label: t('shortcutHint.help'), icon: <FaRegKeyboard size={14} /> },
    {
      key: '(CTRL/⌘)+M or (CTRL/⌘)+Up',
      label: t('shortcutHint.missionControl'),
      icon: <IoDocumentTextOutline size={14} />,
    },
  ];

  return (
    <div
      className="fixed top-8 left-4 z-[1] animate-fade-in hidden md:block"
      suppressHydrationWarning
    >
      <div className="bg-gray-900/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 shadow-xl relative group">
        <button
          onClick={handleToggle}
          className="absolute -top-2 -right-2 w-5 h-5 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Hide shortcut hints"
          title="Hide shortcut hints"
        >
          <IoClose size={12} className="text-gray-300" />
        </button>
        <div className="flex items-center gap-3 text-sm text-gray-300">
          {shortcuts.map((shortcut, idx) => (
            <React.Fragment key={shortcut.key}>
              {idx > 0 && <span className="text-gray-600">•</span>}
              <div className="flex items-center gap-1.5">
                {shortcut.icon}
                <kbd className="px-1.5 py-0.5 bg-white/10 border border-white/20 rounded text-[10px] font-mono">
                  {shortcut.key}
                </kbd>
                <span className="hidden sm:inline">{shortcut.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
