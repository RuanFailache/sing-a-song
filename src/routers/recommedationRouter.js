import { Router } from 'express';
import * as recommendationsController from '../controllers/recommendationController.js';

const router = new Router();

router.post('/recommendations', recommendationsController.addRecommendation);
router.post('/recommendations/:id/upvote', recommendationsController.upVote);

export default router;
