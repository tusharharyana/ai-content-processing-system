require("dotenv").config();
const { getLatestArticle, publishArticle } = require("./services/laravelApi");
const {
  searchGoogle,
  extractTopBlogLinks,
} = require("./services/googleSearch");
const { scrapeArticleContent } = require("./services/scraper");
const { rewriteArticle } = require("./services/aiRewrite");

(async () => {
  try {
    const article = await getLatestArticle();
    console.log("Article title:", article.title);
    
    const results = await searchGoogle(article.title);
    const links = extractTopBlogLinks(results);

    if (!links.length) {
    console.log("No competitor articles found");
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

  await publishArticle({
    title: article.title + " (Updated)",
    content: updatedContent,
    is_updated: true,
    source_url: article.source_url,
  });

  console.log("Updated article published");

  } catch (err) {
    console.error("Error:", err.message);
  }
})();
