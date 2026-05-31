import cron from 'node-cron';
import mongoose from 'mongoose';
import { syncOpportunities } from '../services/linkedinService.js';
import { syncNews } from '../services/newsService.js';
import { syncVideos } from '../services/youtubeService.js';

export function startSyncJobs() {
  if (mongoose.connection.readyState !== 1) return;
  cron.schedule('0 6 * * *', syncNews);
  cron.schedule('15 6 * * *', syncVideos);
  cron.schedule('30 6 * * *', syncOpportunities);
}

export async function runInitialSync() {
  if (mongoose.connection.readyState !== 1) return;
  await Promise.allSettled([syncNews(), syncVideos(), syncOpportunities()]);
}
