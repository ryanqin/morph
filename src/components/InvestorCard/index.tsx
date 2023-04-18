import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import investorIcon from "../../assets/icons/investors.png";

const InvestorCard = () =>{

    return <Grid container>
        <Grid item>
            <Typography variant={"h2"}>Investors</Typography>
        </Grid>
        <Grid item>
            <img alt={"investors"} src={investorIcon}/>
        </Grid>
    </Grid>

}


export default InvestorCard;