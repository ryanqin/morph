import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material";

type RoadmapEleProps = {
    title: string,
    description: string,
}

const RoadmapEle = (props:RoadmapEleProps) =>{
    return <Grid item style={{height: "61px", width: "280px"}}>
            <Typography variant={"h5"} color={"#0F9AFF"}>{props.title}</Typography>
            <Typography variant={"h6"} color={"#527C93"} style={{marginTop: 4}}>{props.description}</Typography>
        </Grid>
}


const Roadmap = () =>{
    const theme = useTheme();
    return <Grid container direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Grid item>
            <Typography variant={"h2"} color={theme.palette.primary.main}>Roadmap</Typography>
        </Grid>
        <Grid container item direction={"row"}  style={{marginTop: "58px"}} alignItems={"center"} justifyContent={"space-between"}>
            <RoadmapEle title={"Milestone 1"} description={"Meta Apps Demo"}/>
            <RoadmapEle title={"Milestone 3"} description={"zkOracle Network PoC"}/>
            <RoadmapEle title={"Milestone 5"} description={"Decentralized zkOracle Network"}/>
        </Grid>
        <Grid item style={{width: "100%", marginBottom: "40px", marginTop: "40px"}}>
           <Divider/>
        </Grid>
        <Grid container item direction={"row"} alignItems={"center"} justifyContent={"space-around"}>
            <RoadmapEle title={"Milestone 2"} description={"Meta Apps MVP"}/>
            <RoadmapEle title={"Milestone 4"} description={"zkOracle Network Testnet"}/>
        </Grid>
    </Grid>

}

export default Roadmap;
