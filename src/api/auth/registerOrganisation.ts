import fetchWithAuth from '../../utils/fetchWithAuth';
import {API_ENDPOINTS} from "../../contsts/apiContsts.ts";

interface RegistrationOrganisationRequestDTO {
    username: string;
    password: string;
    email: string;
    nameOfOrganisation: string;
    country: string;
    city: string;
    address: string;
}

interface RegistrationResponse {
    success: boolean;
    message: string;
}

const registerOrganisation = async (data: RegistrationOrganisationRequestDTO): Promise<RegistrationResponse> => {
    return await fetchWithAuth<RegistrationResponse>(API_ENDPOINTS.REGISTER_ORGANISATION  , {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export default registerOrganisation;