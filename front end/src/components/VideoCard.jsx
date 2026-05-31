export default function VideoCard({ video }) {
  return (
    <article className="video-card">
      <iframe
        src={video.embedUrl}
        title={video.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div>
        <span>{video.topic}</span>
        <h3>{video.title}</h3>
        <p>{video.channel}</p>
        <a href={video.url} target="_blank" rel="noreferrer">More on YouTube</a>
      </div>
    </article>
  );
}
