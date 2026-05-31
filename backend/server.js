import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import { runInitialSync, startSyncJobs } from './cronjobs/syncJobs.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import contentRoutes from './routes/contentRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Sahrdaya Tech API' });
});

app.use('/api', contentRoutes);
app.use(notFound);
app.use(errorHandler);

await connectDB();
await runInitialSync();
startSyncJobs();

app.listen(port, () => {
  console.log(`Sahrdaya Tech API running on http://localhost:${port}`);
});
