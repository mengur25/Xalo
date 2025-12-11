import React, { useState } from 'react';
// import { learningTypes } from '@/types'; // Removed unused import to fix lint

import { learnerProfiles } from '@/data/learnerTypes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearnerCardCarousel = () => {
    // Convert learnerProfiles object to array
    const profiles = Object.values(learnerProfiles);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === profiles.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
        );
    };

    // Calculate visible cards. We want to show 3 cards on desktop, 1 on mobile.
    // Ideally we want a center card focused.

    // Simple implementation: Show 1 active card in center, and parts of others?
    // User asked for "mũi tên hai bên" (arrows on both sides).

    const getVisibleProfile = (offset: number) => {
        const index = (currentIndex + offset + profiles.length) % profiles.length;
        return profiles[index];
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
                {/* Left Arrow */}
                <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-blue-100 border border-gray-200 shadow-md hover:bg-gray-50 transition-colors z-10"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                {/* Cards Container */}
                <div className="flex-1 overflow-hidden relative min-h-[400px] flex items-center justify-center">
                    <div className="flex items-center justify-center gap-4 transition-all duration-500 ease-in-out">
                        {/* We display prev, current, next for effect? Or just current? 
                             The provided static design showed 3 cards overlapping. 
                             Let's try to mimic that rotation effect if possible, or keep it simple.
                             Static Design: Left (rotated -6deg), Center (z-10), Right (rotated 6deg)
                         */}

                        {/* Previous Card (Left) */}
                        <div className="hidden md:block w-48 h-72 bg-white rounded-xl transform -rotate-6 border-4 border-black opacity-60 scale-90 transition-all duration-300">
                            <img
                                src={getVisibleProfile(-1).image}
                                alt=""
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        {/* Current Card (Center) */}
                        <Link to={`/types/${getVisibleProfile(0).name}`} className="block">
                            <div className="w-64 h-96 bg-white rounded-xl z-20 border-4 border-black shadow-2xl transform hover:scale-105 transition-all duration-300 relative cursor-pointer group">
                                <img
                                    src={getVisibleProfile(0).image}
                                    alt={getVisibleProfile(0).name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end rounded-b-lg">
                                    <span className="font-bold text-lg">{getVisibleProfile(0).name}</span>
                                    <span className="text-xs">{getVisibleProfile(0).subtitle}</span>
                                </div>
                            </div>
                        </Link>

                        {/* Next Card (Right) */}
                        <div className="hidden md:block w-48 h-72 bg-white rounded-xl transform rotate-6 border-4 border-black opacity-60 scale-90 transition-all duration-300">
                            <img
                                src={getVisibleProfile(1).image}
                                alt=""
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-blue-100 border border-gray-200 shadow-md hover:bg-gray-50 transition-colors z-10"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>

            {/* Mobile Indicators or Name Display */}
            <div className="text-center mt-6 md:hidden">
                <h3 className="text-2xl font-bold font-bricolage">{getVisibleProfile(0).name}</h3>
                <p className="text-sm text-gray-500">{getVisibleProfile(0).subtitle}</p>
            </div>
        </div>
    );
};

export default LearnerCardCarousel;
