import { neon } from '@neondatabase/serverless';

// Reads the connection string from Vercel env vars (or .env.local when running locally)
export const sql = neon(process.env.DATABASE_URL!);
