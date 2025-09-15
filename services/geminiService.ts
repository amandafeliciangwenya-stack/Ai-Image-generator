
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
