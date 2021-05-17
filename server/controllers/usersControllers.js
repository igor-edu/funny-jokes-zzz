import bcrypt from 'bcryptjs';

import User from '../models/UserModel.js';
import generateToken from '../utils/generateToken.js';

// @route   POST /users
export const createNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route   GET /users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route   GET /users/:id
export const getSpecificUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();
    if (user) {
      res.json(user);
    } else {
      res.status(400).json({ error: 'user not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route   PUT /users/:id
export const updateIndividualUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id).exec();

    if (!user) {
      return res.status(400).json({ error: 'user to update not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    const updated = await user.save();
    res.status(201).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route   DELETE /users/:id
export const deleteSpecificUser = async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({
      _id: req.params.id,
    }).exec();

    if (!deleted) {
      res.status(400).json({ error: 'user to delete not found' });
    } else {
      res.json({ deleted });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route POST /users/login
export const loginSpecificUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user) {
      return res
        .status(401)
        .json({ error: 'invalid email or password, email' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res
        .status(401)
        .json({ error: 'invalid email or password, password' });
    }

    res.json({
      name: user.name,
      email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @route POST /users/register
export const registerSpecificUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user;

    user = await User.findOne({ name }).exec();

    if (user) {
      return res.status(200).json({ error: 'this name has been taken' });
    }

    user = await User.findOne({ email }).exec();

    if (user) {
      return res.status(200).json({ error: 'this email has been taken' });
    }

    const newUser = await User.create({ name, email, password });

    res.json({
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
