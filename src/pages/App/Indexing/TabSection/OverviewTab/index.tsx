import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useSettings from "../../../../../hooks/aboutSettings/useSettings";

const Overview = (props:any) =>{
    const theme = useTheme();
    const {settings} = useSettings();
    const {protocol, protocolType} = props;

    return <Grid container>
        <Grid container style={{width: "100%",  paddingTop: "1.5rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>

            <Grid container item style={{paddingBottom: "1.5rem"}}>
                <Grid item xs={3}>
                    <Typography variant={"body2"} color={theme.palette.primary.contrastText}>Meta App</Typography>
                    <Typography variant={"h6"} color={theme.palette.primary.main}>{protocol.metaApp}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant={"body2"} color={theme.palette.primary.contrastText}>Indexed Network</Typography>
                    <Typography variant={"h6"} color={theme.palette.primary.main}>{protocol.indexedNetwork}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant={"body2"} color={theme.palette.primary.contrastText}>ZK Verifier Contract Address</Typography>
                    <Typography variant={"h6"} color={theme.palette.primary.main}>{protocol.zKVerifierContractAddress}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant={"body2"} color={theme.palette.primary.contrastText}>Circuit Size Estimation</Typography>
                    <Typography variant={"h6"} color={theme.palette.primary.main}>{protocol.circuitSizeEstimation}</Typography>
                </Grid>
            </Grid>


            <Grid container item  style={{paddingTop: "1.5rem",
                borderTop: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`,
            }}>
                <Grid item xs={3}>
                    <Typography variant={"body2"} color={theme.palette.primary.contrastText}>Source Contract Address</Typography>
                    <Typography variant={"h6"} color={theme.palette.primary.main}>{protocol.sourceContractAddress}</Typography>
                </Grid>

                {
                    protocolType === "ZKAUTOMATION" &&  <Grid item xs={3}>
                        <Typography variant={"body2"} color={theme.palette.primary.contrastText}>Trigger Contract Address</Typography>
                        <Typography variant={"h6"} color={theme.palette.primary.main}>{protocol.triggerContractAddress}</Typography>
                    </Grid>
                }

                {
                    protocolType === "ZKAUTOMATION" &&  <Grid item xs={3}>
                        <Typography variant={"body2"} color={theme.palette.primary.contrastText}>Destination Contract Address</Typography>
                        <Typography variant={"h6"} color={theme.palette.primary.main}>{protocol.destinationContractAddress}</Typography>
                    </Grid>
                }

                <Grid item xs={3}>
                    <Typography variant={"body2"} color={theme.palette.primary.contrastText}>Start Block</Typography>
                    <Typography variant={"h6"} color={theme.palette.primary.main}>{protocol.startBlock}</Typography>
                </Grid>

            </Grid>

        </Grid>

        <Grid container direction={"column"} style={{paddingTop: "2.5rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.main}>Nodes (developing)</Typography>
            </Grid>
            <Grid container item style={{paddingTop: "1.5rem", paddingBottom: "1.5rem",  borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>
                <Grid item container>
                    <Grid item xs={4}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Account</Typography></Grid>
                    <Grid item xs={4}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Country/Region</Typography></Grid>
                    <Grid item xs={4}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>State/City</Typography></Grid>
                </Grid>
            </Grid>
            <Grid container item style={{paddingTop: "1.5rem", paddingBottom: "1.5rem",  borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>
                <Grid item container>
                    <Grid item xs={4}><Typography variant={"h6"} color={theme.palette.primary.main}>0xd3d2e2-39a17</Typography></Grid>
                    <Grid item xs={4}><Typography variant={"h6"} color={theme.palette.primary.main}>USA</Typography></Grid>
                    <Grid item xs={4}><Typography variant={"h6"} color={theme.palette.primary.main}>California</Typography></Grid>
                </Grid>
            </Grid>
        </Grid>

    </Grid>




}


export default Overview;
