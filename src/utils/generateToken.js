
const jwt = require("jsonwebtoken");

function generateToken(userId, usermail, businessId) {
  return jwt.sign({ id: userId, email:usermail, businessId:businessId },
     process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );
}
console.log('tokennn', generateToken);
module.exports = generateToken;

