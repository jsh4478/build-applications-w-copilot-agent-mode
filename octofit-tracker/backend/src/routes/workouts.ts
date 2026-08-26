import { Router, type Request, type Response } from 'express';
import { WorkoutModel } from '../models/Workout.js';

const router = Router();

// GET all workouts
router.get('/', async (_request: Request, response: Response) => {
  const workouts = await WorkoutModel.find().sort({ title: 1 }).lean();
  response.json({ message: 'GET /api/workouts', workouts });
});

// GET workout by ID
router.get('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `GET /api/workouts/${id}`, workoutId: id });
});

// POST create workout
router.post('/', (request: Request, response: Response) => {
  response.status(201).json({ message: 'POST /api/workouts', workout: request.body });
});

// PUT update workout
router.put('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `PUT /api/workouts/${id}`, workoutId: id, updates: request.body });
});

// DELETE workout
router.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `DELETE /api/workouts/${id}`, workoutId: id });
});

export default router;
