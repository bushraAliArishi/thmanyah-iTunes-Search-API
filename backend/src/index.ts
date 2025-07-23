import Fastify from 'fastify';
import { Pool } from 'pg';
import axios from 'axios';
import dotenv from 'dotenv';
import { ITunesTrack } from './types';

dotenv.config();

const fastify = Fastify({ logger: true });
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// CORS handling
fastify.addHook('onRequest', (request, reply, done) => {
  reply.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN);
  reply.header('Access-Control-Allow-Methods', 'GET');
  done();
});

// Health check endpoint
fastify.get('/health', async () => {
  await pool.query('SELECT 1');
  return { status: 'ok' };
});

// Search endpoint
fastify.get('/api/search', async (request, reply) => {
  const { term } = request.query as { term: string };
  if (!term) return reply.code(400).send({ error: 'Missing search term' });

  try {
    const itunesRes = await axios.get(`https://itunes.apple.com/search?term=${term}&media=music`);
    const items: ITunesTrack[] = itunesRes.data.results;

    await Promise.all(items.map(item => 
      pool.query(
        `INSERT INTO itunes_items (search_term, track_id, data)
         VALUES ($1, $2, $3)
         ON CONFLICT (track_id) DO NOTHING`,
        [term, item.trackId, item]
      )
    )
  );

    const dbRes = await pool.query(
      'SELECT data FROM itunes_items WHERE search_term = $1',
      [term]
    );
    
    return dbRes.rows.map(row => row.data);
  } catch (err) {
    fastify.log.error(err);
    return reply.code(500).send({ error: 'Server error' });
  }
});

// Start server
fastify.listen({ port: Number(process.env.API_PORT) }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Server running on port ${process.env.API_PORT}`);
});