import { useTheme } from "@mui/material";
import Box from "@mui/material/Box/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ButtonFirst from "../Buttons/ButtonFirst";

type Props = {
    title: string,
    features: string[];
    image: string;
    to: {
        linkText: string,
        isInternal: boolean,
        link: string
    };
}
const FeatureCard = (props:Props) =>{
    const theme = useTheme();

    return <Box sx={{height: "437px", width: "500px"}}>
        <Box>
            <img src={props.image} alt="feature bg" style={{height: "200px", width: "500px"}}/>
        </Box>
        <Box sx={{margin: "24px", width: "421px"}}>
            <Typography variant={"h4"} color={theme.palette.primary.main}>{props.title}</Typography>
        </Box>
        <Box sx={{margin: "24px", width: "421px"}}>
            {props.features.map(feature =>
                <Typography key={feature} variant={"body2"} style={{color: theme.palette.primary.contrastText}}>{"<>"} {feature}</Typography>
            )}
        </Box>
        <Box sx={{margin: "24px"}}>
            <ButtonFirst text={props.to.linkText} to={{link: props.to.link, isInternal: props.to.isInternal}}/>
        </Box>
    </Box>

}

export default FeatureCard;
