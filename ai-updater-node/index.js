require("dotenv").config();
const { getOldestUnupdatedArticle, updateArticle } = require("./services/laravelApi");
const {
  searchGoogle,
  extractTopBlogLinks,
} = require("./services/googleSearch");
const { scrapeArticleContent } = require("./services/scraper");
const { rewriteArticle } = require("./services/aiRewrite");

(async () => {
  try {

    console.log("Starting article update process");
    const article = await getOldestUnupdatedArticle();
    
    if (!article) {
      console.log("No unupdated articles found");
      return;
    }
    
    console.log("Article title:", article.title);
    
    const results = await searchGoogle(article.title);
    const links = extractTopBlogLinks(results);

    if (!links.length) {
      console.log("No competitor articles found");
      await updateArticle(article.id, {
    is_updated: true,
  });
      return;
    }

    const referenceLink = links.find(
      (l) => l.includes("ncbi.nlm.nih.gov")
    );

    if (!referenceLink) {
      console.log("No usable reference article");
      return;
    }

    const referenceText = await scrapeArticleContent(referenceLink);

    if (!referenceText) {
      console.log("Reference scraping failed");
      return;
    }

    const updatedContent = await rewriteArticle(
      article.content,
      referenceText,
      referenceLink
    );

    await updateArticle(article.id, {
      content: updatedContent,
      is_updated: true,
    });

    console.log("Updated article published");

  } catch (err) {
    console.error("Error:", err.message);
  }
})();
