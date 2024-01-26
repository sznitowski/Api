const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({
    message: 'Resource not found',
    error: error.message
  });
};

const errorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';

  const errorResponse = {
    success: false,
    status: errStatus,
    message: errMsg,
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
  }

  res.status(errStatus).json(errorResponse);
};  

module.exports = {
  //notFound,
  errorHandler
};