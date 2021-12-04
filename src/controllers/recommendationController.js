import * as recommendationService from '../services/recommendationService.js';

export const addRecommendation = async (req, res, next) => {
  const {
    name,
    youtubeLink,
  } = req.body;

  try {
    await recommendationService.addRecommendation(name, youtubeLink);
    return res.sendStatus(201);
  } catch (err) {
    if (err.name === 'InvalidSong') {
      return res.sendStatus(400);
    }

    if (err.name === 'AddConflict') {
      return res.sendStatus(409);
    }
    return next(err);
  }
};

export const upVote = async (req, res, next) => {
  const { id } = req.params;

  try {
    await recommendationService.upVote(id);
    return res.sendStatus(200);
  } catch (err) {
    if (err.name === 'NotSongsFound') {
      return res.sendStatus(404);
    }
    return next(err);
  }
};

export const downVote = async (req, res, next) => {
  const { id } = req.params;

  try {
    await recommendationService.downVote(id);
    return res.sendStatus(200);
  } catch (err) {
    if (err.name === 'NotSongsFound') {
      return res.sendStatus(404);
    }
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

export const topSongs = async (req, res, next) => {
  const { amount } = req.params;

  try {
    const songs = await recommendationService.topSongs(amount);
    return res.send(songs);
  } catch (err) {
    if (err.name === 'InvalidAmount') {
      return res.sendStatus(400);
    }
    return next(err);
  }
};
