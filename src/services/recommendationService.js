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

export const random = async () => {
  const songs = await recommendationRepository.listSongs();

  const popularSongs = songs.filter((song) => song.score > 10);
  const otherSongs = songs.filter((song) => song <= 10);

  if (popularSongs.length > 0) {
    let randomSong;

    const randomNumber = Math.random();

    if (randomNumber > 0.7) {
      const randomIndex = Math.floor(Math.random * popularSongs.length);
      randomSong = popularSongs[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random * otherSongs.length);
      randomSong = popularSongs[randomIndex];
    }

    return randomSong;
  }

  const randomIndex = Math.floor(Math.random() * songs.length);

  return songs[randomIndex];
};
