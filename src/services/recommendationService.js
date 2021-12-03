import * as recommendationRepository from '../repositories/recommendationRepository.js';

export const upVote = async (id) => {
  const song = await recommendationRepository.findSongById(id);

  if (!song) {
    // Throw an error here
    return 0;
  }

  const { score } = song;

  return score + 1;
};

export const downVote = async (id) => {
  const song = await recommendationRepository.findSongById(id);

  if (!song) {
    // Throw an error here
    return 0;
  }

  const { score } = song;

  if (score > -5) {
    return score - 1;
  }

  // Fix to do something when score is less than -5
  return 0;
};
