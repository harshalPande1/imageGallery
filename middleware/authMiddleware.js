const jwt = require('jsonwebtoken');

async function authenticatedMiddleware(req,res,next) {
    const bearer = req.headers.authorization;
    console.log(bearer);
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new Error(401, 'Unauthorised'));
    }
    const jwtToken = bearer.split('Bearer ')[1].trim();
    try {
        const payload = await jwt.verify(jwtToken, "JWTSECRET");
        if (!payload) {
            return next(new Error(401, 'Unauthorised'));
        }
        req.user = payload;
        return next();
    } catch (error) {
        return next(new Error(401, 'Unauthorised'));
    }
}

module.exports = authenticatedMiddleware;
