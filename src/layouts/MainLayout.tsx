import {Outlet} from "react-router-dom";
import {Footer} from "../components/Footer";
import {Box} from "@chakra-ui/react";

export const MainLayout = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box as="main" flex="1" p={4}>
                <Outlet/>
            </Box>
            <Footer/>
        </Box>
    );
};


