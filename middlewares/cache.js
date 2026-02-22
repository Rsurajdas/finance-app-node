import redisClient from "../config/redisClient.js"
import { catchAsync } from "../utils/catchAsync.js";
import { serialize, deserialize } from "../utils/redisSerializer.js";

const cache = (keyGenerator, ttl = 60) => catchAsync(async (req, res, next) => {
    const key = keyGenerator(req)
    const cachedData = await redisClient.get(key)

    if (cachedData) {
        try {
            return res.status(200).json(deserialize(cachedData))
        } catch (err) {
            await redisClient.del(key);
        }
    }

    const originalJson = res.json.bind(res)

    res.json = async (body) => {
        if (res.statusCode === 200) {
            redisClient
                .set(key, serialize(body), { EX: ttl })
                .catch(err => console.error("Redis set error:", err))
        }
        return originalJson(body)
    }

    next()
})

export default cache