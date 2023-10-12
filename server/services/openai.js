const { OpenAI } = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const runPrompt = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      engine: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.8,
    });

    return response.choices[0].text;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
};

module.exports = {
  runPrompt
};
