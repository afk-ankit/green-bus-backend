const bcrypt = require("bcrypt");
const catchAsync = require("../../utils/catchAsync");
const UserModel = require("../../models/user.schema");

const registerUser = catchAsync(async (req, res) => {
  const { name, contact_number, email, age, address, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 2);
  const User = new UserModel({
    name,
    contact_number,
    email,
    age,
    address,
    password: hashedPassword,
  });
  const user = await User.save();
  res.status(201).send(user);
});
const loginUser = catchAsync(async (req, res) => {});

module.exports = {
  registerUser,
  loginUser,
};
