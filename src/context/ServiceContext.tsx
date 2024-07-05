import { createContext} from 'react';
import { SericeContextType } from "./types";

export const ServiceContext = createContext<SericeContextType | undefined>(undefined);

