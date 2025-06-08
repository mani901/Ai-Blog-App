import { GoogleGenerativeAI } from "@google/generative-ai";

const initializeGemini = () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};


// Helper function to generate content
export const generateContent = async (prompt) => {
    try {
        const model = initializeGemini();
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
};


