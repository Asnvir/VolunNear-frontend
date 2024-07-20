import {RegistrationOrgFormValues} from '../../../api/validation/register/RegistrationOrgValidation.ts';

export type RegisterOrgCredentials = RegistrationOrgFormValues;
export type UseRegisterOrgProps = {
  onSuccess?: () => void;
};
