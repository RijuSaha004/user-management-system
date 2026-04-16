const z = require("zod")

module.exports.registerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Valid email is required'),
  password: z.string().trim().min(4, 'Password must be at least 6 characters'),
  role: z.string().optional(),
});

module.exports.loginSchema = z.object({
  email: z.string().trim().email('Valid email required'),
  password: z.string().trim().min(4, 'Password required'),
});

module.exports.createUserSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Valid email is required'),
  password: z.string().trim().min(4, 'Password must be at least 6 characters'),
  role: z.string().optional()
});