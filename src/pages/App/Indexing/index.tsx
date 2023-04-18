import { useParams } from "react-router-dom";
import BasicSection from "./BasicSection";
import TabSection from "./TabSection";
import useProtocols from "../../../hooks/aboutProtocols/useProtocols";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useTheme} from "@mui/material";
import {TABS} from "../../../contexts/IndexingTabsContext";
import useIndexingTabs from "../../../hooks/aboutIndexingTabs/useIndexingTabs";
import useEthStatus from "../../../hooks/aboutEthStatus/useEthStatus";
import {FETCH_DATA} from "../../../redux/middlewares/api";

const Indexing = () =>{

    const { protocolId, addressId, protocolType } = useParams();
    const {protocolBasicByIdGetter} = useProtocols();
    const {setCurrentTab} = useIndexingTabs();
    const theme = useTheme();
    const [protocol, setProtocol] = useState(null);
    useEthStatus(FETCH_DATA, protocolId, protocolType);

    useEffect(()=>{
        setProtocol(protocolBasicByIdGetter(protocolId));
        // @ts-ignore
        setCurrentTab(TABS.OVERVIEW);
    }, [addressId, protocolId])

    return <>
        {protocol && <BasicSection protocol={protocol}/>}
        {protocol && <TabSection protocol={protocol}/>}
    </>
}


export default Indexing;
