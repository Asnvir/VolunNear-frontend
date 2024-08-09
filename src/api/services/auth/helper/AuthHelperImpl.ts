import {AuthHelper} from './types.ts';
import {jwtDecode} from 'jwt-decode';
import {
  ROLE_ORGANISATION,
  ROLE_VOLUNTEER,
} from '../../../../utils/constants/authConstants.ts';
import {JwtToken, Role} from '../service/types.ts';

export class AuthHelperImpl implements AuthHelper {
  private static instance: AuthHelperImpl | null = null;

  private constructor() {}

  public static getInstance(): AuthHelperImpl {
    if (!AuthHelperImpl.instance) {
      AuthHelperImpl.instance = new AuthHelperImpl();
    }
    return AuthHelperImpl.instance;
  }

  public validateToken(token: string | undefined): string {
    if (!token) {
      throw new Error('Token not found');
    }
    return token;
  }

  public decodeToken(token: string): JwtToken {
    try {
      return jwtDecode<JwtToken>(token);
    } catch (error) {
      throw new Error('Failed to decode token');
    }
  }

  public validateDecodedToken(decodedToken: JwtToken): void {
    if (!decodedToken.roles || decodedToken.roles.length === 0) {
      throw new Error('No roles found in token');
    }
  }

  public mapRole(role: string): Role {
    switch (role) {
      case ROLE_VOLUNTEER:
        return ROLE_VOLUNTEER;
      case ROLE_ORGANISATION:
        return ROLE_ORGANISATION;
      default:
        throw new Error('Invalid role found in token');
    }
  }
}
