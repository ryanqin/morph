import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import ButtonFirst from "../Buttons/ButtonFirst";
import ButtonSecond from "../Buttons/ButtonSecond";

type Props = {
    title: string,
    tag: {
        type: "logo" | "step",
        logo?: string | JSX.Element,
        step?: string
    },
    to: {
      link: string, linkText: string,
      isInternal: boolean
    },
    buttonType: string,
}
const LinkCard = (props: Props) =>{
    const theme = useTheme();
    return (
        <Grid container direction="column" height={props.tag.type === "logo"? "180px":"210px"} spacing={3} margin={3} marginLeft={0} style={{backgroundColor: theme.palette.secondary.main, textAlign: "start"}}>
            <Grid item width="32px" height="32px" style={{marginBottom: "0.5rem"}}>
                {
                    props.tag.type === "logo"?
                        typeof props.tag.logo === "string" ?
                        <img src={props.tag.logo} alt={"logo"} style={{width:"32px",height:"32px"}}/> :
                            props.tag.logo :
                        <Typography variant={"h6"} style={{color: theme.palette.primary.contrastText}}>{props.tag.step}</Typography>
                }

            </Grid>

            <Grid item width="260px">
                <Typography variant={"h5"} color={theme.palette.primary.main}>{props.title}</Typography>
            </Grid>

            <Grid item>
                {
                    props.buttonType === "first"?
                        <ButtonFirst text={props.to.linkText} to={{link:props.to.link, isInternal: props.to.isInternal}}/> :
                        <ButtonSecond text={props.to.linkText} arrow to={{link:props.to.link, isInternal: props.to.isInternal}}/>
                }
            </Grid>
        </Grid>
    )
}

export default LinkCard;
