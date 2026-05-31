export default function DepartmentCard({ department }) {
  return (
    <article className="department-card">
      <span>{department.stats}</span>
      <h3>{department.name}</h3>
      <p>{department.focus}</p>
    </article>
  );
}
