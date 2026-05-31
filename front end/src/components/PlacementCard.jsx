export default function PlacementCard({ placement }) {
  return (
    <article className="opportunity-card">
      <div>
        <span>{placement.type}</span>
        <h3>{placement.role}</h3>
        <p>{placement.company} · {placement.location}</p>
      </div>
      <div className="skill-row">
        {placement.skills.map((skill) => <small key={skill}>{skill}</small>)}
      </div>
      <a href={placement.applyUrl} target="_blank" rel="noreferrer">View on LinkedIn</a>
    </article>
  );
}
