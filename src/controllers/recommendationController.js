import * as recommendationSchema from '../schemas/recommedationSchema.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';
import * as recommendationService from '../services/recommendationService.js';

export const addRecommendation = async (req, res, next) => {
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
  } catch (err) {
    return next(err);
  }
};

export const upVote = async (req, res, next) => {
  const { id } = req.params;

  try {
    const score = await recommendationService.upVote(id);

    await recommendationRepository.updateSongById(score, id);

    return res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
};

export const downVote = async (req, res, next) => {
  const { id } = req.params;

  try {
    const score = await recommendationService.downVote(id);

    if (score > -5) {
      await recommendationRepository.updateSongById(score, id);
    } else {
      await recommendationRepository.deleteSongById(id);
    }

    return res.sendStatus(201);
  } catch (err) {
    return next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const song = await recommendationService.random();
    return res.send(song);
  } catch (err) {
    if (err.name === 'NotSongsFound') {
      return res.sendStatus(404);
    }
    return next(err);
  }
};
