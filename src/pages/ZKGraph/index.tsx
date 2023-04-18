import TitleCard from "../../components/TitleCard";
import ZKGraphCard from "../../components/ZKGraphCard";
import GraphPublishCard from "../../components/GraphPublishCard";
import Grid from "@mui/material/Grid";
import useProtocols from "../../hooks/aboutProtocols/useProtocols";
import {useEffect} from "react";
import usePlayground from "../../hooks/aboutPlayground/usePlayground";
import News from "../../components/News";

const ZKGraph = () =>{

    const {getProtocolIds, protocolBasicByIdGetter} = useProtocols();
    const {playgroundCleaner} = usePlayground();

    useEffect(()=>{
        playgroundCleaner();
    }, []);

    return <>
        <TitleCard page={"zkGraph"} width={"80%"}/>

        <Grid container>
            {
                getProtocolIds.map((protocolId:any, i:number) => <ZKGraphCard key={i} protocolBasicByIdGetter={protocolBasicByIdGetter} protocolId={protocolId} />)
            }
        </Grid>


        <GraphPublishCard/>

        <News />
    </>
}

export default ZKGraph;
