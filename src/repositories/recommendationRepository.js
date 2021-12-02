import connection from '../database.js';

export const addRecommendation = async (name, youtubeLink) => {
  await connection.query(
    'INSERT INTO songs (name, youtubeLink) VALUES ($1, $2);',
    [name, youtubeLink],
  );
};

export const findSongById = async (id) => {
  const result = await connection.query(
    'SELECT * FROM songs WHERE id = $1;',
    [id],
  );

  return result.rows[0] || false;
};

export const updateSongById = async (score, id) => {
  await connection.query(
    'UPDATE songs SET score = $1 WHERE id = $2;',
    [score, id],
  );
};
