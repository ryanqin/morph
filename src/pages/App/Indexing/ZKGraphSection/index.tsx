import Grid from "@mui/material/Grid";
import useSettings from "../../../../hooks/aboutSettings/useSettings";
import {Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography, useTheme} from "@mui/material";
import { useState } from "react";
import InputSection from "./InputSection";
import StyledPlayButtonIcon from "../../../../assets/icons/tools/StyledPlayButtonIcon";
import OutputSection from "./OutputSection";
import usePlayground from "../../../../hooks/aboutPlayground/usePlayground";
import {useParams} from "react-router-dom";

const ZKGraphSection = () =>{

    const {settings} = useSettings();
    const theme = useTheme();
    const [value, setValue] = useState('ONCHAIN');
    const [verifyWarning, setVerifyWarning] = useState(null);
    const {protocolType} = useParams();

    const {pullData, playgroundDataGetter, updateData, offChainVerify,getVerificationResultGetter, getIsVerifying, getPulledData} = usePlayground();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return <Grid container style={{ height: "30rem",
        borderRight: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`,
        borderLeft: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`,
        borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`
    }}>
        <Grid direction={"column"} container item xs={4} style={{backgroundColor: "#202224", padding: "3rem", borderRight: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>

            <Typography variant={"h6"} color={"#DCF3FF"} style={{marginBottom: "1rem"}}># GraphQL query defined</Typography>

            <Grid item sx={{ height: "32px", width: "32px"}}>
                <StyledPlayButtonIcon onClick={()=>pullData(protocolType)} circleBg={"#2F4253"} triangleBg={"#0F9AFF"} circleBgHover={"#0F9AFF"} triangleBgHover={"#FFFFFF"}/>
            </Grid>

            <InputSection/>
        </Grid>

        <Grid container direction={"column"} item xs={4} style={{ backgroundColor: "#202224", paddingTop: "3rem",paddingBottom: "3rem", borderRight: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>
            <Grid item xs={1} style={{paddingLeft: "3rem"}}>
                <Typography variant={"h6"} color={"#DCF3FF"}># data received [not a completed proof]</Typography>
            </Grid>
            {getPulledData && <OutputSection setVerifyWarning={(v)=>setVerifyWarning(v)} verifyWarning={verifyWarning} updateData={updateData}  playgroundDataGetter={playgroundDataGetter}/>}
        </Grid>

        <Grid container item xs={4} style={{padding: "3rem"}}>
            <Grid item>
                <Typography style={{marginBottom: "1rem"}} variant={"h6"} color={theme.palette.primary.main}>Verify data and proof with zk verifier:</Typography>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <Typography variant={"h5"} color={theme.palette.primary.main}> <FormControlLabel value="ONCHAIN" control={<Radio />} label="" />On-Chain</Typography>
                        <Typography variant={"h5"} color={theme.palette.divider}> <FormControlLabel disabled value="OFFCHAIN" control={<Radio />} label="" />Off-Chain (developing)</Typography>

                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item>
                <Button  sx={{ borderRadius: "0",
                    backgroundColor: theme.palette.secondary.main,
                    padding: "0.5625rem 5rem",
                    color: theme.palette.text.secondary,
                    ":hover":{
                        opacity: 0.7
                    },

                    ":active":{
                        color: theme.palette.action.active,
                        backgroundColor: theme.palette.action.active,
                    }
                }} variant={"text"} disabled={getIsVerifying || !getPulledData || getVerificationResultGetter === true || verifyWarning} onClick={()=>offChainVerify(protocolType)}>
                    {getIsVerifying && getVerificationResultGetter === "SENDING" &&  <Typography variant={"h6"}>Verifying...</Typography>}
                    {getVerificationResultGetter === false && <Typography variant={"h6"} color={theme.palette.error.main}>Invalid</Typography>}
                    {getVerificationResultGetter === true && <Typography variant={"h6"} color={theme.palette.success.main}>Valid</Typography>}
                    {getVerificationResultGetter === "UNSENT" && <Typography variant={"h6"} color={theme.palette.text.secondary}>Verify {verifyWarning}</Typography>}
                </Button>
                <Typography style={{marginTop: "1rem"}} variant={"subtitle1"} color={theme.palette.primary.contrastText}>Data and proof are verified through verification contract.</Typography>
            </Grid>
        </Grid>
    </Grid>
}

export default ZKGraphSection;
