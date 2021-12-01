import connection from '../database.js';

export const addRecommendation = async (name, youtubeLink) => {
  await connection.query(
    'INSERT INTO recommendations (name, youtubeLink) VALUES ($1, $2);',
    [name, youtubeLink],
  );
};

export const findSongById = async (id) => {
  const result = await connection.query(
    'SELECT * FROM recommendations WHERE id = $1;',
    [id],
  );

  return result.rows[0] || false;
};
