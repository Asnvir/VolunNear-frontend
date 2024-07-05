import React from "react";
import {ChakraProvider} from "@chakra-ui/react";
import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";


const App: React.FC = () => {
    return (
        <ChakraProvider>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
        </ChakraProvider>
    );
};

export default App;