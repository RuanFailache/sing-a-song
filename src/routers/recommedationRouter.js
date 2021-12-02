import { Router } from 'express';
import * as recommendationsController from '../controllers/recommendationController.js';

const router = new Router();

router.post('/', recommendationsController.addRecommendation);
router.post('/:id/upvote', recommendationsController.upVote);

export default router;
