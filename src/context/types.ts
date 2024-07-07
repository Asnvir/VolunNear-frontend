import {ActivitiesServiceImpl} from '../api/services/ActivitiesServiceImpl.ts';
import {User} from '../api/types.ts';
import {AuthServiceImpl} from '../api/services/AuthServiceImpl.ts';

export type ServiceContextType = {
  activitiesService: ActivitiesServiceImpl;
  authService: AuthServiceImpl;
};

export type AppState = {
  user: User | null;
};

export type AppStateContextType = {
  state: AppState;
  setUser: (user: User | null) => void;
};

export type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
};
