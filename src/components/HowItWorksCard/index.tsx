import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography/Typography";
import theGraph from "../../assets/icons/thegraph.png";
import ab from "../../assets/icons/ab.png";
import ch from "../../assets/icons/ch.png";
import eth from "../../assets/icons/eth.png";
import gh from "../../assets/icons/gh.png";
import ml from "../../assets/icons/ml.png";

import yu from "../../assets/icons/yu.png";
import rt from "../../assets/icons/rt.png";
import we from "../../assets/icons/we.png";
import qa from "../../assets/icons/qa.png";
import cv from "../../assets/icons/cv.png";
import mn from "../../assets/icons/mn.png";

import vector_1 from "../../assets/Vector_1.svg";
import vector_2 from "../../assets/vector_2.svg";
import HO from "../../assets/Hyper Oracle Logo.svg";

import * as React from "react";
import { useTheme } from "@mui/material";

const HowItWorksCard = () => {
    const theme = useTheme();

    return (
        <Box>
            <Box>
                <Typography variant={"h3"} style={{marginBottom: "1rem", marginTop: "8.5rem"}} color={theme.palette.primary.main}> {"< >"} </Typography>
                <Typography style={{marginTop: "1rem", marginBottom: "3rem"}}  variant={"h1"} color={theme.palette.primary.main}>How does zkIndexing work?</Typography>
            </Box>

            <Grid container style={{width: "100%", height: "361px"}}>

                <Grid container direction={"column"} item  xs={5}>
                    <Grid  container item xs={3} >

                        <Grid container item xs={3} alignItems={"center"}>
                            <Typography variant={"body2"} color={theme.palette.primary.main}>Existing Index & Query Schema</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={theGraph} alt={"logo"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={ch} alt={"logo"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={ab} alt={"logo"}/>
                        </Grid>

                    </Grid>

                    <Grid  container item xs={5} justifyContent={"flex-end"} alignItems={"center"}>
                        <Grid item>
                            <Typography variant="h3" color={theme.palette.primary.main}>Index by zkIndexing</Typography>
                        </Grid>
                    </Grid>

                    <Grid  container item>

                        <Grid container item xs={3}  alignItems={"center"}>
                            <Typography variant={"body2"} color={theme.palette.primary.main}>Any Other Smart Contracts</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={eth} alt={"logo"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={gh} alt={"logo"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={ml} alt={"logo"}/>
                        </Grid>

                    </Grid>
                </Grid>

                <Grid container item  xs={2} alignItems={"center"} justifyContent={"center"}>

                    <Grid item xs={2}>
                      <img src={vector_1} alt={"vector"}/>
                    </Grid>
                    <Grid container item xs={8} alignItems={"center"} justifyContent={"center"}>
                        <Grid item>
                            <img src={HO} alt={"vector"}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <img src={vector_2} alt={"vector"}/>
                    </Grid>

                </Grid>

                <Grid container direction={"column"} item  xs={5}>
                    <Grid  container item xs={3} >

                        <Grid item xs={3}>
                            <img src={mn} alt={"logo"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={cv} alt={"logo"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={qa} alt={"logo"}/>
                        </Grid>
                        <Grid container item xs={3} alignItems={"center"}>
                            <Typography variant={"body2"} color={theme.palette.primary.main}>Dashboards & Data Analytics</Typography>
                        </Grid>

                    </Grid>

                    <Grid  container item xs={5} justifyContent={"flex-start"} alignItems={"center"}>
                        <Grid item>
                            <Typography variant="h3" color={theme.palette.primary.main}>Query w/ Graph QL</Typography>
                        </Grid>
                    </Grid>

                    <Grid  container item>

                        <Grid item xs={3}>
                            <img src={we} alt={"logo"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={rt} alt={"logo"}/>
                        </Grid>
                        <Grid item xs={3}>
                            <img src={yu} alt={"logo"}/>
                        </Grid>
                        <Grid container item xs={3}  alignItems={"center"}>
                            <Typography variant={"body2"} color={theme.palette.primary.main}>DeFi, NFTfi, and DEX</Typography>
                        </Grid>

                    </Grid>
                </Grid>

            </Grid>
        </Box>
    )
}


export default HowItWorksCard;
