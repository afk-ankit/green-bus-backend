const zod = require("zod");

// Define the schema for user registration data
const userRegistrationSchema = zod.object({
  name: zod.string().min(1),
  contact_number: zod.string().min(10),
  email: zod.string().email(),
  age: zod.number().int().positive(),
  address: zod.string().min(1),
  password: zod.string().min(3),
});

const userLoginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(3),
});

const validateUserRegistration = (req, res, next) => {
  const validationResult = userRegistrationSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

const validateUserLogin = (req, res, next) => {
  const validationResult = userLoginSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

module.exports = {
  validateUserRegistration,
  validateUserLogin,
};
