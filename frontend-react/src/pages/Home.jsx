import ArticleList from "../components/ArticleList";

export default function Home() {
  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1>BeyondChats Blog Articles</h1>
      <p>Original and AI-updated articles</p>

      <ArticleList />
    </div>
  );
}
