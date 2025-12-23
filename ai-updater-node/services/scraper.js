const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeArticleContent(url) {
  try {
    const { data } = await axios.get(url, {
        timeout: 20000,
        headers: {
            "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            Connection: "keep-alive",
        },
    });

    const $ = cheerio.load(data);

    let content = "";

    const selectors = [
    ".field--name-field-copy-body",
    "article",
    "main",
    ".rich-text",
    ".page-content",
    ".article-content",
    ".entry-content",
    ".content",
    ];

    for (const selector of selectors) {
      if ($(selector).length) {
       content = $(selector)
        .find("p, h1, h2, h3, li")
        .map((_, el) => $(el).text())
        .get()
        .join("\n\n");
        break;
      }
    }

    if (!content || content.length < 500) {
    let longest = "";
    $("section, div").each((_, el) => {
        const text = $(el).text().replace(/\s+/g, " ").trim();
        if (text.length > longest.length && text.length > 800) {
        longest = text;
        }
    });
    content = longest;
    }

    content = content
      .replace(/\s+/g, " ")
      .replace(/References?.*/i, "")
      .trim();

    if (content.length < 300) {
      throw new Error("Content too short");
    }

    return content;
  } catch (error) {
    console.error(`Failed to scrape ${url}`);
    return "";
  }
}

module.exports = {
  scrapeArticleContent,
};
