import {createContext} from "react";
import {AuthContextType} from "./types.ts";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);