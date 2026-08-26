import { Router, type Request, type Response } from 'express';
import { ActivityModel } from '../models/Activity.js';

const router = Router();

// GET all activities
router.get('/', async (_request: Request, response: Response) => {
  const activities = await ActivityModel.find().populate('user', 'name email').sort({ completedAt: -1 }).lean();
  response.json({ message: 'GET /api/activities', activities });
});

// GET activity by ID
router.get('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `GET /api/activities/${id}`, activityId: id });
});

// POST log activity
router.post('/', (request: Request, response: Response) => {
  response.status(201).json({ message: 'POST /api/activities', activity: request.body });
});

// PUT update activity
router.put('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `PUT /api/activities/${id}`, activityId: id, updates: request.body });
});

// DELETE activity
router.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `DELETE /api/activities/${id}`, activityId: id });
});

export default router;
