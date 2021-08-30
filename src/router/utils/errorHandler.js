const errorHandler = (error, res) => {
  res.status(error.status || 500);

  res.json({
    message: error.message,
  });
};

module.exports = errorHandler;
