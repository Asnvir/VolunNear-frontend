import * as z from 'zod';

export const ActivitiesFilterValidationSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
  date: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
});
