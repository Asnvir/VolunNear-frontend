import * as z from 'zod';

export const OrganizationsFilterValidationSchema = z.object({
  title: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  country: z
    .object({label: z.string(), value: z.string()})
    .optional()
    .nullable(),
  city: z.object({label: z.string(), value: z.string()}).optional().nullable(),
  sortOrder: z
    .object({label: z.string(), value: z.string()})
    .optional()
    .nullable(),
});

export type OrganizationsFilterValues = z.infer<
  typeof OrganizationsFilterValidationSchema
>;
