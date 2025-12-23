import ArticleList from "../components/ArticleList";

export default function Home() {
  return (
    <div className="container">
      <h1>BeyondChats Blog</h1>
      <p>Original and AI-updated articles</p>

      <ArticleList />
    </div>
  );
}
