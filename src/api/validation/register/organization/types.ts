import * as z from 'zod';
import {RegistrationOrgValidationSchema} from './RegistrationOrgValidation.ts';

export type RegistrationOrgFormValues = z.infer<
  typeof RegistrationOrgValidationSchema
>;
