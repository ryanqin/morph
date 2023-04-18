import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Grid from "@mui/material/Grid/Grid";
import Typography from "@mui/material/Typography/Typography";
import linkArrow from "../../assets/linkarrow.svg";
import useTheme from "@mui/material/styles/useTheme";
import Link from '@mui/material/Link';
import DiscordIcon from "../../assets/icons/socials/DiscordIcon";
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


type Props = {
    title: string,
    linkText: string,
    tag: {
        type: "logo" | "step",
        logo?: string | JSX.Element,
        step?: string
    },
    arrow?: boolean
    fontColor?: string
    backgroundColor?: string
    disableFocusRipple?: boolean
    hasPadding?: boolean
}

const CommunityModal = (props:Props) =>{

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container direction="column" height={props.tag.type === "logo"? "180px":"210px"} spacing={3} margin={3} marginLeft={0} style={{backgroundColor:theme.palette.secondary.main, textAlign: "start"}}>
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
                    <Button disableFocusRipple={props.disableFocusRipple}
                            style={{backgroundColor: "transparent",
                                color:  theme.palette.text.secondary,
                                padding: !props.hasPadding? "0":"16px 16px"}} onClick={handleClickOpen}
                            >{props.linkText}
                         <img src={linkArrow} alt={"arrow"} style={{ margin: "6px 0 6px 6px",
                                width: "8px",
                                height: "8px"}}/>
                    </Button>
                </Grid>
            </Grid>
            <Dialog maxWidth={'lg'} fullWidth sx={{
                backdropFilter: "blur(5px)",
            }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{padding: "72px"}}>
                    <Grid container style={{backgroundColor: ""}}>
                        <Grid container item direction="column">
                            <Grid item>
                                <Typography variant={"h4"} style={{marginBottom: "1rem"}} color={theme.palette.primary.main}> {"< >"} </Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{marginTop: "1rem"}}  variant={"h2"} color={theme.palette.primary.main}>Deep dive with us</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{marginTop: "2.5rem"}}  variant={"h4"} color={theme.palette.primary.main}>Interested in Web3, ZK, and Cryptography?</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{marginTop: "2.5rem"}}  variant={"body2"} color={theme.palette.primary.contrastText}>We have a
                                    growing number of hackers, builders, and cryptographers in our community.
                                    If you are interested in what we are working on, join our conversation!</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{marginTop: "2.5rem"}}  variant={"h4"} color={theme.palette.primary.main}>Join us!</Typography>
                            </Grid>
                            <Grid item>
                                <Typography style={{marginTop: "2.5rem", marginBottom: "2.5rem"}}  variant={"body2"} color={theme.palette.primary.contrastText}>We are currently looking
                                    for talented protocol engineers, cryptographers, and ZK circuit engineers who have a
                                    passion for Web3 and ZK. Wave us GM on Discord and apply!
                                </Typography>
                            </Grid>
                            <Grid item>
                                    <Button component={Link} disableFocusRipple={props.disableFocusRipple} href={"https://discord.gg/MgyYbW9dQj"}
                                            style={{backgroundColor: theme.palette.secondary.main,
                                                color: theme.palette.text.secondary,
                                                padding: "16px 16px"}}
                                            target={"_blank"} rel={"noopener noreferrer"}
                                    >
                                        <DiscordIcon fill={theme.palette.text.secondary} width={"32px"} height={"32px"}/>
                                        <Typography variant={"h5"} style={{marginLeft: "10px"}}>Join Our Discord</Typography>
                                    </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Typography variant={"h5"}  color={theme.palette.text.secondary}>Close</Typography>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CommunityModal;
