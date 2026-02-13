
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  // Always use a named parameter for the API key and rely directly on process.env.API_KEY.
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const transformImageToOrca = async (base64Image: string): Promise<string> => {
  const ai = getAIClient();
  
  const response = await ai.models.generateContent({
    // Using gemini-2.5-flash-image for general image editing tasks as per model selection rules.
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image.split(',')[1], // Remove metadata prefix
            mimeType: 'image/png',
          },
        },
        {
          text: 'Transform the subject of this photo into a badass cyberpunk Orca warrior. They should wear neon armor, have cybernetic enhancements, and be in a dark, neon-lit underwater city. Maintain the general composition but replace the human/subject with a humanoid Orca character.',
        },
      ],
    },
  });

  // Iterate through parts to find the image data as the response may contain text and image parts.
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data returned from Gemini");
};
