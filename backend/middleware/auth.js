import jwt from "jsonwebtoken";

const auth = (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;


        if (!authHeader) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Extract token from "Bearer <token>" format
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {


        // Handle different JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token expired",
                tokenExpired: true
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
                invalidToken: true
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            });
        }
    }
}

export default auth;