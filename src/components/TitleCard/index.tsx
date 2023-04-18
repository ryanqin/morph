import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography/Typography";
import * as React from "react";
import ButtonSecond from "../Buttons/ButtonSecond";
import ButtonFirst from "../Buttons/ButtonFirst";
import { useTheme } from "@mui/material";

type pageTitleProps = {
    [key: string]: {
        title: JSX.Element,
        subtitle: null | string
        buttons?: {
            text: string,
            link: string
            isInternal: boolean, arrow?: boolean
        }[]
    }
};

type TitleCardProps = {
    page: "home" | "zkIndexing" | "zkAutomation" | "zkGraph" | "POC",
    width: string
}

const TitleCard = (props: TitleCardProps) =>{
    const theme = useTheme();


    const pageTitle: pageTitleProps = {
        "home": {
            title: <Typography color={theme.palette.primary.main} style={{marginTop: "1rem", marginBottom: "2rem"}} variant={"h1"}>Programmable <span style={{textDecoration: "underline"}}>zkOracle</span> Network.</Typography>,
            subtitle: null,
            buttons: [{
                text: "Developer Documentation",
                link: "https://docs.hyperoracle.io/", isInternal: false, arrow: true
            },{
                text: "Read our whitepaper",
                link: "https://mirror.xyz/hyperoracleblog.eth/qbefsToFgFxBZBocwlkX-HXbpeUzZiv2UB5CmxcaFTM",
                isInternal: false, arrow: true
            }]
        },
        "zkIndexing": {
            title: <Typography color={theme.palette.primary.main} style={{marginTop: "1rem", marginBottom: "2rem"}}  variant={"h1"}>zkIndexing - Trustless Indexing and Querying.</Typography>,
            subtitle: "Lightening fast. Secure. Proven by Math.",
            buttons: [{
                text: "Learn about zkIndexing",
                link: "https://docs.hyperoracle.io/meta-apps/zkindexing",  isInternal: false
            }, {
                text: "Publish your own",
                link: "/app/zkGraph",  isInternal: true
            }]
        },
        "zkAutomation":{
            title: <Typography color={theme.palette.primary.main} style={{marginTop: "1rem", marginBottom: "2rem"}}  variant={"h1"}>zkAutomation - Trustless Automation and Keeper.</Typography>,
            subtitle: "Customizable Off-Chain Trigger Source. Secured by ZK.",
            buttons: [{
                text: "Learn about zkAutomation",
                link: "https://docs.hyperoracle.io/meta-apps/zkautomation",  isInternal: false
            }, {
                text: "Publish your own",
                link: "/app/zkGraph",  isInternal: true
            }]
        },
        "zkGraph": {
            title: <Typography color={theme.palette.primary.main} style={{marginTop: "1rem"}}  variant={"h1"}>zkGraphs created with Hyper Oracle</Typography>,
            subtitle: null,
        },
        "POC": {
            title: <Typography color={theme.palette.primary.main} style={{marginTop: "1rem"}}  variant={"h1"}>zkGraph Demo</Typography>,
            subtitle: null,
        }
    }



    return <Box sx={{ display: 'flex', height: "auto", width: props.width, marginTop: "130px", flexDirection: "column"}}>
        <Box>
            <Typography color={theme.palette.primary.main} variant={"h3"} style={{marginBottom: "1rem"}}> {"< "}
                <ButtonFirst text={"Become an early partner"} to={{link: "https://forms.gle/FE79m7zh9rWKFmcB7", isInternal: false}}/>
                { " >"}
            </Typography>
            {
                pageTitle[props.page].title
            }
        </Box>
        <Box>
            <Typography color={theme.palette.primary.main} variant={"body1"} style={{marginBottom: "2rem"}}>{pageTitle[props.page].subtitle}</Typography>
        </Box>
        {pageTitle[props.page].buttons ? <Box sx={{ display: 'flex',  flexDirection: 'row', marginTop: pageTitle[props.page].subtitle ? "3rem" : "1.5rem"}}>
            {
                pageTitle[props.page].buttons!.map((button, i) =>  <Box key={i} sx={{ marginLeft: i === 1 ? "24px" : ""}}>
                    <ButtonSecond arrow={button.arrow} text={button.text} to={{link: button.link, isInternal: button.isInternal}}/>
                </Box>)
            }
        </Box>:""}
    </Box>
}

export default TitleCard;
