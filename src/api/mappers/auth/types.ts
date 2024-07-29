import {
  IRegistrationOrganisationRequestDTO,
  IRegistrationVolunteerRequestDTO,
} from '../../../data-contracts.ts';
import {RegisterVolCredentials} from '../../../hooks/auth/useRegisterVol/types.ts';
import {LoginCredentials} from '../../../hooks/auth/useLogin/types.ts';
import {JwtRequest} from '../../services/auth/service/types.ts';
import {RegistrationOrgFormValues} from '../../validation/register/organization/types.ts';

export type AuthMapper = {
  registrationOrgCredentialsToDTO(
    orgCredentials: RegistrationOrgFormValues
  ): IRegistrationOrganisationRequestDTO;
  registrationVolCredentialsToDTO(
    volCredentials: RegisterVolCredentials
  ): IRegistrationVolunteerRequestDTO;
  loginCredentialsToJwtRequest(credentials: LoginCredentials): JwtRequest;
};
