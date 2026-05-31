import PlacementCard from '../components/PlacementCard';

export default function Placements({ data }) {
  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">LinkedIn powered</p>
        <h1>Placement Desk</h1>
        <p>Entry-level roles are listed with skills so students can quickly judge fit.</p>
      </div>
      <div className="opportunity-grid">
        {data.placements.map((placement) => (
          <PlacementCard placement={placement} key={placement.role} />
        ))}
      </div>
    </main>
  );
}
