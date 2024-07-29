import * as z from 'zod';

export const RegistrationOrgValidationSchema = z.object({
  username: z.string().min(1, {message: 'Username is required'}),
  password: z
    .string()
    .min(8, {message: 'Password must be at least 8 characters long'}),
  email: z.string().email({message: 'Invalid email address'}),
  nameOfOrganisation: z
    .string()
    .min(1, {message: 'Name of Organisation is required'}),
  country: z.string().min(1, {message: 'Country is required'}),
  city: z.string().min(1, {message: 'City is required'}),
  address: z.string().min(1, {message: 'Address is required'}),
});
