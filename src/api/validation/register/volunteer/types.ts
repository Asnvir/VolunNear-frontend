import * as z from 'zod';
import {RegistrationVolValidationSchema} from './RegistrationVolValidation.ts';

export type RegistrationVolFormValues = z.infer<
  typeof RegistrationVolValidationSchema
>;
