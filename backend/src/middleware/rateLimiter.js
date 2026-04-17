import rateLimit from "../config/upstash.js";
const rateLimmiter = async (_, res, next) => {
    try {
        const {success} = await rateLimit.limit("my-limit-key");
        if (!success) {
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }
        next();
    }
    catch (error) {
        console.error("Error in rateLimiter Middleware:", error);
        next(error);
    }
}

export default rateLimmiter;
