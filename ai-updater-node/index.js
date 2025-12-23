require("dotenv").config();
const { getLatestArticle } = require("./services/laravelApi");

(async () => {
  try {
    const article = await getLatestArticle();
    console.log("Fetched article:", article.title);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
