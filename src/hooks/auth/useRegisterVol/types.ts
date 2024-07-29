import {RegistrationVolFormValues} from '../../../api/validation/register/volunteer/types.ts';

export type RegisterVolCredentials = RegistrationVolFormValues;
export type UseRegisterVolProps = {
  onSuccess?: () => void;
};
