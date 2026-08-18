import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const PORT = Number(process.env.PORT ?? 8000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

const users = [
  { id: 1, name: 'Ava Thompson', email: 'ava@example.com', fitnessLevel: 'advanced' },
  { id: 2, name: 'Marcus Lee', email: 'marcus@example.com', fitnessLevel: 'intermediate' },
  { id: 3, name: 'Nia Patel', email: 'nia@example.com', fitnessLevel: 'beginner' }
];

const teams = [
  { id: 1, name: 'Trail Blazers', members: 12, focus: 'Endurance' },
  { id: 2, name: 'Power House', members: 9, focus: 'Strength' },
  { id: 3, name: 'Core Circuit', members: 8, focus: 'Mobility' }
];

const activities = [
  { id: 1, type: 'Run', duration: 42, calories: 380, date: '2026-08-18' },
  { id: 2, type: 'Strength', duration: 55, calories: 420, date: '2026-08-17' },
  { id: 3, type: 'Cycling', duration: 35, calories: 310, date: '2026-08-16' }
];

const leaderboard = [
  { rank: 1, user: 'Ava Thompson', points: 1420, streak: 12 },
  { rank: 2, user: 'Marcus Lee', points: 1385, streak: 9 },
  { rank: 3, user: 'Nia Patel', points: 1310, streak: 7 }
];

const workouts = [
  { id: 1, title: 'HIIT Burn', difficulty: 'moderate', duration: 30, goal: 'Cardio' },
  { id: 2, title: 'Core Stability', difficulty: 'easy', duration: 20, goal: 'Mobility' },
  { id: 3, title: 'Leg Power', difficulty: 'advanced', duration: 45, goal: 'Strength' }
];

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

const sendCollectionResponse = (res: Response, collection: string, payload: unknown[]) => {
  res.json({ collection, count: payload.length, data: payload, apiBaseUrl });
};

app.get('/api/users', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'users', users);
});

app.get('/api/users/', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'users', users);
});

app.get('/api/teams', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'teams', teams);
});

app.get('/api/teams/', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'teams', teams);
});

app.get('/api/activities', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'activities', activities);
});

app.get('/api/activities/', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'activities', activities);
});

app.get('/api/leaderboard', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'leaderboard', leaderboard);
});

app.get('/api/leaderboard/', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'leaderboard', leaderboard);
});

app.get('/api/workouts', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'workouts', workouts);
});

app.get('/api/workouts/', (req: Request, res: Response) => {
  sendCollectionResponse(res, 'workouts', workouts);
});

app.listen(PORT, () => {
  console.log(`Octofit Tracker Backend server running on ${apiBaseUrl}`);
  console.log(`Environment: ${process.env.NODE_ENV ?? 'development'}`);
});

export default app;
