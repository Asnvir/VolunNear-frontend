import {RegistrationOrgFormValues} from '../../../api/validation/register/organization/types.ts';

export type RegisterOrgCredentials = RegistrationOrgFormValues;
export type UseRegisterOrgProps = {
  onSuccess?: () => void;
};
