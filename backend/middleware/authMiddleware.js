import jwt from 'jsonwebtoken';

import User from '../models/UserModel.js';

export const checkAuth = async (req, res, next) => {
  // console.log('in the checkAuth middleware');
  try {
    // console.log('req.headers.authorization:', req.headers.authorization);
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')
    ) {
      // console.log('checkAuth middleware, there is no token');
      return res
        .status(401)
        .json({ error: 'not authorized, token not present' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id }).exec();

    if (!user) {
      // console.log('checkAuth middleware, no user in database');
      return res
        .status(401)
        .json({ error: 'not authorized, user not in database' });
    }

    // console.log('chechAuth middleware, user found');

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
