const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;
module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    console.log(req.cookies);
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        console.log(err, payload);
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            //Agrego el id del user al request
            req.user = payload._id;
            next();
        }
    });
}

module.exports.socketAuthenticate = function (socket, next) {

    const token = socket.request.headers?.token;
    console.log("TOKEN", token);
    jwt.verify(token, secret, (err, payload) => {
        console.log(err, payload);
        if (err) {
            next(new Error("no autorizado"));
        } else {
            //Agrego el id del user al request
            socket.user = payload._id;
            socket.join(payload._id);
            next();
        }
    });
}