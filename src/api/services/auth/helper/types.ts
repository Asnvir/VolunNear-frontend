import {JwtToken, Role} from '../service/types.ts';

export type AuthHelper = {
  validateToken(token: string | undefined): string;
  decodeToken(token: string): JwtToken;
  validateDecodedToken(decodedToken: JwtToken): void;
  mapRole(role: string): Role;
};
