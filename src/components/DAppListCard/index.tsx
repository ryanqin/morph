import { useTheme } from "@mui/material";
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography/Typography";
import * as React from "react";

import kl from "../../assets/DAppList/Group 367.png";
import sd from "../../assets/DAppList/Group 368.png";
import we from "../../assets/DAppList/Group 369.png";
import qw from "../../assets/DAppList/Group 370.png";
import fg from "../../assets/DAppList/Group 371.png";
import jh from "../../assets/DAppList/Group 372.png";
import bv from "../../assets/DAppList/Group 373.png";
import sc from "../../assets/DAppList/Group 386.png";

const DAppListCard = () =>{
    const theme = useTheme();

    return <Box>

        <Box>
            <Typography variant={"h3"} style={{marginBottom: "1rem", marginTop: "8.5rem"}}> {"< >"} </Typography>
            <Typography style={{marginTop: "1rem", marginBottom: "3.875rem"}}  variant={"h2"} color={theme.palette.primary.main}>Open a new world of automation and DApps</Typography>
        </Box>

        <Grid container style={{width: "100%", height: "348px"}}>

            <Grid container item  justifyContent="space-between">
                <Grid container direction={"column"} item xs={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <img src={jh} alt={"logo"} style={{width: "107px", height: "107px"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"} color={theme.palette.primary.main}>Arbitrage Bot</Typography>
                    </Grid>
                </Grid>
                <Grid container item  direction={"column"} xs={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <img src={sc} alt={"logo"} style={{width: "107px", height: "107px"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"} color={theme.palette.primary.main}>MEV Bot</Typography>
                    </Grid>
                </Grid>
                <Grid container item  direction={"column"} xs={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <img src={qw} alt={"logo"} style={{width: "107px", height: "107px"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"} color={theme.palette.primary.main}>DeFi Keeper</Typography>
                    </Grid>
                </Grid>
                <Grid container item  direction={"column"} xs={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <img src={bv} alt={"logo"} style={{width: "107px", height: "107px"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"} color={theme.palette.primary.main}>Trading Bot</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container item  justifyContent="space-between">
                <Grid container direction={"column"} item xs={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <img src={fg} alt={"logo"} style={{width: "107px", height: "107px"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"} color={theme.palette.primary.main}>On-chain Index Fund</Typography>
                    </Grid>
                </Grid>
                <Grid container item  direction={"column"} xs={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <img src={sd} alt={"logo"} style={{width: "107px", height: "107px"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"} color={theme.palette.primary.main}>Programmable LP</Typography>
                    </Grid>
                </Grid>
                <Grid container item  direction={"column"} xs={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <img src={we} alt={"logo"} style={{width: "107px", height: "107px"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"} color={theme.palette.primary.main}>Market Maker Bot</Typography>
                    </Grid>
                </Grid>
                <Grid container item  direction={"column"} xs={2} justifyContent={"center"} alignItems={"center"}>
                    <Grid item>
                        <img src={kl} alt={"logo"} style={{width: "107px", height: "107px"}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"} color={theme.palette.primary.main}>Dynamic NFT</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    </Box>
}


export default DAppListCard;
