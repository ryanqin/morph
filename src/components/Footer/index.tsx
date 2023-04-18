import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import zkWASMLogo from "../../assets/icons/zkwasm.png";

const Footer = () =>{
    const currentDate = new Date();

    return (
        <Grid item container spacing={4} alignItems="center" sx={{marginTop: "120px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "48px", paddingRight: "48px"}}>
            <Grid item xs={2}>
                <Typography color="#527C93" variant={"subtitle1"}>{currentDate.getFullYear()} Morph AI </Typography>
            </Grid>
            <Grid item xs={1.5} textAlign={"right"}><Typography color="#527C93" variant={"subtitle1"}>Terms & Conditions</Typography></Grid>
            <Grid item xs={1.5} textAlign={"right"}><Typography color="#527C93" variant={"subtitle1"}>Privacy Policies</Typography></Grid>
        </Grid>
    )
}

export default Footer;
