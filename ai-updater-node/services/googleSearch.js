const axios = require("axios");

const SERPER_API_KEY = process.env.SERPER_API_KEY;

async function searchGoogle(query) {
  console.log("Searching Google for:", query);
  const response = await axios.post(
    "https://google.serper.dev/search",
    {
      q: query,
      num: 5,
    },
    {
      headers: {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.organic || [];
}

function extractTopBlogLinks(results) {
  return results
    .filter(
      (r) =>
        r.link &&
        !r.link.includes("beyondchats.com") &&
        (r.link.includes("/blog") ||
          r.link.includes("/article") ||
          r.link.includes("/posts"))
    )
    .slice(0, 2)
    .map((r) => r.link);
}

module.exports = {
  searchGoogle,
  extractTopBlogLinks,
};
