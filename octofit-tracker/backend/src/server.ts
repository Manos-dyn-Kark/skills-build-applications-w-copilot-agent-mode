import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { LeaderboardEntry } from './models/LeaderboardEntry';
import { Workout } from './models/Workout';

dotenv.config();

const app: Express = express();
const PORT = Number(process.env.PORT ?? 8000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB at octofit_db');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

const sendCollectionResponse = async (
  res: Response,
  collection: string,
  fetcher: () => Promise<unknown[]>
) => {
  try {
    const data = await fetcher();
    res.json({ collection, count: data.length, data, apiBaseUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    res.status(500).json({ collection, error: message, apiBaseUrl });
  }
};

app.get('/api', (req: Request, res: Response) => {
  res.json({
    service: 'Octofit Tracker API',
    version: '1.0.0',
    baseUrl: apiBaseUrl,
    endpoints: ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts']
  });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Octofit Tracker Backend is running', apiBaseUrl });
});

app.get('/api/users', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'users', async () => User.find({}).lean());
});

app.get('/api/users/', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'users', async () => User.find({}).lean());
});

app.get('/api/teams', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'teams', async () => Team.find({}).lean());
});

app.get('/api/teams/', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'teams', async () => Team.find({}).lean());
});

app.get('/api/activities', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'activities', async () => Activity.find({}).sort({ date: -1 }).lean());
});

app.get('/api/activities/', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'activities', async () => Activity.find({}).sort({ date: -1 }).lean());
});

app.get('/api/leaderboard', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'leaderboard', async () => LeaderboardEntry.find({}).sort({ rank: 1 }).lean());
});

app.get('/api/leaderboard/', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'leaderboard', async () => LeaderboardEntry.find({}).sort({ rank: 1 }).lean());
});

app.get('/api/workouts', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'workouts', async () => Workout.find({}).lean());
});

app.get('/api/workouts/', async (req: Request, res: Response) => {
  await sendCollectionResponse(res, 'workouts', async () => Workout.find({}).lean());
});

const server = app.listen(PORT, () => {
  console.log(`Octofit Tracker Backend server running on ${apiBaseUrl}`);
  console.log(`Environment: ${process.env.NODE_ENV ?? 'development'}`);
});

export { app, server, apiBaseUrl, PORT };
export default app;
