import {LoginCredentials} from '../../../../hooks/auth/useLogin/types.ts';
import {RegisterVolCredentials} from '../../../../hooks/auth/useRegisterVol/types.ts';
import {RegisterOrgCredentials} from '../../../../hooks/auth/useRegisterOrg/types.ts';
import {
  ROLE_ORGANISATION,
  ROLE_VOLUNTEER,
} from '../../../../utils/constants/routes.ts';
import {JwtPayload} from 'jwt-decode';

export type AuthService = {
  login: (loginCredentials: LoginCredentials) => Promise<User>;
  logout: () => void;
  registerVolunteer: (
    registerVolCredentials: RegisterVolCredentials
  ) => Promise<void>;
  registerOrganisation: (
    registerOrgCredentials: RegisterOrgCredentials
  ) => Promise<void>;
  getCurrentUser: () => User | null;
};

export type Role = typeof ROLE_ORGANISATION | typeof ROLE_VOLUNTEER;
export type User = {
  username: string;
  role: Role;
};

export type JwtResponse = {
  token?: string;
};

export type JwtRequest = {
  username?: string;
  password?: string;
};

export type JwtToken = JwtPayload & {
  sub: string;
  exp: number;
  roles: string[];
};
