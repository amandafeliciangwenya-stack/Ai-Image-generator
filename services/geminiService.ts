import { GoogleGenAI, Type } from "@google/genai";

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImages = async (prompt: string, numberOfImages: number): Promise<string[]> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: numberOfImages,
        outputMimeType: 'image/jpeg',
        aspectRatio: '16:9',
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("Image generation failed, no images returned.");
    }
    
    return response.generatedImages.map(img => img.image.imageBytes);
  } catch (error) {
    console.error("Error generating images:", error);
    throw new Error("Failed to generate images. The request may have been blocked due to safety policies. Please try a different prompt.");
  }
};

export const generateCaptions = async (prompt: string, count: number): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate ${count} short, exciting, one-sentence captions for sports images related to: "${prompt}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            captions: {
              type: Type.ARRAY,
              description: `An array of ${count} caption strings.`,
              items: {
                type: Type.STRING,
                description: 'A single caption.'
              },
            },
          },
          required: ["captions"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);

    if (parsed.captions && Array.isArray(parsed.captions) && parsed.captions.length > 0) {
      return parsed.captions;
    } else {
      // Fallback if the structure is not as expected
      return Array(count).fill("An epic sports moment.");
    }
  } catch (error) {
    console.error("Error generating captions:", error);
    // Return generic captions on failure
    return Array(count).fill("An incredible display of athleticism.");
  }
};

export const generateChampionStory = async (prompt: string): Promise<{ name: string; story: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Based on the user's image prompt, create a fictional champion.
User Prompt: "${prompt}"

1. Give the champion a cool, memorable, but fictional name.
2. Write a short, inspiring, one-paragraph background story for this champion.

Return the result in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "The fictional champion's name.",
            },
            story: {
              type: Type.STRING,
              description: "The champion's short background story.",
            },
          },
          required: ["name", "story"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);

    if (parsed.name && parsed.story) {
      return { name: parsed.name, story: parsed.story };
    } else {
      // Fallback
      return { name: "The Unnamed Legend", story: `A champion forged in dedication, whose story is told not in words, but in moments of pure brilliance. This image captures one such moment.` };
    }
  } catch (error) {
    console.error("Error generating champion story:", error);
    return { name: "The Unnamed Legend", story: `A champion forged in dedication, whose story is told not in words, but in moments of pure brilliance. This image captures one such moment.` };
  }
};
