
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
	apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(config);

const runPrompt = async (prompt) => {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 0.8,
	});

	return response.data.choices[0].text;
};

module.exports = {
  runPrompt
};
