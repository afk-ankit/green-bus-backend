const { decodeJwt } = require("../../utils/jwtUtils");

const userAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send("Authorization header is missing or not in Bearer format.");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = decodeJwt(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send("Invalid or expired token.");
  }
};

module.exports = {
  userAuth,
};
