import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import * as rfs from 'rotating-file-stream';
import { fileURLToPath } from 'url';

import globalErrorHandler from './controllers/errorController.js';
import validateApiKey from './middlewares/validateApiKey.js';
import { router as authRouter } from './routes/authRoute.js';
import { router as budgetRouter } from './routes/budgetRoute.js';
import { router as categoryRouter } from './routes/categoryRoute.js';
import AppError from './utils/appError.js';

const app = express();
const __filename = fileURLToPath(import.meta.url); // Get the current file path
const __dirname = path.dirname(__filename); // Get the current directory path

app.use('/assets', express.static(path.join(__dirname, 'public', 'assets'))); // Serve static assets from the "public/assets" directory
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(compression()); // Enable response compression
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security-related HTTP headers

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate log files daily
  size: '10M', // rotate every 10 MegaBytes written
  path: path.resolve(__dirname, 'log'),
});

app.use(morgan('combined', { stream: accessLogStream }));

app.use(validateApiKey);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/budgets', budgetRouter);
app.use('/api/v1/categories', categoryRouter);

app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

export default app;
