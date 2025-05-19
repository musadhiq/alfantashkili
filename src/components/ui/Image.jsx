import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Image = ({ src, alt, className = '' }) => {
    const [isImageViewOpen, setIsImageViewOpen] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const img = new window.Image();
        img.src = src;

        img.onload = () => {
            setDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };
    }, [src]);

    const handleImageClick = () => {
        setIsImageViewOpen(true);
    };

    const closeImageView = () => {
        setIsImageViewOpen(false);
    };

    // Constrain dimensions
    const maxWidth = 800;
    const maxHeight = 500;
    const minWidth = 300;
    const minHeight = 200;

    const constrainedWidth = Math.min(Math.max(dimensions.width, minWidth), maxWidth);
    const constrainedHeight = Math.min(Math.max(dimensions.height, minHeight), maxHeight);

    return (
        <>
            <img
                src={src}
                alt={alt}
                className={className}
                onClick={handleImageClick}
            />

            {isImageViewOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                    onClick={closeImageView}
                >
                    <div
                        className="relative"
                        style={{
                            width: `${constrainedWidth}px`,
                            height: `${constrainedHeight}px`,
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeImageView}
                            className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-1 hover:bg-black z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img
                            src={src}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Image;
