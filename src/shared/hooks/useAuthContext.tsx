import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext.tsx";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};

