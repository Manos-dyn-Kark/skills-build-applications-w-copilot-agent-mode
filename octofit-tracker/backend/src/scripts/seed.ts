import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Workout } from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Seed the octofit_db database with test data');
    console.log('Connected to octofit_db');

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    const users = await User.insertMany([
      { name: 'Ava Thompson', email: 'ava@example.com', fitnessLevel: 'advanced' },
      { name: 'Marcus Lee', email: 'marcus@example.com', fitnessLevel: 'intermediate' },
      { name: 'Nia Patel', email: 'nia@example.com', fitnessLevel: 'beginner' },
      { name: 'Leo Martin', email: 'leo@example.com', fitnessLevel: 'advanced' }
    ]);

    const teams = await Team.insertMany([
      { name: 'Trail Blazers', members: 12, focus: 'Endurance' },
      { name: 'Power House', members: 9, focus: 'Strength' },
      { name: 'Core Circuit', members: 8, focus: 'Mobility' }
    ]);

    const activities = await Activity.insertMany([
      { type: 'Run', duration: 42, calories: 380, date: new Date('2026-08-18') },
      { type: 'Strength', duration: 55, calories: 420, date: new Date('2026-08-17') },
      { type: 'Cycling', duration: 35, calories: 310, date: new Date('2026-08-16') },
      { type: 'Yoga', duration: 28, calories: 180, date: new Date('2026-08-15') }
    ]);

    const leaderboardEntries = await LeaderboardEntry.insertMany([
      { rank: 1, user: users[0].name, points: 1420, streak: 12 },
      { rank: 2, user: users[1].name, points: 1385, streak: 9 },
      { rank: 3, user: users[2].name, points: 1310, streak: 7 },
      { rank: 4, user: users[3].name, points: 1260, streak: 5 }
    ]);

    const workouts = await Workout.insertMany([
      { title: 'HIIT Burn', difficulty: 'moderate', duration: 30, goal: 'Cardio' },
      { title: 'Core Stability', difficulty: 'easy', duration: 20, goal: 'Mobility' },
      { title: 'Leg Power', difficulty: 'advanced', duration: 45, goal: 'Strength' },
      { title: 'Recovery Walk', difficulty: 'easy', duration: 25, goal: 'Recovery' }
    ]);

    console.log('Inserted users:', users.length);
    console.log('Inserted teams:', teams.length);
    console.log('Inserted activities:', activities.length);
    console.log('Inserted leaderboard entries:', leaderboardEntries.length);
    console.log('Inserted workouts:', workouts.length);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
