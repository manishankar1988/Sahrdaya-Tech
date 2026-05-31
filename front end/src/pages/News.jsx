import NewsCard from '../components/NewsCard';

export default function News({ data }) {
  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Auto-updated report</p>
        <h1>Global Tech News</h1>
        <p>Backend cron jobs can refresh this feed from configured tech-news sources.</p>
      </div>
      <div className="news-grid">
        {data.news.map((item, index) => (
          <NewsCard item={item} featured={index === 0} key={item.title} />
        ))}
      </div>
    </main>
  );
}
