import * as z from 'zod';

export const VolunteerActivitiesFilterValidationSchema = z.object({
  title: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  type: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  date: z.date().optional().nullable(),
  country: z
    .object({label: z.string(), value: z.string()})
    .optional()
    .nullable(),
  city: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  isMyActivities: z.string().optional().nullable(),
});

export type VolunteerActivitiesFilterValues = z.infer<
  typeof VolunteerActivitiesFilterValidationSchema
>;
