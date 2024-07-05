import fetchWithAuth from "../../utils/fetchWithAuth.ts";
import {API_ENDPOINTS} from "../../contsts/apiContsts.ts";


interface LoginCredentials {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const data = await fetchWithAuth<LoginResponse>(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (data.token) {
        localStorage.setItem('token', data.token);
    }

    return data;
};

export default loginUser;