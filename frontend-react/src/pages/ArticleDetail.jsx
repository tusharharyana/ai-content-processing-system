import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/articles/${id}`)
      .then((res) => setArticle(res.data));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div className="container">
      <Link to="/" style={{ color: "#2563eb" }}>
        ← Back
      </Link>

      <h1 style={{ marginTop: "20px" }}>{article.title}</h1>

      <span
        style={{
          display: "inline-block",
          margin: "10px 0",
          padding: "4px 10px",
          borderRadius: "20px",
          background: article.is_updated ? "#dcfce7" : "#e5e7eb",
        }}
      >
        {article.is_updated ? "AI Updated" : "Original"}
      </span>

      <div
        style={{
          marginTop: "20px",
          whiteSpace: "pre-line",
          color: "#1f2937",
        }}
      >
        {article.content}
      </div>
    </div>
  );
}
