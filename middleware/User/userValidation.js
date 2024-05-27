const zod = require("zod");

// Define the schema for user registration data
const userRegistrationSchema = zod.object({
  name: zod.string(),
  contact_number: zod.string(),
  email: zod.string().email(),
  age: zod.number().int().positive(),
  address: zod.string(),
  password: zod.string(),
});

// Create the validation middleware
const validateUserRegistration = (req, res, next) => {
  const validationResult = userRegistrationSchema.safeParse(req.body);

  if (!validationResult.success) {
    // Validation failed, send an error response
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    // Validation succeeded, call the next middleware function
    next();
  }
};
