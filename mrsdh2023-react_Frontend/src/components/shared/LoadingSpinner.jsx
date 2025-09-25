import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <div
                className={`animate-spin rounded-full border-2 border-gray-300 border-t-[#3D4040] ${sizeClasses[size]}`}
            ></div>
            {text && (
                <p className="mt-4 text-gray-600 text-sm font-medium">{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;




