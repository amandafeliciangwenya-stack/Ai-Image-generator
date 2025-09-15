import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import CustomPromptForm from './components/CustomPromptForm';
import ImageGrid from './components/ImageGrid';
import LoadingIndicator from './components/LoadingIndicator';
import { GeneratedImage } from './types';
import { SPORT_CATEGORIES } from './constants';
import * as geminiService from './services/geminiService';

type View = 'categories' | 'generated';

const App: React.FC = () => {
  const [view, setView] = useState<View>('categories');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [generationTitle, setGenerationTitle] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState<string>('');

  const handleGeneration = useCallback(async (prompt: string, title: string, count: number, isCustom: boolean) => {
    setIsLoading(true);
    setError(null);
    setGenerationTitle(title);
    setView('generated');

    try {
      const imageBytesArray = await geminiService.generateImages(prompt, count);
      
      let imagesWithData: GeneratedImage[];

      if (isCustom) {
        // For a single custom image, generate a champion story
        const story = await geminiService.generateChampionStory(title.replace('Results for: ', '').replace(/"/g, ''));
        imagesWithData = imageBytesArray.map((bytes) => ({
          src: `data:image/jpeg;base64,${bytes}`,
          title: story.name,
          description: story.story,
        }));
      } else {
        // For category selections, generate short captions
        const captions = await geminiService.generateCaptions(title, count);
        imagesWithData = imageBytesArray.map((bytes, index) => ({
          src: `data:image/jpeg;base64,${bytes}`,
          title: `${title} Moment`,
          description: captions[index] || `A stunning image of ${title}.`,
        }));
      }

      setGeneratedImages(imagesWithData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCustomSubmit = useCallback((sanitizedPrompt: string) => {
    if (!customPrompt.trim()) return;
    handleGeneration(sanitizedPrompt, `Results for: "${customPrompt}"`, 1, true);
  }, [customPrompt, handleGeneration]);

  const handleBack = () => {
    setView('categories');
    setGeneratedImages([]);
    setError(null);
    setCustomPrompt('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />
        <main className="mt-10">
          {view === 'categories' && (
            <>
              <CategorySelector categories={SPORT_CATEGORIES} />
              <CustomPromptForm 
                prompt={customPrompt} 
                setPrompt={setCustomPrompt} 
                onSubmit={handleCustomSubmit} 
                isLoading={isLoading} 
              />
            </>
          )}

          {view === 'generated' && (
             <div className="flex flex-col items-center">
                <button
                    onClick={handleBack}
                    className="mb-8 px-6 py-2 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 transition-colors duration-300"
                >
                    &larr; Back to Categories
                </button>
                {isLoading && <LoadingIndicator />}
                {error && <div className="text-center p-6 bg-red-900 border border-red-700 rounded-lg"><p className="font-bold text-lg">Generation Failed</p><p>{error}</p></div>}
                {!isLoading && !error && generatedImages.length > 0 && <ImageGrid images={generatedImages} title={generationTitle} />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
