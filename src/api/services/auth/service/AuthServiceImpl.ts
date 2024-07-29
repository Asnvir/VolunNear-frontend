import {API_ENDPOINTS} from '../../../constants.ts';
import {LocalStorageHelper} from '../../../../helpers/types.ts';
import {AUTH_TOKEN} from '../../../../utils/constants/routes.ts';
import {jwtDecode} from 'jwt-decode';
import {
  IRegistrationOrganisationRequestDTO,
  IRegistrationVolunteerRequestDTO,
} from '../../../../data-contracts.ts';
import {HttpClientService} from '../../http/types.ts';
import {AuthMapper} from '../../../mappers/auth/types.ts';
import {AuthMapperImpl} from '../../../mappers/auth/AuthMapperImpl.ts';
import {
  AuthService,
  JwtRequest,
  JwtResponse,
  JwtToken,
  Role,
  User,
} from './types.ts';
import {LoginCredentials} from '../../../../hooks/auth/useLogin/types.ts';
import {RegisterVolCredentials} from '../../../../hooks/auth/useRegisterVol/types.ts';
import {AuthHelperImpl} from '../helper/AuthHelperImpl.ts';
import {AuthHelper} from '../helper/types.ts';
import {RegisterOrgCredentials} from '../../../../hooks/auth/useRegisterOrg/types.ts';
import {LocalStorageHelperImpl} from '../../../../helpers/LocalStorageHelper.ts';
import {HttpClientImpl} from '../../http/HttpClientImpl.ts';

export class AuthServiceImpl implements AuthService {
  private static instance: AuthServiceImpl | null = null;
  private authMapper: AuthMapper = AuthMapperImpl.getInstance();
  private authHelper: AuthHelper = AuthHelperImpl.getInstance();
  private httpClient: HttpClientService = HttpClientImpl.getInstance();
  private localStorageHelper: LocalStorageHelper =
    LocalStorageHelperImpl.getInstance();

  private constructor() {}

  public static getInstance(): AuthServiceImpl {
    if (!AuthServiceImpl.instance) {
      AuthServiceImpl.instance = new AuthServiceImpl();
    }
    return AuthServiceImpl.instance;
  }

  public async login(loginCredentials: LoginCredentials): Promise<User> {
    const credentialsDTO: JwtRequest =
      this.authMapper.loginCredentialsToJwtRequest(loginCredentials);

    const response = await this.httpClient.post<JwtResponse, JwtRequest>(
      API_ENDPOINTS.LOGIN,
      credentialsDTO,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const token = this.authHelper.validateToken(response.data.token);
    const decodedToken = this.authHelper.decodeToken(token);
    this.authHelper.validateDecodedToken(decodedToken);
    const role = this.authHelper.mapRole(decodedToken.roles[0]);
    const user = this.createUser(decodedToken, role);
    this.localStorageHelper.setItem(AUTH_TOKEN, token);

    return user;
  }

  private createUser(decodedToken: JwtToken, role: Role): User {
    return {
      username: decodedToken.sub,
      role: role,
    };
  }

  public logout(): void {
    console.log('logout')
    window.localStorage.removeItem(AUTH_TOKEN);
  }

  public async registerOrganisation(
    orgCredentials: RegisterOrgCredentials
  ): Promise<void> {
    const orgCredentialsDTO =
      this.authMapper.registrationOrgCredentialsToDTO(orgCredentials);
    const response = await this.httpClient.post<
      void,
      IRegistrationOrganisationRequestDTO
    >(API_ENDPOINTS.REGISTER_ORGANISATION, orgCredentialsDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 201) {
      throw new Error('Registration failed');
    }
  }

  public async registerVolunteer(
    volCredentials: RegisterVolCredentials
  ): Promise<void> {
    const volCredentialsDTO =
      this.authMapper.registrationVolCredentialsToDTO(volCredentials);
    const response = await this.httpClient.post<
      void,
      IRegistrationVolunteerRequestDTO
    >(API_ENDPOINTS.REGISTER_VOLUNTEER, volCredentialsDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 201) {
      throw new Error('Registration failed');
    }
  }

  public async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const response = await this.httpClient.post<void, {currentPassword: string, newPassword: string}>(API_ENDPOINTS.CHANGE_PASSWORD, {oldPassword, newPassword});
    if (response.status !== 200) {
      throw new Error('Password change failed');
    }
  }


  private isTokenExpired = (token: JwtToken) => {
    return token.exp * 1000 <= Date.now();
  };

  getCurrentUser(): User | null {
    const token = this.localStorageHelper.getItem(AUTH_TOKEN);
    if (!token) {
      return null;
    }

    try {
      const decodedToken = jwtDecode<JwtToken>(token);
      if (this.isTokenExpired(decodedToken)) {
        return null;
      }
      const role = this.authHelper.mapRole(decodedToken.roles[0]);
      return this.createUser(decodedToken, role);
    } catch (error) {
      return null;
    }
  }
}
