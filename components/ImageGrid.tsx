
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageGridProps {
  images: GeneratedImage[];
  title: string;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, title }) => {
  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className={`grid gap-6 ${images.length > 1 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'max-w-4xl mx-auto'}`}>
        {images.map((image, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-105">
            <img src={image.src} alt={image.caption} className="w-full h-auto object-cover aspect-video" />
            <div className="p-4">
              <p className="text-gray-300 text-sm">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
