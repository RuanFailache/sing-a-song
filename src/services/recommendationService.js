import * as recommendationRepository from '../repositories/recommendationRepository.js';

import NotSongsFoundError from '../errors/NotSongsFoundError.js';
import InvalidAmountError from '../errors/InvalidAmountError.js';

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

export const random = async () => {
  const songs = await recommendationRepository.listSongs();

  if (songs.length === 0) {
    throw new NotSongsFoundError('Nenhuma música adicionada, aproveite e adicione a sua!');
  }

  const popularSongs = songs.filter((song) => song.score > 10);
  const otherSongs = songs.filter((song) => song.score <= 10);

  if (popularSongs.length > 0) {
    let randomSong;

    if (Math.random() > 0.3) {
      randomSong = popularSongs[
        Math.floor(Math.random() * popularSongs.length)
      ];
    } else {
      randomSong = otherSongs[
        Math.floor(Math.random() * otherSongs.length)
      ];
    }

    return randomSong;
  }

  const randomIndex = Math.floor(Math.random() * songs.length);

  return songs[randomIndex];
};

export const topSongs = async (amount) => {
  if (amount <= 0 || !Number(amount)) {
    throw new InvalidAmountError('Quantidade de músicas solicitada inválida!');
  }

  return recommendationRepository.listTopSongsByAmount(amount);
};
