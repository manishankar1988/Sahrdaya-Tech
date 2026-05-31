export default function Hero({ leadStory }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">SAHRDAYA-TECH daily front page</p>
        <h1>Sahrdaya Tech</h1>
        <p className="hero-text">
          A friendly campus tech blog that turns global technology updates, student achievements,
          videos, placements, and internships into one readable report.
        </p>
        <div className="hero-actions">
          <a className="primary-action" href="#/news">Read latest report</a>
          <a className="secondary-action" href="#/placements">Find opportunities</a>
        </div>
      </div>
      <article className="lead-report">
        <span>{leadStory?.category || 'Tech brief'}</span>
        <h2>{leadStory?.title}</h2>
        <p>{leadStory?.summary}</p>
        <a href={leadStory?.url} target="_blank" rel="noreferrer">Open source</a>
      </article>
    </section>
  );
}
