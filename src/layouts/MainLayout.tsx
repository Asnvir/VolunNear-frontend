import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer";
import {Box} from "@chakra-ui/react";
import {Nav} from '../components/navigation/Nav.tsx';


export const MainLayout = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Nav />
            <Box flex="1">
              <Outlet />
            </Box>
            <Footer />
        </Box>
    );
};


