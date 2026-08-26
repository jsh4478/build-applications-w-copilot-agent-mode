import { Router, type Request, type Response } from 'express';
import { UserModel } from '../models/User.js';

const router = Router();

// GET all users
router.get('/', async (_request: Request, response: Response) => {
  const users = await UserModel.find().sort({ name: 1 }).lean();
  response.json({ message: 'GET /api/users', users });
});

// GET user by ID
router.get('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `GET /api/users/${id}`, userId: id });
});

// POST create user
router.post('/', (request: Request, response: Response) => {
  response.status(201).json({ message: 'POST /api/users', user: request.body });
});

// PUT update user
router.put('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `PUT /api/users/${id}`, userId: id, updates: request.body });
});

// DELETE user
router.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `DELETE /api/users/${id}`, userId: id });
});

export default router;
