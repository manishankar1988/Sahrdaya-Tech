export default function NewsCard({ item, featured = false }) {
  const date = new Date(item.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <article className={featured ? 'news-card featured' : 'news-card'}>
      <div className="card-meta">
        <span>{item.category}</span>
        <time>{date}</time>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <div className="card-foot">
        <small>{item.source}</small>
        <a href={item.url} target="_blank" rel="noreferrer">Read</a>
      </div>
    </article>
  );
}
