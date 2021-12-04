import * as recommendationRepository from '../repositories/recommendationRepository.js';
import * as recommendationSchemas from '../schemas/recommendationSchema.js';

import AddConflictError from '../errors/AddConflictError.js';
import InvalidSongError from '../errors/InvalidSongError.js';
import NotSongsFoundError from '../errors/NotSongsFoundError.js';
import InvalidAmountError from '../errors/InvalidAmountError.js';

export const addRecommendation = async (name, youtubeLink) => {
  const { error } = recommendationSchemas.newSong.validate({
    name,
    youtubeLink,
  });

  if (error) {
    throw new InvalidSongError('Formato do link e/ou música invalidos!');
  }

  const existsSong = await recommendationRepository.checkIfExistsSong(name, youtubeLink);

  if (existsSong) {
    throw new AddConflictError('Link ou nome da música já cadastrados!');
  }

  await recommendationRepository.addRecommendation(name, youtubeLink);
};

export const upVote = async (id) => {
  const song = await recommendationRepository.findSongById(id);

  if (!song) {
    throw new NotSongsFoundError('Música não cadastrada, adicione ao nosso sistema para poder curti-la!');
  }

  const { score } = song;

  await recommendationRepository.updateSongById(score + 1, id);
};

export const downVote = async (id) => {
  const song = await recommendationRepository.findSongById(id);

  if (!song) {
    throw new NotSongsFoundError('Música não cadastrada, adicione ao nosso sistema para poder curti-la!');
  }

  const { score } = song;

  if (score > -5) {
    await recommendationRepository.updateSongById(score - 1, id);
  } else {
    await recommendationRepository.deleteSongById(id);
  }
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
