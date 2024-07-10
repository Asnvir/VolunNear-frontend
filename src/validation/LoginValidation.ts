import * as z from 'zod';

const validationSchema = z.object({
  username: z.string().min(1, {message: 'Username is required'}),
  password: z
    .string()
    .min(8, {message: 'Password must be at least 8 characters long'}),
});

export type FormValues = z.infer<typeof validationSchema>;
export {validationSchema};
