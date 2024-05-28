const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const encodeJwt = (userData) => {
  return jwt.sign({ ...userData }, JWT_SECRET, {
    expiresIn: "30d",
  });
};
const decodeJwt = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
};

module.exports = {
  encodeJwt,
  decodeJwt,
};
