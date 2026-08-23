import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized — no token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const jwtSecret = process.env.JWT_SECRET || 'neev_thread_of_wisdom_jwt_secret_2026';
        const decoded = jwt.verify(token, jwtSecret);
        req.admin = decoded;
        next();
    } catch {
        return res.status(401).json({ error: 'Unauthorized — invalid or expired token' });
    }
}
