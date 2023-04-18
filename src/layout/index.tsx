import {Paper} from "@mui/material";
import { Outlet } from "react-router-dom";
import AppNavBar from "../components/AppNavBar";
import Footer from "../components/Footer";
import Box from "@mui/material/Box";
import WagmiProvider from "../contexts/wagmiContext";
import * as React from "react";

const MainLayout = ()=>{
    return <Paper sx={{height: 'auto', width: 'auto', minHeight:"auto", minWidth:"auto"}} square elevation={0}>
        <Box style={{position: "absolute", width: "40vw",
            height: "635.05px",
            left: "40vw",
            top: "-409.39px", background: "#0F9AFF", opacity: 0.1, filter: "blur(150px)", transform: "rotate(12.08deg)"}}/>
        <Box style={{position: "absolute",
            width: "30vw",
            height: "635.05px",
            left: "10.66px",
            top: "-20vh", background: "#5CDFFC", opacity: 0.07, filter: "blur(150px)", transform: "rotate(12.08deg)"}}/>
        <WagmiProvider>
            <AppNavBar>
                <Outlet />
            </AppNavBar>
        </WagmiProvider>
        <Footer/>
    </Paper>
}

export default MainLayout;
