// import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from "./App.tsx";
import {ChakraProvider} from '@chakra-ui/react';
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </ChakraProvider>
)
