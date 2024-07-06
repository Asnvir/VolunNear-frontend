import {
    IJwtRequest,
    IJwtResponse,
    IRegistrationOrganisationRequestDTO,
    IRegistrationVolunteerRequestDTO
} from "../types/data-contracts.ts";
import {API_ENDPOINTS} from "../../contsts/apiContsts.ts";
import {iLocalStorageHelper} from "../../helpers/types.ts";
import {HttpClient} from "../types.ts";
import {AUTH_TOKEN} from "../../utils/constants.ts";

export class AuthService {
    constructor(private httpClient: HttpClient, private localStorageHelper: iLocalStorageHelper) {}

    public async login(credentials: IJwtRequest) {
        const response = await this.httpClient.post<IJwtResponse>(
            API_ENDPOINTS.LOGIN,
            credentials,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        );
        if (response.status !== 200 && response.status !== 201) {
            throw new Error('Login failed');
        }
        const data: IJwtResponse = response.data;
        if(data.token) {
            this.localStorageHelper.setItem(AUTH_TOKEN, data.token);
        }
        return data;
    }

    public async logout() {
        this.localStorageHelper.removeItem(AUTH_TOKEN);
    }

    public async registerVolunteer(volunteerData: IRegistrationVolunteerRequestDTO) {
        return this.httpClient.post<void>(
            API_ENDPOINTS.REGISTER_VOLUNTEER,
            volunteerData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }

    public async registerOrganisation(organisationData: IRegistrationOrganisationRequestDTO) {
        return this.httpClient.post<void>(
            API_ENDPOINTS.REGISTER_ORGANISATION,
            organisationData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}