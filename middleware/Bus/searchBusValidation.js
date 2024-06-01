const z = require("zod");
const searchBusSchmea = z.object({
  source: z.string().min(1, "Source is required"),
  destination: z.string().min(1, "Destination is required"),
});

const validateBusSearch = (req, res, next) => {
  const validationResult = searchBusSchmea.safeParse(req.body);
  if (!validationResult.success) {
    res.status(400).json({ errors: validationResult.error.flatten() });
  } else {
    next();
  }
};

module.exports = {
  validateBusSearch,
};
