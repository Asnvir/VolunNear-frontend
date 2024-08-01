import * as z from 'zod';

export const ActivitiesFilterValidationSchema = z.object({
  title: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  type: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  date: z.date().optional(),
  country: z
    .object({label: z.string(), value: z.string()})
    .optional()
    .nullable(),
  city: z.object({label: z.string(), value: z.string()}).optional().nullable(),
});
