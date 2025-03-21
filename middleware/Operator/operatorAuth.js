const OperatorModel = require("../../models/bus-operator.schema");
const { decodeJwt } = require("../../utils/jwtUtils");

const operatorAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .send("Authorization header is missing or not in Bearer format.");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = decodeJwt(token);
    const existingUser = await OperatorModel.findOne({ email: decoded.email });
    if (!existingUser) {
      throw new Error();
    }else{
      res.send("Ankit Sharma")
    }
    req.user = existingUser;
    next();
  } catch (err) {
    res.status(401).send("Invalid or expired token.");
  }
};

module.exports = {
  operatorAuth,
};
