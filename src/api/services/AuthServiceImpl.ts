import {API_ENDPOINTS} from '../constants.ts';
import {LocalStorageHelper} from '../../helpers/types.ts';
import {AuthService, HttpClient, LoginCredentials} from '../types.ts';
import {
  AUTH_TOKEN,
  ROLE_ORGANISATION,
  ROLE_VOLUNTEER,
} from '../../utils/constants.ts';
import {jwtDecode} from 'jwt-decode';
import {JwtToken} from '../../providers/types.ts';
import {IRegistrationVolunteerRequestDTO} from '../../data-contracts.ts';

export type Role = typeof ROLE_ORGANISATION | typeof ROLE_VOLUNTEER;
export type User = {
  username: string;
  role: Role;
};

export interface IJwtResponse {
  token?: string;
}

export interface IJwtRequest {
  username?: string;
  password?: string;
}

export class AuthServiceImpl implements AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageHelper: LocalStorageHelper
  ) {}

  mapLoginCredentialsToJwtRequest = (
    credentials: LoginCredentials
  ): IJwtRequest => {
    const {username, password} = credentials;
    return {username, password};
  };

  public async login(credentials: LoginCredentials): Promise<User> {
    const credentialsDTO: IJwtRequest =
      this.mapLoginCredentialsToJwtRequest(credentials);

    const response = await this.httpClient.post<IJwtResponse, IJwtRequest>(
      API_ENDPOINTS.LOGIN,
      credentialsDTO,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const token = this.validateToken(response.data.token);
    const decodedToken = this.decodeToken(token);
    this.validateDecodedToken(decodedToken);
    const role = this.mapRole(decodedToken.roles[0]);
    const user = this.createUser(decodedToken, role);
    this.localStorageHelper.setItem(AUTH_TOKEN, token);

    return user;
  }

  private validateToken(token: string | undefined) {
    if (!token) {
      throw new Error('Token not found');
    }
    return token;
  }

  private decodeToken(token: string): JwtToken {
    try {
      return jwtDecode<JwtToken>(token);
    } catch (error) {
      throw new Error('Failed to decode token');
    }
  }

  private validateDecodedToken(decodedToken: JwtToken): void {
    if (!decodedToken.roles || decodedToken.roles.length === 0) {
      throw new Error('No roles found in token');
    }
  }

  private mapRole(role: string): Role {
    switch (role) {
      case ROLE_VOLUNTEER:
        return ROLE_VOLUNTEER;
      case ROLE_ORGANISATION:
        return ROLE_ORGANISATION;
      default:
        throw new Error('Invalid role found in token');
    }
  }

  private createUser(decodedToken: JwtToken, role: Role): User {
    return {
      username: decodedToken.sub,
      role: role,
    };
  }

  logout(): void {}

  registerOrganisation(
    organisationData: IRegistrationVolunteerRequestDTO
  ): Promise<void> {
    organisationData;
    return Promise.resolve(undefined);
  }

  registerVolunteer(
    volunteerData: IRegistrationVolunteerRequestDTO
  ): Promise<void> {
    volunteerData;
    return Promise.resolve(undefined);
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
      const role = this.mapRole(decodedToken.roles[0]);
      return this.createUser(decodedToken, role);
    } catch (error) {
      return null;
    }
  }
}
