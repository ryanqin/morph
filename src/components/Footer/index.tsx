import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import {useMediaQuery} from "@mui/material";

const Footer = () =>{
    const currentDate = new Date();
    const smQuery = useMediaQuery('(max-width:600px)');

    return (
        <Grid container direction={"row"} justifyContent={"space-between"} sx={{marginTop: "7.5rem", padding: smQuery? "" :  "0.625rem 3rem 0.625rem 3rem"}}>
            <Grid item xs={smQuery? 3:6}>
                <Typography color="#527C93" variant={"subtitle1"}>{currentDate.getFullYear()}Morph AI</Typography>
            </Grid>

            <Grid item container  direction={"row"}  xs={smQuery?9:6} spacing={smQuery? 2 : 3} justifyContent={"flex-end"}>
                <Grid item><Typography color="#527C93" variant={"subtitle1"}>Terms & Conditions</Typography></Grid>
                <Grid item><Typography color="#527C93" variant={"subtitle1"}>Privacy Policies</Typography></Grid>
            </Grid>
        </Grid>
    )
}

export default Footer;
