import VideoCard from '../components/VideoCard';

export default function Videos({ data }) {
  return (
    <main className="page-shell">
      <div className="page-title">
        <p className="eyebrow">YouTube gallery</p>
        <h1>Important Tech Videos</h1>
        <p>Curated channels and search feeds help students keep up with fast-moving technology.</p>
      </div>
      <div className="video-grid">
        {data.videos.map((video) => (
          <VideoCard video={video} key={video.title} />
        ))}
      </div>
    </main>
  );
}
