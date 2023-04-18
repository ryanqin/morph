import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Link, useTheme} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import { useState } from "react";

const ZKGraphCard = (props:any) =>{

    const [protocolBasic, setProtocolBasic] = useState(props.protocolBasicByIdGetter(props.protocolId))

     const theme = useTheme();
    return (
    <Link underline={"none"} component={RouterLink}
        to={{ pathname: `/app/zkGraph/${protocolBasic.protocolType}/${protocolBasic.id}/${protocolBasic.address}`}} sx={{display: "contents"}} state={protocolBasic.protocolType}>
        <Grid container item xs={3.9}  sx={{":hover":{backgroundColor: "rgba(15, 154, 255, 0.12) !important"}}}  style={{backgroundColor: theme.palette.secondary.main, height: "200px", marginTop: props.key < 3? "5.25rem" : "0.4rem", padding: "1.5rem", marginRight: props.key % 3 !== 0 ? "0.4rem":"0"}}>
            <Grid container direction={"column"} item xs={9} justifyContent="space-between">
                <Grid container direction={"column"} item xs={6} >
                    {/*
                        Webkit only hack to clamp 2 lines into ellipsis
                        Height of the container is 2 * line-height (2*1rem*1.334)
                    */}
                    <Grid item style={{height: "2.668rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}}>
                        <Typography variant={"h5"} color={theme.palette.primary.main}>{protocolBasic.name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"} color={theme.palette.primary.main}><span style={{color: theme.palette.secondary.contrastText}}>By</span> {protocolBasic.address.slice(0, 5)+".."+protocolBasic.address.slice(-5)}</Typography>
                    </Grid>
                </Grid>

                <Grid container item  alignItems={"center"}  xs={3} >
                    <Typography variant={"h5"}  color={theme.palette.primary.main}>{protocolBasic.basic.version}</Typography>
                </Grid>

                <Grid container item alignItems={"flex-end"} xs={2}>
                    <Grid item>
                        <Typography variant={"subtitle1"}  color={theme.palette.primary.main} style={{width: "auto", height: "21px", padding: "4px 8px", border: `0.5px solid ${theme.palette.primary.main}`, lineHeight: "1", textAlign: "center"}}>{protocolBasic.protocolType}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={3} justifyContent={"center"}>
                <Grid item>
                    <img src={protocolBasic.basic.logo} alt={"logo"} style={{width: "65px", height: "65px"}}/>
                </Grid>
            </Grid>
        </Grid>
    </Link>
    )
}


export default ZKGraphCard;
