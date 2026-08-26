import mongoose from 'mongoose';
import { ActivityModel } from '../models/Activity.js';
import { LeaderboardModel } from '../models/Leaderboard.js';
import { TeamModel } from '../models/Team.js';
import { UserModel } from '../models/User.js';
import { WorkoutModel } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}), TeamModel.deleteMany({}), ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}), WorkoutModel.deleteMany({}),
    ]);

    const [maya, jordan, priya] = await UserModel.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', avatar: 'MC', goals: ['Build endurance', 'Run a 10K'] },
      { name: 'Jordan Brooks', email: 'jordan.brooks@example.com', avatar: 'JB', goals: ['Gain strength', 'Train consistently'] },
      { name: 'Priya Shah', email: 'priya.shah@example.com', avatar: 'PS', goals: ['Improve mobility', 'Recover well'] },
    ]);

    await TeamModel.create([
      { name: 'Trailblazers', motto: 'Small steps, strong finish', members: [maya._id, priya._id], totalPoints: 1240 },
      { name: 'Peak Performers', motto: 'Show up and rise', members: [jordan._id], totalPoints: 980 },
    ]);

    await ActivityModel.create([
      { user: maya._id, type: 'run', durationMinutes: 42, distanceKm: 6.4, calories: 460, completedAt: new Date('2026-08-24T07:30:00Z') },
      { user: jordan._id, type: 'strength', durationMinutes: 50, calories: 390, completedAt: new Date('2026-08-23T17:45:00Z') },
      { user: priya._id, type: 'walk', durationMinutes: 35, distanceKm: 2.8, calories: 180, completedAt: new Date('2026-08-22T08:15:00Z') },
    ]);

    await LeaderboardModel.create([
      { user: maya._id, points: 520, rank: 1, period: 'weekly' },
      { user: jordan._id, points: 430, rank: 2, period: 'weekly' },
      { user: priya._id, points: 290, rank: 3, period: 'weekly' },
    ]);

    await WorkoutModel.create([
      { title: 'Progressive Full Body', category: 'strength', difficulty: 'intermediate', durationMinutes: 35, exercises: ['Goblet squats', 'Push-ups', 'Bent-over rows'], recommendedFor: [jordan._id] },
      { title: 'Steady State Run', category: 'cardio', difficulty: 'beginner', durationMinutes: 30, exercises: ['Warm-up walk', 'Easy run', 'Cool-down stretch'], recommendedFor: [maya._id] },
      { title: 'Desk Reset Mobility', category: 'mobility', difficulty: 'beginner', durationMinutes: 15, exercises: ['Cat-cow', 'Hip flexor stretch', 'Thoracic rotations'], recommendedFor: [priya._id] },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
