const UserModel = require("../../models/user.schema");
const { decodeJwt } = require("../../utils/jwtUtils");

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send("Authorization header is missing or not in Bearer format.");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = decodeJwt(token);
    const existingUser = await UserModel.findOne({ email: decoded.email });

    if (!existingUser) {
      throw new Error();
    }
    const { _id, name, contact_number, age, email, address } = existingUser;
    req.user = { _id, name, contact_number, age, email, address };
    next();
  } catch (err) {
    res.status(401).send("Invalid or expired token.");
  }
};

module.exports = {
  userAuth,
};
