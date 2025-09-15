import React from 'react';
import { GeneratedImage } from '../types';

interface ImageGridProps {
  images: GeneratedImage[];
  title: string;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, title }) => {

  const handleDownload = (src: string) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `ai-sports-image-${Date.now()}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (src: string, title: string, description: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const file = new File([blob], 'ai-sports-image.jpeg', { type: blob.type });
      const text = `${title}\n\n${description}`;

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'AI Generated Sports Image',
          text: text,
        });
      } else if (navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ]);
        alert('Image copied to clipboard!');
      } else {
        alert('Sharing and copying are not supported on your browser.');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      alert('Could not share or copy the image.');
    }
  };


  return (
    <div className="w-full animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className={`grid gap-6 ${images.length > 1 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'max-w-4xl mx-auto'}`}>
        {images.map((image, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-xl flex flex-col">
            <div className="relative group">
              <img src={image.src} alt={image.title} className="w-full h-auto object-cover aspect-video" />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                 <p className="text-white text-center">{image.description}</p>
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-teal-300">{image.title}</h3>
                <p className="text-gray-300 text-sm mt-2 mb-4">{image.description}</p>
              </div>
              <div className="flex items-center justify-end gap-2 mt-auto pt-2 border-t border-gray-700">
                <button
                  onClick={() => handleDownload(image.src)}
                  title="Download Image"
                  className="flex items-center px-3 py-2 bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors duration-200"
                  aria-label="Download image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  <span className="ml-2 text-sm font-medium">Download</span>
                </button>
                 <button
                  onClick={() => handleShare(image.src, image.title, image.description)}
                  title="Share Image"
                  className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500 transition-colors duration-200"
                  aria-label="Share image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.186 2.25 2.25 0 0 0-3.933 2.186Z" /></svg>
                  <span className="ml-2 text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
