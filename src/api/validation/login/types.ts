import * as z from 'zod';
import {LoginValidationSchema} from './LoginValidation.ts';

export type LoginFormValues = z.infer<typeof LoginValidationSchema>;
