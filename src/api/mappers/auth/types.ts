import {RegistrationOrgFormValues} from '../../validation/register/RegistrationOrgValidation.ts';
import {
  IRegistrationOrganisationRequestDTO,
  IRegistrationVolunteerRequestDTO,
} from '../../../data-contracts.ts';
import {JwtRequest} from '../../services/auth/types.ts';
import {RegisterVolCredentials} from '../../../hooks/auth/useRegisterVol/types.ts';
import {LoginCredentials} from '../../../hooks/auth/useLogin/types.ts';

export type AuthMapper = {
  registrationOrgCredentialsToDTO(
    orgCredentials: RegistrationOrgFormValues
  ): IRegistrationOrganisationRequestDTO;
  registrationVolCredentialsToDTO(
    volCredentials: RegisterVolCredentials
  ): IRegistrationVolunteerRequestDTO;
  loginCredentialsToJwtRequest(credentials: LoginCredentials): JwtRequest;
};
