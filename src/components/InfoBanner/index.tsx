import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useLocation} from "react-router-dom";
import { useEffect, useState} from "react";


type InfoData = {
    [page in Page]: {
        text: string | null;
    };
};

type Page = "ZKINDEXING" | "ZKAUTOMATION" | "POC" | "ZKGRAPH" | "";

const infoData:InfoData = {
    ZKGRAPH: {
        text: "Warning: This is for demo purpose only. Do not use in production. zkWASM for generating zk proofs is currently under development."
    },
    ZKINDEXING: {
        text: "Warning: This is for demo purpose only. Do not use in production. zkWASM for generating zk proofs is currently under development."
    },
    ZKAUTOMATION: {
        text: "Warning: This is for demo purpose only. Do not use in production. zkWASM for generating zk proofs is currently under development."
    },
    POC: {
        text: null
    },
    "": {
        text: null
    }
}

const InfoBanner = () =>{
    let location = useLocation();
    const theme = useTheme();

    const [page, setPage] = useState<Page>("");

    useEffect(()=>{
        setPage(location.state)
    }, [location.state])

    useEffect(()=>{
        if(location.pathname === "/app/poc")setPage("POC");
    }, [page])

    return  <Box sx={{width: "100%", height: "62px", backgroundColor: Object.keys(infoData).includes(page) && infoData[page].text? theme.palette.secondary.main : "transparent", display: "flex", alignItems: "center", justifyContent: "center"}}>
        {Object.keys(infoData).includes(page) && infoData[page].text && <Typography color={theme.palette.primary.main} variant={"body2"}>
            {"< "}
            <span style={{color:theme.palette.primary.main}}>
             {
                 Object.entries(infoData).map((each) => each[0] === page ? each[1].text : "")
             }
            </span>
            { " >"}
        </Typography>}
    </Box>
}

export default InfoBanner;
