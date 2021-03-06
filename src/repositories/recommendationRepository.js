import connection from '../database.js';

export const checkIfExistsSong = async (name, youtubeLink) => {
  const result = await connection.query(
    'SELECT * FROM songs WHERE name = $1 OR "youtubeLink" = $2;',
    [name, youtubeLink],
  );

  return result.rowCount > 0;
};

export const addRecommendation = async (name, youtubeLink) => {
  await connection.query(
    'INSERT INTO songs (name, "youtubeLink") VALUES ($1, $2);',
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

export const deleteSongById = async (id) => {
  await connection.query(
    'DELETE FROM songs WHERE id = $1;',
    [id],
  );
};

export const listSongs = async () => {
  const result = await connection.query(
    'SELECT * FROM songs;',
  );

  return result.rows;
};

export const listTopSongsByAmount = async (amount) => {
  const result = await connection.query(
    'SELECT * FROM songs ORDER BY score DESC LIMIT $1;',
    [amount],
  );

  return result.rows;
};
