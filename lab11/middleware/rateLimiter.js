const RATE_LIMIT = 10; // максимум 10 запросов в минуту
const rateLimits = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowStart = now - 60 * 1000;

  if (!rateLimits[ip]) rateLimits[ip] = [];

  rateLimits[ip] = rateLimits[ip].filter((time) => time > windowStart);

  if (rateLimits[ip].length >= RATE_LIMIT) {
    return res.status(429).send("Слишком много запросов");
  }

  rateLimits[ip].push(now);
  next();
};

module.exports = rateLimiter;