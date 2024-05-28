const z = require("zod");

const passengerSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().positive(),
  contact_number: z.string().optional(),
  sex: z.enum(["male", "female", "others"]),
});

const validatePassenger = (req, res, next) => {
  const validationResult = passengerSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

module.exports = {
  validatePassenger,
};
