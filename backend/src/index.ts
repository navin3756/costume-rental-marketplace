import mongoose from 'mongoose';
import { createApp } from './app';
import { env } from './config/env';

const bootstrap = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('Connected to MongoDB');

    const app = createApp();
    app.listen(env.port, () => {
      console.log(`API running on http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

bootstrap();
