const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL_URL =
  "https://api-inference.huggingface.co/models/google/flan-t5-large";

  function cleanArticleContent(text) {
  return text
    // Remove comment sections
    .replace(/Leave a Reply[\s\S]*/i, "")
    .replace(/Cancel Reply[\s\S]*/i, "")

    // Remove "More from" / recommendations
    .replace(/More from[\s\S]*/i, "")

    // Remove author/date/category noise
    .replace(/Simran Jain[\s\S]*?Introduction/i, "Introduction")

    // Remove duplicate numbers / junk
    .replace(/\b\d+\s+\d+\b/g, "")

    // Normalize spacing
    .replace(/\s{2,}/g, "\n\n")
    .trim();
}

async function rewriteArticle(original, referenceText, referenceLink) {
    const cleanedOriginal = cleanArticleContent(original);

    const prompt = `
        Rewrite the following article to improve clarity, structure, and depth.

        Original Article:
        ${cleanedOriginal}

        Reference Article (for style only):
        ${referenceText}

        Rules:
        - Do NOT copy sentences
        - Keep original meaning
        - Improve formatting
        - Use headings and paragraphs
        - Return clean markdown

        At the end, add:
        References:
        - ${referenceLink}
        `;

  try {
    const response = await axios.post(
      MODEL_URL,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.7,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 600000,
      }
    );

    return response.data[0].generated_text;
  } catch (error) {
    console.error("Hugging Face API failed");

    return `
## Updated Article

${original}

---

### References
- ${referenceLink}

*(Note: AI rewrite fallback used due to API limitation)*
`;
  }
}

module.exports = {
  rewriteArticle,
};
