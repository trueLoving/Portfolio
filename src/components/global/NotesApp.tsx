import { useEffect, useState } from 'react';
import {
    FaGraduationCap, FaBriefcase, FaChevronLeft,
    FaCode
} from 'react-icons/fa';
import { userConfig } from '../../config/index';
import DraggableWindow from './DraggableWindow';

export type Section =
    | 'menu'
    | 'education'
    | 'experience'
    | 'skills';

interface NotesAppProps {
    isOpen: boolean;
    onClose: () => void;
    section?: Section; // external control of active section
}

// Type for storing image indices per item
type ImageIndicesState = Record<string, number>;

interface Image {
    url: string;
    alt?: string;
    description?: string;
}

const NotesApp = ({ isOpen, onClose, section }: NotesAppProps) => {
    const [activeSection, setActiveSection] = useState<Section>('menu');
    // Store image indices in an object: { 'itemId': index }
    const [activeImageIndices, setActiveImageIndices] = useState<ImageIndicesState>({});

    const handleSectionClick = (section: Section) => {
        setActiveSection(section);
        // No need to reset image indices globally here, 
        // they are per-item now and will default to 0 if not set
    };

    const handleBackClick = () => {
        setActiveSection('menu');
    };

    // Update image index for a specific item
    const handleNextImage = (itemId: string, images: readonly Image[]) => {
        setActiveImageIndices(prevIndices => ({
            ...prevIndices,
            [itemId]: ((prevIndices[itemId] ?? -1) + 1) % images.length
        }));
    };

    // Update image index for a specific item
    const handlePrevImage = (itemId: string, images: readonly Image[]) => {
        setActiveImageIndices(prevIndices => ({
            ...prevIndices,
            [itemId]: ((prevIndices[itemId] ?? 0) - 1 + images.length) % images.length
        }));
    };

    // Sync external section prop to internal state
    useEffect(() => {
        if (section && section !== activeSection) {
            setActiveSection(section);
        }
    }, [section]);

    if (!isOpen) return null;

    const education = userConfig.education || [];
    const experience = userConfig.experience || [];
    const skills = userConfig.skills || [];

    const renderBackButton = () => (
        <button
            onClick={handleBackClick}
            aria-label="Back to Notes menu"
            className="flex items-center gap-2 text-gray-300 hover:text-gray-100 mb-4"
        >
            <FaChevronLeft />
            <span>Back to Menu</span>
        </button>
    );

    // Accepts itemId to manage state correctly
    const renderImageCarousel = (itemId: string, images: readonly Image[]) => {
        const currentIndex = activeImageIndices[itemId] ?? 0;
        if (!images || images.length === 0 || currentIndex >= images.length) {
            return null;
        }

        return (
            <div className="mt-4">
                <div className="rounded-lg overflow-hidden mb-2">
                    <img
                        src={images[currentIndex].url}
                        alt={images[currentIndex].alt || 'Screenshot'}
                        decoding="async"
                        loading="lazy"
                        className="w-full h-48 object-contain bg-gray-900 rounded-lg"
                    />
                </div>

                <div className="text-sm text-gray-400 mb-3" aria-live="polite">
                    {images[currentIndex].description}
                </div>

                {images.length > 1 && (
                    <div className="flex justify-between mt-2">
                        <button
                            onClick={() => handlePrevImage(itemId, images)}
                            aria-label="Previous image"
                            className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            ←
                        </button>
                        <span className="text-gray-400">
                            {currentIndex + 1} / {images.length}
                        </span>
                        <button
                            onClick={() => handleNextImage(itemId, images)}
                            aria-label="Next image"
                            className="bg-gray-700 hover:bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            →
                        </button>
                    </div>
                )}
            </div>
        );
    };

    const renderEducation = () => (
        <div className="space-y-6">
            {renderBackButton()}
            <h2 className="text-2xl font-bold text-gray-200 mb-6">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {education.map((item, index) => {
                    const itemId = `education-${index}`;
                    return (
                        <div key={itemId} className="bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-semibold text-gray-200 mb-2">{item.degree} {item.major && `- ${item.major}`}</h3>
                            <div className="text-gray-300 mb-2">{item.institution}, {item.location}</div>
                            <div className="text-gray-400 mb-3">{item.year}</div>
                            <p className="text-gray-300 mb-4">{item.description}</p>
                            {item.images && item.images.length > 0 && renderImageCarousel(itemId, item.images)}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderExperience = () => (
        <div className="space-y-6">
            {renderBackButton()}
            <h2 className="text-2xl font-bold text-gray-200 mb-6">Professional Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {experience.map((item, index) => {
                    const itemId = `experience-${index}`;
                    return (
                        <div key={itemId} className="bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-semibold text-gray-200 mb-2">{item.title}</h3>
                            <div className="text-gray-300 mb-2">{item.company}, {item.location}</div>
                            <div className="text-gray-400 mb-3">{item.period}</div>
                            <p className="text-gray-300 mb-4">{item.description}</p>
                            {item.technologies && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.technologies.map((tech, i) => (
                                        <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                            {item.images && item.images.length > 0 && renderImageCarousel(itemId, item.images)}
                        </div>
                    );
                })}
            </div>
        </div>
    );

    const renderSkills = () => {
        // Build a simple frequency map of how many projects use each skill
        const freq: Record<string, number> = {};
        for (const p of (userConfig.projects || [])) {
            for (const t of p.techStack) {
                freq[t] = (freq[t] || 0) + 1;
            }
        }
        const max = Object.values(freq).reduce((a, b) => Math.max(a, b), 1);
        const getIntensity = (skill: string) => {
            const f = freq[skill] || 0;
            const ratio = Math.min(1, f / max);
            // Interpolate from gray-700 to green-600
            const base = 'bg-gray-700';
            if (ratio > 0.66) return 'bg-green-600/70';
            if (ratio > 0.33) return 'bg-green-600/40';
            if (ratio > 0) return 'bg-green-600/20';
            return base;
        };
        return (
            <div className="space-y-6">
                {renderBackButton()}
                <h2 className="text-2xl font-bold text-gray-200 mb-2">Skills</h2>
                <p className="text-sm text-gray-400 mb-4">Intensity shows how often a skill appears across my projects.</p>
                <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {skills.map((skill, index) => (
                            <button
                                key={index}
                                className={`px-3 py-2 rounded text-sm text-gray-100 text-left transition-colors ${getIntensity(skill)} hover:bg-green-500/60`}
                                title={`Used in ${freq[skill] || 0} project(s)`}
                                onClick={() => {/* future: filter projects by skill */}}
                            >
                                <span className="font-medium">{skill}</span>
                                <span className="ml-2 text-xs text-gray-200/70">{freq[skill] || 0}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderMenu = () => (
        <div>
            <h2 className="text-2xl font-bold text-gray-200 mb-6">My Notes</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Education */}
                <button
                    type="button"
                    className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
                    onClick={() => handleSectionClick('education')}
                    aria-label="Open Education section"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                            <FaGraduationCap size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-200">Education</h3>
                    </div>
                    <p className="text-gray-400">View my educational background and qualifications</p>
                </button>

                {/* Experience */}
                <button
                    type="button"
                    className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
                    onClick={() => handleSectionClick('experience')}
                    aria-label="Open Professional Experience section"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                            <FaBriefcase size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-200">Professional Experience</h3>
                    </div>
                    <p className="text-gray-400">Explore my professional work experience</p>
                </button>

                {/* Skills */}
                <button
                    type="button"
                    className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-colors text-left"
                    onClick={() => handleSectionClick('skills')}
                    aria-label="Open Skills section"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                            <FaCode size={28} className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-200">Skills</h3>
                    </div>
                    <p className="text-gray-400">See my technical skills and expertise</p>
                </button>
            </div>
        </div>
    );

    const getWindowTitle = () => {
        switch (activeSection) {
            case 'menu': return 'Notes';
            case 'education': return 'Education Notes';
            case 'experience': return 'Experience Notes';
            case 'skills': return 'Skills Notes';
            default: return 'Notes';
        }
    };

    return (
        <DraggableWindow
            title={getWindowTitle()}
            onClose={onClose}
            initialPosition={{ 
                x: Math.floor(window.innerWidth * 0.3), 
                y: Math.floor(window.innerHeight * 0.2) 
            }}
            className="w-[93vw] md:max-w-4xl max-h-[90vh] flex flex-col"
            initialSize={{ width: 700, height: 600 }}
        >
            <div className="flex flex-col flex-grow min-h-0 h-full">
                <div className="overflow-y-auto flex-grow min-h-0 p-4 md:p-6">
                    {activeSection === 'menu' && renderMenu()}
                    {activeSection === 'education' && renderEducation()}
                    {activeSection === 'experience' && renderExperience()}
                    {activeSection === 'skills' && renderSkills()}
                </div>
            </div>
        </DraggableWindow>
    );
};

export default NotesApp; 