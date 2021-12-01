import * as recommendationRepository from '../repositories/recommendationRepository.js';

export const upVote = async (id) => {
  const song = await recommendationRepository.findSongById(id);

  if (!song) {
    // Throw an error here
    return 0;
  }

  const { score } = song;

  return {
    ...song,
    score: score + 1,
  };
};
