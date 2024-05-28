const bcrypt = require("bcrypt");
const catchAsync = require("../../utils/catchAsync");
const UserModel = require("../../models/user.schema");

const registerUser = catchAsync(async (req, res) => {
  const { name, contact_number, email, age, address, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await UserModel.findOne({
    email,
  });
  if (existingUser) {
    return res.status(400).send("Email already in use");
  }
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
const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).send("Email already Exists");
  }
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).send("Invalid email or password.");
  }

  res.send("Logged in successfully.");
});

module.exports = {
  registerUser,
  loginUser,
};
