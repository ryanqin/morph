import Grid from "@material-ui/core/Grid"
import Typography from "@mui/material/Typography"
import useTheme from "@mui/material/styles/useTheme";

type OverviewProps = {
    id: string,
    status: string,
    taskType: string,
    submit_time: string,
    process_started: string,
    process_finished: string,
    user_address: string,
    application: string
}


const Overview = (props:OverviewProps) => {
    const theme = useTheme();

    return <Grid container>

        <Grid container item>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.contrastText}>Application:</Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h5"} style={{marginLeft: "2rem"}} color={theme.palette.primary.main}>
                    {props.application}</Typography>
            </Grid>
        </Grid>

        <Grid container item style={{marginTop: "1rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.contrastText}>Type:</Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h5"} style={{marginLeft: "2rem"}} color={theme.palette.primary.main}>
                    {props.taskType}</Typography>
            </Grid>
        </Grid>

        <Grid container item style={{marginTop: "1rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.contrastText}>Status:</Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h5"} style={{marginLeft: "2rem"}} color={theme.palette.primary.main}>
                    {props.status}</Typography>
            </Grid>
        </Grid>

        <Grid container item style={{marginTop: "1rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.contrastText}>Submitted at:</Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h5"} style={{marginLeft: "2rem"}} color={theme.palette.primary.main}>{props.submit_time}</Typography>
            </Grid>
        </Grid>

        <Grid container item style={{marginTop: "1rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.contrastText}>Submitted by:</Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h5"} style={{marginLeft: "2rem"}} color={theme.palette.primary.main}>
                    {props.user_address}</Typography>
            </Grid>
        </Grid>

        <Grid container item style={{marginTop: "1rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.contrastText}>Processing Started:</Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h5"} style={{marginLeft: "2rem"}} color={theme.palette.primary.main}>
                    {props.process_started}</Typography>
            </Grid>
        </Grid>

        <Grid container item style={{marginTop: "1rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.contrastText}>Processing Finished:</Typography>
            </Grid>
            <Grid item>
                <Typography variant={"h5"} style={{marginLeft: "2rem"}} color={theme.palette.primary.main}>
                    {props.process_finished}</Typography>
            </Grid>
        </Grid>
    </Grid>
}


export default Overview