import '../../src/setup.js';

import * as recommendationService from '../../src/services/recommendationService.js';
import * as recommendationRepository from '../../src/repositories/recommendationRepository.js';

import InvalidSongError from '../../src/errors/InvalidSongError.js';
import AddConflictError from '../../src/errors/AddConflictError.js';

describe('POST /recommendaton', () => {
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
