import {RegistrationVolFormValues} from '../../../api/validation/register/RegistrationVolValidation.ts';

export type RegisterVolCredentials = RegistrationVolFormValues;
export type UseRegisterVolProps = {
  onSuccess?: () => void;
};
