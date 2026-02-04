const axios = require("axios");

// Middleware factory: pass the action you expect
const verifyrecaptcha = (expectedAction, minScore = 0.5) => {
  return async (req, res, next) => {
    try {
      const token = req.body.recaptchatoken;

      if (!token) {
        return res.status(400).json({ message: "Recaptcha token missing" });
      }

      const secret = process.env.RECAPTCHA_SECRET;

      // Verify with Google
      const response = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        { params: { secret, response: token } }
      );

      const data = response.data;

      // Check success
      if (!data.success) {
        return res.status(403).json({ message: "Recaptcha verification failed" });
      }

      // Check action matches
      if (data.action !== expectedAction) {
        return res.status(400).json({ message: "Recaptcha action mismatch" });
      }

      // Check score threshold
      if (data.score < minScore) {
        return res.status(403).json({ message: "Suspicious activity detected", score: data.score });
      }

      // All good → continue
      next();
    } catch (err) {
      console.error("Recaptcha error:", err.message);
      res.status(500).json({ message: "Recaptcha verification error" });
    }
  };
};

module.exports = verifyrecaptcha;
