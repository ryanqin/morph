import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

type Props = {
    pub: string
}
const Input = (props: Props) =>{
    const theme = useTheme();

    return <Grid container >
        <Grid item>
            <Typography variant={"h5"} color={theme.palette.primary.contrastText}>Public Input</Typography>
        </Grid>
        <Grid item  style={{width: "100%", height: "200px", overflow: "scroll", marginTop: "1rem"}}>
            <Typography variant={"h5"}>{props.pub}</Typography>
        </Grid>
    </Grid>
}


export default Input;