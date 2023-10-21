const jwt = require('jsonwebtoken');


const JWTSecret = "123";

function clienteAuth(req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, JWTSecret, (err, data) => {
            if (err) {
                res.status(401);
                res.json({ err: "Token Inválido" });
            } else {
                // Token válido, permita o acesso
                next();
            }
        });
    } else {
        res.status(401);
        res.json({ err: "Token Inválido" });
    }
}

module.exports = clienteAuth;
