import express from 'express';

import {
  createNewJoke,
  deleteSpecificJoke,
  getAllJokes,
  getSpecificJoke,
  updateSpecificJoke,
} from '../controllers/jokesControllers.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /jokes
router.get('/', getAllJokes);

// @route   GET /jokes/:id
router.get('/:id', getSpecificJoke);

// @route   POST /jokes
router.post('/', checkAuth, createNewJoke);

// @route   DELETE /jokes/:id
router.delete('/:id', checkAuth, deleteSpecificJoke);

// @route   PUT /jokes/:id
router.put('/:id', checkAuth, updateSpecificJoke);

export default router;
