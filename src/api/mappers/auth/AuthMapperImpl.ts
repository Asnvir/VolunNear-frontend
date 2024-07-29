import {AuthMapper} from './types.ts';
import {LoginCredentials} from '../../../hooks/auth/useLogin/types.ts';
import {
  IRegistrationOrganisationRequestDTO,
  IRegistrationVolunteerRequestDTO,
} from '../../../data-contracts.ts';
import {RegisterVolCredentials} from '../../../hooks/auth/useRegisterVol/types.ts';
import {RegistrationOrgFormValues} from '../../validation/register/organization/types.ts';
import {JwtRequest} from '../../services/auth/service/types.ts';

export class AuthMapperImpl implements AuthMapper {
  private static instance: AuthMapperImpl | null = null;

  private constructor() {}

  public static getInstance(): AuthMapperImpl {
    if (!AuthMapperImpl.instance) {
      AuthMapperImpl.instance = new AuthMapperImpl();
    }
    return AuthMapperImpl.instance;
  }

  public loginCredentialsToJwtRequest(
    loginCredentials: LoginCredentials
  ): JwtRequest {
    const {username, password} = loginCredentials;
    return {username, password};
  }

  registrationOrgCredentialsToDTO(
    regOrgCredentials: RegistrationOrgFormValues
  ): IRegistrationOrganisationRequestDTO {
    return {
      username: regOrgCredentials.username,
      password: regOrgCredentials.password,
      email: regOrgCredentials.email,
      nameOfOrganisation: regOrgCredentials.nameOfOrganisation,
      country: regOrgCredentials.country,
      city: regOrgCredentials.city,
      address: regOrgCredentials.address,
    };
  }

  registrationVolCredentialsToDTO(
    regVolCredentials: RegisterVolCredentials
  ): IRegistrationVolunteerRequestDTO {
    return {
      username: regVolCredentials.username,
      password: regVolCredentials.password,
      email: regVolCredentials.email,
      realName: regVolCredentials.realName,
    };
  }
}
