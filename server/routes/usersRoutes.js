import express from 'express';

import {
  createNewUser,
  deleteSpecificUser,
  getAllUsers,
  getSpecificUser,
  loginSpecificUser,
  registerSpecificUser,
  updateIndividualUser,
} from '../controllers/usersControllers.js';

const router = express.Router();

// @route   POST /users
router.post('/', createNewUser);

// @route   GET /users
router.get('/', getAllUsers);

// @route   GET /users/:id
router.get('/:id', getSpecificUser);

// @route   PUT /users/:id
router.put('/:id', updateIndividualUser);

// @route   DELETE /users/:id
router.delete('/:id', deleteSpecificUser);

// @route POST /users/login
router.post('/login', loginSpecificUser);

// @route POST /users/register
router.post('/register', registerSpecificUser);

// @route POST /users/auth
// router.post('/auth', checkAuth, afterAuth);

export default router;
