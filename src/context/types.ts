import { ActivitiesService } from '../api/services/ActivitiesService';
import {User} from "../types.ts";
import {AuthService} from "../api/services/AuthService.ts";


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
