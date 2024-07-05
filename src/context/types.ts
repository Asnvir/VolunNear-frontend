import { ActivitiesService } from '../api/services/ActivitiesService';
import {AuthService} from "../api/services/AuthService.ts";
import {User} from "../types.ts";


export type ServiceContextType = {
    activitiesService: ActivitiesService,
    authService: AuthService,
}

export type AuthContextType = {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: boolean;
}
