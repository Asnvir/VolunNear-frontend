import {LoginFormValues} from '../../../api/validation/login/types.ts';

export type LoginCredentials = LoginFormValues;
export type UseLoginProps = {
  onSuccess?: () => void;
};
