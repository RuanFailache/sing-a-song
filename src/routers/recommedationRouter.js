import { Router } from 'express';
import * as recommendationsController from '../controllers/recommendationController.js';

const router = new Router();

router.post('/', recommendationsController.addRecommendation);
router.post('/:id/upvote', recommendationsController.upVote);
router.post('/:id/downvote', recommendationsController.downVote);
router.get('/random', recommendationsController.random);

export default router;
