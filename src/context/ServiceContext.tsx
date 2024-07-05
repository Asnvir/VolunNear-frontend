import {createContext} from 'react';
import {ServiceContextType} from "./types";

export const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

