import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import zkWASMLogo from "../../assets/icons/zkwasm.png";

const Footer = () =>{
    const currentDate = new Date();

    return (
        <Grid container sx={{padding: "2rem"}}>
            <Grid item xs={4} md={9}>
                <Typography color="#527C93" variant={"subtitle1"}>{currentDate.getFullYear()} Morph AI </Typography>
            </Grid>
            <Grid item container xs={8} md={3}>
                <Grid item xs={6} textAlign={"right"}><Typography color="#527C93" variant={"subtitle1"}>Terms & Conditions</Typography></Grid>
                <Grid item xs={6} textAlign={"right"}><Typography color="#527C93" variant={"subtitle1"}>Privacy Policies</Typography></Grid>
            </Grid>
        </Grid>
    )
}

export default Footer;
