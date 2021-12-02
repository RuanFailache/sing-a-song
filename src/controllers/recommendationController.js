import * as recommendationSchema from '../schemas/recommedationSchema.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';
import * as recommendationService from '../services/recommendationService.js';

export const addRecommendation = async (req, res) => {
  const {
    name,
    youtubeLink,
  } = req.body;

  const { error } = recommendationSchema.addRecommendation.validate({ name, youtubeLink });

  if (error) {
    return res.sendStatus(400);
  }

  try {
    await recommendationRepository.addRecommendation(name, youtubeLink);
    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
};

export const upVote = async (req, res) => {
  const { id } = req.params;

  try {
    const score = await recommendationService.upVote(id);

    await recommendationRepository.updateSongById(score, id);

    return res.sendStatus(201);
  } catch {
    return res.sendStatus(500);
  }
};
