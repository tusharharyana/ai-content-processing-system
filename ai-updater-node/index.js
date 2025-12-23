require("dotenv").config();
const { getLatestArticle } = require("./services/laravelApi");
const {
  searchGoogle,
  extractTopBlogLinks,
} = require("./services/googleSearch");
const { scrapeArticleContent } = require("./services/scraper");

(async () => {
  try {
    const article = await getLatestArticle();
    console.log("Article title:", article.title);
    
    const results = await searchGoogle(article.title);
    const links = extractTopBlogLinks(results);

    console.log("Top competitor links:", links);

    for (const link of links) {
      console.log("\nScraping:", link);
      const content = await scrapeArticleContent(link);
      console.log("Content length:", content.length);
  }

  } catch (err) {
    console.error("Error:", err.message);
  }
})();
