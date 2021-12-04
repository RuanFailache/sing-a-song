/* eslint-disable no-unused-vars */
const serverMiddlewareError = (err, req, res, next) => {
  res.sendStatus(500);
};

export default serverMiddlewareError;
