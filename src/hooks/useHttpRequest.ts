import { useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import { useKeycloak } from "@react-keycloak/web";

// Create a new Axios instance with default configuration
const httpRequest: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const useHttpRequest = (): AxiosInstance => {
    const { keycloak } = useKeycloak();

    useEffect(() => {
        // Add an interceptor to include the authentication token in each request
        const interceptor = httpRequest.interceptors.request.use(
            (config) => {
                const token = keycloak.token;
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Cleanup the interceptor when the component unmounts
        return () => {
            httpRequest.interceptors.request.eject(interceptor);
        };
    }, [keycloak.token]);

    return httpRequest;
};
