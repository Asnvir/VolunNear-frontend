import {useServiceContext} from "../shared/hooks/useServiceContext.tsx";


export const useLogin = () => {
    const {authService} = useServiceContext();
    const login = async (username: string, password: string) => {
        try {
            await authService.login({username, password});
        } catch (err) {
            console.error("Error logging in", err);
            throw err;
        }
    };

    return { login };
};