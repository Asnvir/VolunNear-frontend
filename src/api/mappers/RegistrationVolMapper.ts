import {FormValues} from '../../validation/RegistrationVolValidation.ts';
import {IRegistrationVolunteerRequestDTO} from '../../data-contracts.ts';

export class RegistrationVolMapper {
  static toDTO(data: FormValues): IRegistrationVolunteerRequestDTO {
    return {
      username: data.username,
      password: data.password,
      email: data.email,
      realName: data.realName,
    };
  }
}
