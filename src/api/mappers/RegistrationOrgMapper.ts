import {FormValues} from '../../validation/RegistrationOrgValidation.ts';
import {IRegistrationOrganisationRequestDTO} from '../../data-contracts.ts';

export class RegistrationOrgMapper {
  static toDTO(data: FormValues): IRegistrationOrganisationRequestDTO {
    return {
      username: data.username,
      password: data.password,
      email: data.email,
      nameOfOrganisation: data.nameOfOrganisation,
      country: data.country,
      city: data.city,
      address: data.address,
    };
  }
}
