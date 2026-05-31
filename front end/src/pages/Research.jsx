export default function Research({ data }) {
  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Campus research</p>
        <h1>Research and Projects</h1>
        <p>Ideas that connect student learning with practical technology outcomes.</p>
      </div>
      <div className="research-list">
        {data.research.map((item) => (
          <article key={item.title}>
            <span>{item.area}</span>
            <h2>{item.title}</h2>
            <p>{item.mentor}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
