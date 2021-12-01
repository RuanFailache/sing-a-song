import pg from 'pg';

const { Pool } = pg;

const databaseConfig = {
  prod: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  test: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};

const status = process.env.NODE_ENV || 'test';
const connection = new Pool(databaseConfig[status]);

export default connection;
