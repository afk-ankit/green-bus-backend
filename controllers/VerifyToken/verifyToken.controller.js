const catchAsync = require("../../utils/catchAsync");
const { decodeJwt } = require("../../utils/jwtUtils");

const verifyToken = catchAsync(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    res.status(401).send("Token not found");
  }
  const decodedData = decodeJwt(token);
  res.send({ data: decodedData });
});

module.exports = {
  verifyToken,
};
