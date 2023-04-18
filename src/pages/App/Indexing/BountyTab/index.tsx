import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material";
import useSettings from "../../../../hooks/aboutSettings/useSettings";

const BountySection = () =>{
    const theme = useTheme();
    const {settings} = useSettings();

    return  <Grid container direction={"column"} style={{paddingTop: "2.5rem"}}>
        <Grid item>
            <Typography variant={"h5"} color={theme.palette.primary.main}>Bounty (developing)</Typography>
        </Grid>
        <Grid container item style={{paddingTop: "1.5rem", paddingBottom: "1.5rem",  borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>
            <Grid item container>
                <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Name</Typography></Grid>
                <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Creator</Typography></Grid>
                <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Total Fee Pool</Typography></Grid>
                <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Fee Per Call</Typography></Grid>
                <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Active Nodes</Typography></Grid>
                <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Lifecycle</Typography></Grid>
            </Grid>
        </Grid>
        <Grid container item style={{paddingTop: "1.5rem", paddingBottom: "1.5rem",  borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>
            <Grid item container>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}>UniswapBot</Typography></Grid>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}>0xf87a1-e0549a</Typography></Grid>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}>2000 $ETH</Typography></Grid>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}>20 $ETH/Call</Typography></Grid>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}>3</Typography></Grid>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}>100 blocks</Typography></Grid>
            </Grid>
        </Grid>
    </Grid>
}

export default BountySection;
