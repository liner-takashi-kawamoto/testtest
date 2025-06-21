import OpenAI from "openai";
import fs from "fs";
import yaml from "js-yaml";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1-mini";

export async function main() {

  const client = new OpenAI({ baseURL: endpoint, apiKey: token });

  // Read and parse the prompt file
  const promptFile = fs.readFileSync('./dora.prompt.yml', 'utf8');
  const promptData = yaml.load(promptFile);
  const systemMessage = promptData.messages.find(msg => msg.role === 'system');

  const response = await client.chat.completions.create({
    messages: [
        { role:"system", content: systemMessage.content },
        { role:"user", content: "フランスの首都はどこですか？" }
      ],
      temperature: 1.0,
      top_p: 1.0,
      model: model
    });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});