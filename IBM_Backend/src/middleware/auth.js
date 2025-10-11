const { requireAuth } = require('@clerk/express');

const autha = requireAuth();

const auth = (req, res, next) => {
const header = req.headers.authorization;
if (!header) return res.status(401).json({ message: 'Missing auth token' });
const parts = header.split(' ');
if (parts.length !== 2) return res.status(401).json({ message: 'Invalid auth header' });
const token = parts[1];
try {
const payload = autha.verify(token, process.env.CLERK_SECRET_KEY);
req.user = payload;
next();
} catch (err) {
return res.status(401).json({ message: 'Invalid token' });
}
};


module.exports = auth;