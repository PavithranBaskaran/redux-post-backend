const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

let verifyToken = function (request, response, next) {
  // console.log(request.headers);
  if (request.headers.authorization) {
    let verify = jwt.verify(request.headers.authorization, process.env.SECRET);
    // console.log(verify);

    if (verify) {
      request.body.userid = verify.id;
      // console.log(request);
      next();
    } else {
      response.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    response.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {
  verifyToken,
};
