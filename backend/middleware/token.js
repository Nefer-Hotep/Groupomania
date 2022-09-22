const JWT = require("jsonwebtoken");

const getUserId = (req) => {
    
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = JWT.verify(token, "secret");
    const userId = decodedToken.sub;

    return userId
};

module.exports.getUserId = getUserId