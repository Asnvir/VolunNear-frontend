import * as z from 'zod';
import {ActivitiesFilterValidationSchema} from './ActivitiesFilterValidation.ts';

export type ActivitiesFilterValues = z.infer<
  typeof ActivitiesFilterValidationSchema
>;
