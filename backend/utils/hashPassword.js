import bcrypt from 'bcryptjs';

export default async (plain) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(plain, salt);
  return hashed;
};
