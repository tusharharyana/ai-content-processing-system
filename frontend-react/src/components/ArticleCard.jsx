import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>{article.title}</h3>

      <span
        style={{
          display: "inline-block",
          marginBottom: "10px",
          padding: "4px 10px",
          fontSize: "12px",
          borderRadius: "20px",
          background: article.is_updated ? "#dcfce7" : "#e5e7eb",
          color: "#065f46",
        }}
      >
        {article.is_updated ? "AI Updated" : "Original"}
      </span>

      <p style={{ color: "#374151" }}>
        {article.content.slice(0, 180)}...
      </p>

      <Link
        to={`/articles/${article.id}`}
        style={{
          display: "inline-block",
          marginTop: "12px",
          color: "#2563eb",
          fontWeight: "500",
          textDecoration: "none",
        }}
      >
        Read more →
      </Link>
    </div>
  );
}
