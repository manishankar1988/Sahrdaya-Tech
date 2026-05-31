import InternshipCard from '../components/InternshipCard';

export default function Internships({ data }) {
  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">Student opportunities</p>
        <h1>Internship Board</h1>
        <p>Internships are grouped around skills, duration, and location for quick scanning.</p>
      </div>
      <div className="opportunity-grid">
        {data.internships.map((internship) => (
          <InternshipCard internship={internship} key={internship.role} />
        ))}
      </div>
    </main>
  );
}
