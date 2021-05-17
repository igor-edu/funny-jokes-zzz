import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import jokesRoutes from './server/routes/jokesRoutes.js';
import usersRoutes from './server/routes/usersRoutes.js';
import { errorHandler, notFound } from './server/middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/jokes', jokesRoutes);
app.use('/users', usersRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client/build/index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running... in development mode...');
  });
}

app.use(notFound);
app.use(errorHandler);

let port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on('error', (err) => console.error(err));
mongoose.connection.once('open', () => {
  console.log('connected to database');
  app.listen(port, () => console.log('app listening on port 5000'));
});
