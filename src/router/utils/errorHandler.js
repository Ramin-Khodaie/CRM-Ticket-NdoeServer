const errorHandler = (error, res) => {
  res.status(error.status || 500);
  console.log(3000, res.status);
  res.json({
    message: error.message,
  });
};

module.exports = errorHandler;
