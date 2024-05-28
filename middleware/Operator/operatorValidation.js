const z = require("zod");

const operatorSchema = z.object({
  coordinator_name: z.string().min(1),
  company_name: z.string().min(1),
  email: z.string().email(),
  token: z.string().min(1),
  address: z.string().min(1),
  contact_number: z.string().min(10),
  years_of_service: z.number().int().nonnegative(),
});

const validateOperator = (req, res, next) => {
  const validationResult = operatorSchema.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

module.exports = {
  validateOperator,
};
