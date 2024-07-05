
import {useAuthContext} from "../shared/hooks/useAuthContext.tsx";

export const useLoggedIn = () => {
    const authContext = useAuthContext();
    return authContext.isLoggedIn;
}