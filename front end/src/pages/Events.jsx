export default function Events({ data }) {
  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Campus calendar</p>
        <h1>Events</h1>
        <p>Student-friendly sessions for building, presenting, and preparing for careers.</p>
      </div>
      <div className="event-timeline">
        {data.events.map((event) => (
          <article key={event.title}>
            <time>{event.date}</time>
            <div>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <span>{event.venue}</span>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
