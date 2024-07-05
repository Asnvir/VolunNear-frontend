// src/api/auth/registerVolunteer.ts
import fetchWithAuth from '../../utils/fetchWithAuth';
import {API_ENDPOINTS} from "../../contsts/apiContsts.ts";

interface RegistrationVolunteerRequestDTO {
    username: string;
    password: string;
    email: string;
    realName: string;
}

interface RegistrationResponse {
    success: boolean;
    message: string;
}

const registerVolunteer = async (data: RegistrationVolunteerRequestDTO): Promise<RegistrationResponse> => {
    return await fetchWithAuth<RegistrationResponse>(API_ENDPOINTS.REGISTER_VOLUNTEER, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export default registerVolunteer;
