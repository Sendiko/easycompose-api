const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log(token);

    if (!token) {   
        return res.status(401).json({
            status: 401,
            message: "Unauthenticated"
        })
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.AUTH_KEY
        )

        req.user = decoded
        next()
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: e.message
        })
    }
}

module.exports = {
    authenticate
}