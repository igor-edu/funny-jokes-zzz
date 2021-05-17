export const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  res.status(404);
  next(error);
};

export const errorHandler = (error, req, res, next) => {
  if (res.statusCode < 400) {
    res.status(500);
  }
  console.error(error);
  res.json({ error: error.message });
};
