import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import jokesRoutes from './routes/jokesRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.get('/', (req, res) => {
  res.send('Hello from index.js');
});

app.use('/jokes', jokesRoutes);
app.use('/users', usersRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT;
mongoose.connect(process.env.DB_URI, {
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
