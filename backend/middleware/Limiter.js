const client = require('../config/redisClient');

function createipLimiter(limiterename, windowSeconds, max, message) {
  return async (req, res, next) => {
    const ip = req.ip;
    const key = `ratelimit:${limiterename}:${ip}`;

    try {
      const count = await client.get(key); //returns null if the key doesn't exist
      if (count !== null && parseInt(count, 10) >= max) {
        return res.status(429).json({ message });
      }

      const newCount = await client.incr(key); //create a new key if it doesn't exist and increment the value by 1
      if (newCount === 1) {//if the key is created for the first time, set the expiration time
        await client.expire(key, windowSeconds);
      }
      if(limiterename === 'login'){
       req.stillhavemessage = newCount==max? "you have exceeded the maximum login attempts" : "you still have "+(max-Number(newCount))+" login attempts";
      }
      next();
    } catch (err) {
      console.error('Rate limiter Redis error:', err);
      next();
    }
  };
}

const globalLimiter = createipLimiter(
  'global',
  15 * 60,
  1000,
  'Too many requests from this IP, try again later'
);

const loginLimiter = createipLimiter(
  'login',
  60 * 60,
  3,
  'Too many login attempts, try again later.'
);

module.exports = { globalLimiter, loginLimiter };


//u can add more limiters for the postcreation comments... per user u verify his access token and then change limit him by his id
