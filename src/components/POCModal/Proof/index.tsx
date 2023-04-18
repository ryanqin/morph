import useTheme from "@mui/material/styles/useTheme";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {bytesToBN} from "../../../redux/modules/poc";

type Props = {
    proof: string
}

const Proof = (props:Props) => {
    const theme = useTheme();

    return <Grid container >
        <Grid item>
            <Typography variant={"h5"} color={theme.palette.primary.contrastText}>Proof detail</Typography>
        </Grid>
        <Grid item  style={{width: "100%", height: "200px", overflow: "scroll", marginTop: "1rem"}}>
            {bytesToBN(props.proof).map(each => <Typography variant={"h5"} color={theme.palette.primary.main}> {"0x" + each.toString(16)} </Typography>)}
        </Grid>
    </Grid>
}

export default Proof;