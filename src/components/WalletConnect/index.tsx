import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import {TransitionProps} from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import useTheme from "@mui/material/styles/useTheme";
import {Connector, useConnect, useDisconnect} from "wagmi";
import useWallet from "../../hooks/aboutWallet/useWallet";
import {useEffect} from "react";
import { useLocation } from "react-router-dom";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const WalletConnect = () => {
    const theme = useTheme();
    const location = useLocation();

    const {walletSetter, walletGetter, walletDisconnetor, walletStatusGetter} = useWallet();

    const [open, setOpen] = React.useState(false);

    const {disconnect} = useDisconnect();
    const {connectAsync, connectors} = useConnect();


    const handleWalletConnect = async (connector: Connector) => {
        const {account,chain} = await connectAsync({connector});
        console.log(`[WalletConnect]: account ${account}, chain: ${chain}`);
        walletSetter({address: account, chain})
        handleClose();
    }

    const handleWalletDisConnect = () =>{
        disconnect();
        walletDisconnetor();
        handleClose()
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        if(location.pathname === "/app/poc" && !walletStatusGetter.isWalletConnected) setOpen(true)
    }, [location.pathname])

    return<>
        <Box style={{border: `2px solid ${theme.palette.primary.contrastText}`, padding: "0.5rem 2.5rem", cursor: "pointer", borderRadius: "4px"}}
             sx={{":hover": {transition: "all 0.3s ease",
                     boxShadow: "0 0 16px 0 rgb(82 124 147 / 88%)"
             }}}
             onClick={handleClickOpen}>

            <Typography variant={"h5"} color={theme.palette.primary.main}> {walletGetter.address? `${walletGetter.address.slice(0, 5)}...${walletGetter.address.slice(-4)}` : "Connect"}</Typography>
        </Box>
        <Dialog maxWidth={'md'} fullWidth sx={{
            backdropFilter: "blur(5px)",
        }}
                open={open} onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
        >
            <DialogContent sx={{padding: "96px"}}>
                <Grid container style={{backgroundColor: ""}}>
                    <Grid container item direction="column">
                        <Grid item>
                            <Typography variant={"h4"} style={{marginBottom: "1rem"}} color={theme.palette.primary.main}> {"< >"} </Typography>
                        </Grid>
                        <Grid item>
                            <Typography style={{marginTop: "1rem"}}  variant={"h2"} color={theme.palette.primary.main}>Connect</Typography>
                        </Grid>
                        <Grid item>
                            <Typography style={{marginTop: "1rem"}}  variant={"body2"} color={theme.palette.primary.contrastText}>
                                By connecting a wallet, you agree to Morph AI's Terms of Service and acknowledge that you have read and understood the disclaimers therein.</Typography>
                        </Grid>

                        {
                            !walletGetter.address && connectors.map((connector, i)=> {
                                const {id, name} = connector;
                                return <Grid item style={{marginTop: i === 0 ? "2rem" : "1rem"}}>
                                    <Button onClick={()=>handleWalletConnect(connector)} key={id}  sx={{
                                        width: "100%", height: "3.75rem"}}>
                                        <Typography variant={"h5"} style={{marginLeft: "10px"}}>{name}</Typography>
                                    </Button>
                                </Grid>
                            })
                        }
                        {
                            walletGetter.address && <Grid item style={{ marginTop: "2rem"}}>
                                <Button onClick={handleWalletDisConnect}  sx={{
                                    width: "100%", height: "3.75rem"}}>
                                    <Typography variant={"h5"} style={{marginLeft: "10px"}}>Disconnect</Typography>
                                </Button>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    <Typography variant={"h5"}  color={theme.palette.text.secondary}>Close</Typography>
                </Button>
            </DialogActions>
        </Dialog>
    </>
}


export default WalletConnect;
