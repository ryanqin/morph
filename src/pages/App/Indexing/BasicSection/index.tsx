import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonFirst from "../../../../components/Buttons/ButtonFirst";
import LightSwitch from "../../../../components/LightSwitch";
import barchartBlue from "../../../../assets/barchartBlue.svg";
import useTheme from "@mui/material/styles/useTheme";
import { GithubCat, Internet } from "../../../../assets/icons/socials";
import { useState } from "react";
import InstantDataTracker from "./InstantDataTracker";
import useIndexingTabs from "../../../../hooks/aboutIndexingTabs/useIndexingTabs";
import {TABS} from "../../../../contexts/IndexingTabsContext";
import AutomationChart from "../../Automation/AutomationChart";
import * as React from "react";

const BasicSection = (props:any) =>{
    const theme = useTheme();
    const [openTracker, setOpenTracker] = useState(false);
    const {protocol} = props;
    const {currentTab} = useIndexingTabs();

    return <Grid container sx={{width: "100%", height: "14.75rem", marginTop: "198px"}} justifyContent={"space-between"}>

        <Grid container item xs={7} direction="column" flexWrap="nowrap">
            <Grid item container xs={4}>
                <Grid container item xs="auto" direction="column" justifyContent={"space-between"}>
                    <Typography variant={"h2"} maxWidth="500px" color={theme.palette.primary.main}>{protocol.name}</Typography>
                    <Typography variant={"body2"}  color={theme.palette.primary.main}><span style={{color: theme.palette.secondary.contrastText}}>By</span> {protocol.address.slice(0, 5)+".."+protocol.address.slice(-5)}</Typography>
                </Grid>
                <Grid item container xs alignItems={"center"}>
                    <img src={protocol.basic.logo} alt={"logo"} style={{marginLeft: "1rem", width: "65px", height: "65px"}}/>
                </Grid>
            </Grid>
            <Grid container item xs={2}  alignItems={"center"}>
                <Typography variant={"h5"}  color={theme.palette.primary.main}>{protocol.basic.version}</Typography>
            </Grid>
            <Grid item container xs={2}   alignItems={"center"}>
                <Typography variant={"body2"} style={{color: theme.palette.primary.contrastText}}>{protocol.basic.intro}</Typography>
            </Grid>
            <Grid item container xs={4}  alignItems={"flex-end"}>
                {/* 8px line height (same as height of ButtonFirst) is for vertically align content */}
                <Grid item container style={{lineHeight: "8px", marginRight: "2.5rem"}} flexBasis={"content"}>
                    <Grid item>
                        <Internet fill={theme.palette.primary.contrastText} height={"1.5rem"} width={"1.5rem"} />
                    </Grid>
                    <Grid item style={{marginLeft: "0.4rem"}}>
                        <ButtonFirst noArrow textColor={theme.palette.primary.contrastText} text={protocol.basic.links[0].name} to={{link: protocol.basic.links[0].link, isInternal: false}}/>
                    </Grid>
                </Grid>
                <Grid item container style={{lineHeight: "8px"}} flexBasis={"content"}>
                    <Grid item>
                        <GithubCat fill={theme.palette.primary.contrastText} height={"1.5rem"} width={"1.5rem"} />
                    </Grid>
                    <Grid item style={{marginLeft: "0.4rem"}}>
                        <ButtonFirst noArrow textColor={theme.palette.primary.contrastText} text={protocol.basic.links[1].name} to={{link: protocol.basic.links[1].link, isInternal: false}}/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

        <Grid container item xs={5} direction={"column"} justifyContent={"space-between"}>
            {!openTracker && currentTab !== TABS.AUTOMATION  && <Grid item container xs={2} justifyContent={"flex-end"}>
                <LightSwitch/>
            </Grid>}
            {openTracker && currentTab !== TABS.AUTOMATION  && <InstantDataTracker/>}
            {
                currentTab === TABS.AUTOMATION && <AutomationChart/>
            }
            {
                currentTab !== TABS.AUTOMATION &&   <Grid item container xs={2} justifyContent={"flex-end"}>
                    <Button onClick={()=>setOpenTracker(!openTracker)}  sx={{ borderRadius: "0",
                        backgroundColor: theme.palette.secondary.main,
                        padding: "0.5625rem 0.5625rem",
                        color: theme.palette.text.secondary,
                        ":hover":{
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.text.secondary,
                        },

                        ":active":{
                            color: theme.palette.action.active,
                            backgroundColor: theme.palette.action.active,
                        }
                    }} variant={"text"}>
                        Ethereum Network Tracker
                        <img src={barchartBlue } alt={"chartSVG"}/>
                    </Button>
                </Grid>
            }
        </Grid>
    </Grid>
}

export default BasicSection;
