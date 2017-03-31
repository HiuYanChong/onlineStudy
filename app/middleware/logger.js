'use strict';

const logger = require('../utils/log');

module.exports = async (ctx, next) => {
  const start = new Date();
  let ms;
  try {
    await next();

    ms = new Date() - start;
    logger.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    logger.logError(ctx, error, ms);
  }
};
