import app from '../server/index.js';

export default async function handler(req, res) {
    try {
        return app(req, res);
    } catch (err) {
        console.error('Vercel Serverless Handler Error:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Serverless Error', message: err.message, stack: err.stack });
        }
    }
}
