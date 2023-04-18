import Box from "@mui/material/Box/Box";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";

type AngleProps = {
    sign: string,
    text: string
}

const Angle = (props: AngleProps) =>{
    return <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent:"space-between",
        marginTop: 0, marginLeft: 4, marginRight: 4}}>
        <Box>
            <Typography style={{fontSize:"72px", fontWeight: "700px", color: "#0F9AFF"}}>{props.sign}</Typography>
        </Box>
        <Box>
            <Typography variant={"h5"}>{props.text}</Typography>
        </Box>
    </Box>
}

const TriangleRole = () =>{
    return <>
        <Grid container direction={"column"}   justifyContent="center" alignItems="center" >
            <Grid item container direction={"row"}   justifyContent="center" alignItems="center">
                <Grid item>
                    <Box style={{
                        position: "relative",
                        top: 30,
                        width: "102.16px",
                        border: "1px solid #A9CCDF",
                        borderRadius: "48px",
                        transform: "rotate(-30deg)",
                    }}/>
                </Grid>
                <Grid item>
                    <Angle sign={"*"} text={"Node"}/>
                </Grid>
                <Grid item>
                    <Box style={{
                        position: "relative",
                        top: 30,
                        width: "102.16px",
                        border: "1px solid #A9CCDF",
                        borderRadius: "48px",
                        transform: "rotate(30deg)",
                    }}/>
                </Grid>
            </Grid>
            <Grid item container direction={"row"}  justifyContent="center" alignItems="center">
                <Grid item>
                    <Angle sign={"[]"} text={"Query Client"}/>
                </Grid>
                <Grid item>
                    <Box style={{
                        // position: "absolute",
                        width: "346px",
                        height: "0px",
                        left: "772px",
                        top: "1506px",
                        border: "1px solid #A9CCDF",
                        borderRadius: "48px"
                    }}/>
                </Grid>
                <Grid item>
                    <Angle sign={"<>"} text={"Creator"}/>
                </Grid>
            </Grid>
        </Grid>


    </>


}

export default TriangleRole;