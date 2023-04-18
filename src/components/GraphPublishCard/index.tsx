import Button from "@mui/material/Button/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography/Typography";
import ButtonSecond from "../Buttons/ButtonSecond";

const GraphPublishCard = () =>{
    return <Grid container sx={{height: "15.5rem", width: "100%", marginTop: "12.75rem", padding: "3.6rem", borderTop: "0.5px solid #527C93", borderBottom: "0.5px solid #527C93"}}>
        <Grid container item direction={"column"} justifyContent={"space-between"} alignItems={"center"}>
            <Grid item >
                <Typography variant="h3">Already have a zkGraph?</Typography>
            </Grid>
            <Grid item>
                <ButtonSecond text={"Publish your own"} to={{link: "", isInternal: true}}/>
            </Grid>
        </Grid>
    </Grid>

}


export default GraphPublishCard;