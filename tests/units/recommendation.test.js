import '../../src/setup.js';

import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';

import InvalidSongError from '../../src/errors/InvalidSongError.js';
import AddConflictError from '../../src/errors/AddConflictError.js';
import NotSongsFoundError from '../../src/errors/NotSongsFoundError.js';
import InvalidAmountError from '../../src/errors/InvalidAmountError.js';

describe('POST /recommendations', () => {
  beforeAll(async () => {
    await recommendationRepository.addRecommendation(
      'Clock Strikes',
      'https://www.youtube.com/watch?v=6YZlFdTIdzM',
    );
  });

  test('Invalid song format', async () => {
    const result = recommendationService.addRecommendation('', '');
    await expect(result).rejects.toThrowError(InvalidSongError);
  });

  test('Existing song', async () => {
    const result = recommendationService.addRecommendation(
      'Clock Strikes',
      'https://www.youtube.com/watch?v=6YZlFdTIdzM',
    );
    await expect(result).rejects.toThrowError(AddConflictError);
  });
});

describe('POST /recommendations/:id/upvote', () => {
  test('Invalid song id', async () => {
    const result = recommendationService.upVote(0);
    await expect(result).rejects.toThrowError(NotSongsFoundError);
  });
});

describe('POST /recommendations/:id/downvote', () => {
  test('Invalid song id', async () => {
    const result = recommendationService.downVote(0);
    await expect(result).rejects.toThrowError(NotSongsFoundError);
  });
});

describe('POST /recommendations/random', () => {
  test('Not songs added', async () => {
    jest
      .spyOn(recommendationRepository, 'listSongs')
      .mockImplementation(() => []);

    const result = recommendationService.random();
    await expect(result).rejects.toThrowError(NotSongsFoundError);
  });

  test('Get a song', async () => {
    const mockData = [{
      name: 'Clock Strikes',
      youtubeLink: 'https://www.youtube.com/watch?v=6YZlFdTIdzM',
      score: 252,
    }];

    jest
      .spyOn(recommendationRepository, 'listSongs')
      .mockImplementation(() => mockData);

    const result = await recommendationService.random();

    expect(result).toBe(mockData[0]);
  });
});

describe('POST /recommendations/top/:id', () => {
  test('Invalid amount of songs', async () => {
    const result = recommendationService.topSongs(0);
    await expect(result).rejects.toThrowError(InvalidAmountError);
  });
});
