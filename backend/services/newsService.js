import News from '../models/News.js';
import { fallbackNews } from '../data/fallbackData.js';

export async function fetchLatestTechNews() {
  if (!process.env.NEWS_API_KEY) return fallbackNews;

  const url = new URL('https://newsapi.org/v2/top-headlines');
  url.searchParams.set('category', 'technology');
  url.searchParams.set('language', 'en');
  url.searchParams.set('pageSize', '12');
  url.searchParams.set('apiKey', process.env.NEWS_API_KEY);

  const response = await fetch(url);
  const payload = await response.json();

  return (payload.articles || []).map((article) => ({
    title: article.title,
    source: article.source?.name || 'Technology feed',
    category: 'Tech',
    summary: article.description || article.content || 'Open the source to read the full report.',
    url: article.url,
    publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
  }));
}

export async function syncNews() {
  const items = await fetchLatestTechNews();
  await Promise.all(
    items.map((item) =>
      News.findOneAndUpdate({ url: item.url }, item, { upsert: true, new: true }),
    ),
  );
  return items;
}
