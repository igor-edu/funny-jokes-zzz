import jwt from 'jsonwebtoken';

export default (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30 days',
  });
  return token;
};
