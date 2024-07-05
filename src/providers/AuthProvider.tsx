import React, {useEffect, useState} from "react";
import {useServiceContext} from "../shared/hooks/useServiceContext.tsx";
import {AuthContext} from "../context/AuthContext.tsx";
import {jwtDecode} from 'jwt-decode';
import {AUTH_TOKEN} from "../utils/constants.ts";
import {JwtToken} from "./types.ts";
import {User} from "../types.ts";
import {LocalStorageHelper} from "../helpers/LocalStorageHelper.ts";
type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider :React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const {authService} = useServiceContext();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const localStorageHelper = new LocalStorageHelper();
    const login = async (username, password) => {
        try {
            const { token } = await authService.login({username, password}) || "";
            const decodedToken = jwtDecode<JwtToken>(token);
            const role = mapRole(decodedToken.roles[0]);
            const user:User = {username: decodedToken.sub, role: role};
            setUser(user);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        authService.logout().then(() =>setUser(null));
        setIsLoggedIn(false);
    };

    // Function to check if the user is authenticated on initial load
    useEffect(() => {
        const token = localStorageHelper.getItem(AUTH_TOKEN);
        if (token) {
            try {
                const decodedToken = jwtDecode<JwtToken>(token); // Decoding the token with DecodedToken type
                const role = mapRole(decodedToken.roles[0]);
                const user: User = { username: decodedToken.sub, role: role };
                if (decodedToken.exp * 1000 > Date.now()) {
                    setUser(user);
                } else {
                    logout();
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                logout();
            }
        }
    }, []);

    const mapRole = (role: string): "volunteer" | "organization" => {
        if (role === "ROLE_VOLUNTEER") return "volunteer";
        if (role === "ROLE_ORGANISATION") return "organization";
        throw new Error("Invalid role");
    };
    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};