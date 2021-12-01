import connection from '../database.js';

export const addRecommendation = async (name, youtubeLink) => {
  await connection.query(
    'INSERT INTO recommendations (name, youtubeLink) VALUES ($1, $2)',
    [name, youtubeLink],
  );
};
