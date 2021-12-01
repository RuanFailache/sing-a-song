import * as recommendationSchema from '../schemas/recommedationSchema.js';

export const addRecommendation = async (req, res) => {
  const {
    name,
    youtubeLink,
  } = req.body;

  const { error } = recommendationSchema.addRecommendationSchema.validate({ name, youtubeLink });

  if (error) {
    return res.sendStatus(400);
  }

  return res.sendStatus(201);
};
