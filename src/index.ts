import express from 'express';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import cors from 'cors';
import 'dotenv/config';
import middleware from 'i18next-http-middleware';
import i18next from './i18n';
import { connectDb } from 'config';

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDb();

    const app = express();
    app.use(middleware.handle(i18next));
    app.use(
      cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
      }),
    );

    app.use(cookieParser());
    app.use(express.json());

    const server = createServer(app);

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
