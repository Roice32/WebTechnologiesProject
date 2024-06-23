import jwt from 'jsonwebtoken';

const secretKey = 'UnX2024';

export function generateToken(content) {
    return jwt.sign(content, secretKey, { expiresIn: '24h' });
};

export function tokenIsValid(token) {
    try {
        jwt.verify(token, secretKey);
        return true;
    } catch (error) {
        return false;
    }
}

export function getTokenFromHeaders(req) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.split(' ')[1];
}

