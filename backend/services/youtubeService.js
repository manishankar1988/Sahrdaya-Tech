import Video from '../models/Video.js';
import { fallbackVideos } from '../data/fallbackData.js';

function toEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

export async function fetchLatestVideos() {
  if (!process.env.YOUTUBE_API_KEY) return fallbackVideos;

  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('q', 'latest technology updates AI cybersecurity cloud');
  url.searchParams.set('type', 'video');
  url.searchParams.set('maxResults', '9');
  url.searchParams.set('key', process.env.YOUTUBE_API_KEY);

  const response = await fetch(url);
  const payload = await response.json();

  return (payload.items || []).map((item) => ({
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    topic: 'Tech update',
    embedUrl: toEmbedUrl(item.id.videoId),
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    publishedAt: item.snippet.publishedAt ? new Date(item.snippet.publishedAt) : new Date(),
  }));
}

export async function syncVideos() {
  const items = await fetchLatestVideos();
  await Promise.all(
    items.map((item) =>
      Video.findOneAndUpdate({ url: item.url }, item, { upsert: true, new: true }),
    ),
  );
  return items;
}
