const { HfInference } = require("@huggingface/inference");
const hf = new HfInference(process.env.HUGGINGFACE_TOKEN);

const generateTasks = async (text) => {
  const response = await hf.textGeneration({
    model: "facebook/bart-large",
    inputs: `Extract actionable to-do tasks:\n${text}`,
    parameters: { max_new_tokens: 150 },
  });

  return response.generated_text
    .split("\n")
    .filter(Boolean)
    .map((line) => ({ text: line.trim(), completed: false }));
};

module.exports = generateTasks;