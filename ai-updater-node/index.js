require("dotenv").config();
const { getLatestArticle } = require("./services/laravelApi");
const {
  searchGoogle,
  extractTopBlogLinks,
} = require("./services/googleSearch");

(async () => {
  try {
    const article = await getLatestArticle();
    console.log("Article title:", article.title);
    
    const results = await searchGoogle(article.title);
    const links = extractTopBlogLinks(results);

    console.log("Top competitor links:", links);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
