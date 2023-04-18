import Grid from '@mui/material/Grid';
import Title from "../Title";
import TriangleRole from "../TriangleRole";

const DetailCard = () => {
    return <Grid container direction="row" spacing={4}>
        <Grid item xs={4}>
            <Title variant={"h1"} title={"A truly decentralized, autonomous network."}></Title>
        </Grid>
        <Grid item xs={8}>
            <TriangleRole/>
        </Grid>

    </Grid>

}

export default DetailCard;
