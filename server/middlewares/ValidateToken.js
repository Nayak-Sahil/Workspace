const jwt = require('jsonwebtoken');

const ValidateToken = (req, res, next) => {
    const token = req.cookies.WS_TOKEN;
    const reqUrl = req.originalUrl;

    if(!token || token === "") {
        if(reqUrl === "/login"){
            next();
        }else {
            res.status(401).json({ message: 'Token not found!' });
        }
    }else {
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);

            if(reqUrl !== "/login"){
                req.decodedToken = decode['0'];
                next();
            }else{
                res.status(409).json({ message: 'You are already logged in!' });
                return;
            }
        } catch (err) {
            if(err.name === 'TokenExpiredError'){
                next();
            }else {
                // Invalid token: JsonWebTokenError
                res.status(400).json({ message: 'Invalid token!' });
                return;
            }
        }
    }
};

module.exports = ValidateToken;