export default function AchievementTicker({ achievements }) {
  const tickerItems = [...achievements, ...achievements];

  return (
    <section className="achievement-ticker" aria-label="Sahrdaya achievements">
      <div className="ticker-label">Sahrdaya achievements</div>
      <div className="ticker-window">
        <div className="ticker-track">
          {tickerItems.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
