import { Router, type Request, type Response } from 'express';
import { LeaderboardModel } from '../models/Leaderboard.js';

const router = Router();
type LeaderboardPeriod = 'weekly' | 'monthly' | 'all-time';

// GET leaderboard
router.get('/', async (_request: Request, response: Response) => {
  const leaderboard = await LeaderboardModel.find({ period: 'weekly' })
    .populate('user', 'name avatar')
    .sort({ rank: 1 })
    .lean();
  response.json({ message: 'GET /api/leaderboard', leaderboard });
});

// GET leaderboard by timeframe
router.get('/:timeframe', async (request: Request, response: Response) => {
  const timeframe = String(request.params.timeframe) as LeaderboardPeriod;
  const leaderboard = await LeaderboardModel.find({ period: timeframe })
    .populate('user', 'name avatar')
    .sort({ rank: 1 })
    .lean();
  response.json({ message: `GET /api/leaderboard/${timeframe}`, timeframe, leaderboard });
});

export default router;
