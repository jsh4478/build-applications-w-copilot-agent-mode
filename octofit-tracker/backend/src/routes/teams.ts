import { Router, type Request, type Response } from 'express';
import { TeamModel } from '../models/Team.js';

const router = Router();

// GET all teams
router.get('/', async (_request: Request, response: Response) => {
  const teams = await TeamModel.find().populate('members', 'name email').sort({ totalPoints: -1 }).lean();
  response.json({ message: 'GET /api/teams', teams });
});

// GET team by ID
router.get('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `GET /api/teams/${id}`, teamId: id });
});

// POST create team
router.post('/', (request: Request, response: Response) => {
  response.status(201).json({ message: 'POST /api/teams', team: request.body });
});

// PUT update team
router.put('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `PUT /api/teams/${id}`, teamId: id, updates: request.body });
});

// DELETE team
router.delete('/:id', (request: Request, response: Response) => {
  const { id } = request.params;
  response.json({ message: `DELETE /api/teams/${id}`, teamId: id });
});

export default router;
