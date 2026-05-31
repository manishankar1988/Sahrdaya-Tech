export default function InternshipCard({ internship }) {
  return (
    <article className="opportunity-card internship">
      <div>
        <span>{internship.duration} · {internship.stipend}</span>
        <h3>{internship.role}</h3>
        <p>{internship.company} · {internship.location}</p>
      </div>
      <div className="skill-row">
        {internship.skills.map((skill) => <small key={skill}>{skill}</small>)}
      </div>
      <a href={internship.applyUrl} target="_blank" rel="noreferrer">Apply from LinkedIn</a>
    </article>
  );
}
