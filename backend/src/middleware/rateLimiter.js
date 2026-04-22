import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  if (!rateLimit) {
    return next();
  }

  try {
    const ip =
      req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
      req.ip ||
      "unknown-client";

    const { success } = await rateLimit.limit(`rate-limit:${ip}`);
    if (!success) {
      return res
        .status(429)
        .json({ message: "Too many requests. Please try again later." });
    }
    return next();
  } catch (error) {
    console.error("Error in rateLimiter middleware:", error);
    return next(error);
  }
};

export default rateLimiter;
