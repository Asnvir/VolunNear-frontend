// AuthTypes.ts
import {JwtPayload} from "jwt-decode";

export interface JwtToken extends JwtPayload {
    sub: string;
    exp: number;
    roles: string[];
}