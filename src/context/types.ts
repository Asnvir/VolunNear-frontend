import { ActivitiesService } from '../api/services/ActivitiesService';
import {AuthService} from "../api/services/AuthService.ts";


export type ServiceContextType = {
    activitiesService: ActivitiesService,
    authService: AuthService,
}