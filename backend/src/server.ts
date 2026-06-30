import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.routes';
import { connectDatabase } from './config/database';
import { env } from './config/env';

const app = express();

const uploadsDir = path.resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(uploadsDir));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'everest-food-app-backend' });
});

app.use('/api', authRoutes);
app.use('/api/v1/blogs', blogRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

async function start(): Promise<void> {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
