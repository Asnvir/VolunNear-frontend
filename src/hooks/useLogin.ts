import {useAuthContext} from "../shared/hooks/useAuthContext.tsx";


export const useLogin = () => {
    const authContext = useAuthContext();
    return authContext.login;
}