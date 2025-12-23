export default function ArticleCard({ article }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
      }}
    >
      <h3>{article.title}</h3>

      <span
        style={{
          padding: "4px 8px",
          fontSize: "12px",
          borderRadius: "4px",
          background: article.is_updated ? "#d1fae5" : "#e5e7eb",
        }}
      >
        {article.is_updated ? "AI Updated" : "Original"}
      </span>

      <p style={{ marginTop: "8px", color: "#555" }}>
        {article.content.slice(0, 200)}...
      </p>
    </div>
  );
}
