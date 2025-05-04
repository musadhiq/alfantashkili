import { X } from 'lucide-react';
import { useState } from 'react';

const Image = ({ src, alt, className = '' }) => {
    const [isImageViewOpen, setIsImageViewOpen] = useState(false);

    const handleImageClick = () => {
        setIsImageViewOpen(true);
    };
    const closeImageView = () => {
        setIsImageViewOpen(false);
    };

    return (
        <>
            <img src={src} alt={alt} className={className} onClick={handleImageClick} />

            {isImageViewOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
                    onClick={closeImageView}
                >
                    <div className="relative max-w-4xl w-full mx-auto p-4">
                        <button
                            onClick={closeImageView}
                            className="absolute top-2 right-2 text-white bg-black/60 rounded-full p-1 hover:bg-black"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <img
                            src={src}
                            alt="Preview"
                            className="w-full max-h-[90vh] object-contain rounded-lg"
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Image
