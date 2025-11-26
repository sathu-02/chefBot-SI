import { GoogleGenerativeAI } from "@google/generative-ai";
require("dotenv").config();

const apiKey = process.env.GOOGLE_API;

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(apiKey);

// Gemini supports only certain models like "gemini-pro"
const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

export async function getRecipeFromGemini(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nI have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
            },
          ],
        },
      ],
    });

    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (err) {
    console.error("Gemini API Error:", err.message);
    return "Sorry, I couldn't generate a recipe at the moment.";
  }
}
