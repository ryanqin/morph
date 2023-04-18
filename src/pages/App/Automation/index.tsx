import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import CodeMirror from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript";
import { codemirrorTheme } from "../../../theme/codemirrorTheme";
import useAutomationSubscriber from "../../../hooks/aboutAutomation/useAutomationSubscriber";
import useSettings from "../../../hooks/aboutSettings/useSettings";
import {useEffect, useState} from "react";
import { Tooltip } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {THEMES} from "../../../theme/constants";
const ethers = require('ethers')

let provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/66bdab690554486092111f634a9e891c");
const address = '0xac1efb2c2e2243a1305a48730f3296f1533b00b9';

const Automation = () =>{
    const theme = useTheme();
    const {automationSubscriptionDataGetter} = useAutomationSubscriber();
    const {settings} = useSettings();
    const [balance, setBalance] = useState(0);

    const checkBalance = () =>{
        provider.getBalance(address).then((balance:any) => {
            const balanceInEth = ethers.utils.formatEther(balance)
            setBalance(balanceInEth)
        })
    }

    useEffect(()=>{
        checkBalance()
    }, [automationSubscriptionDataGetter.length])

    return <Grid container style={{height: "auto"}}>
        <Grid item >
            <Typography variant={"h5"} style={{padding:"1.5rem 0px"}} color={theme.palette.primary.contrastText}>Trigger Action History</Typography>
        </Grid>

        <Grid item container alignItems={"center"}>
            <Grid item container  xs={2} alignItems={"center"} alignContent={"flex-start"}>
                <Grid item>
                    <Typography variant={"body2"} color={theme.palette.primary.contrastText}>Action Type</Typography>
                </Grid>
                <Grid item style={{paddingLeft: "0.5rem"}} >
                    <Tooltip  placement={"top-start"} componentsProps={{
                        tooltip: {
                            sx: {
                                bgcolor:  theme.palette.secondary.main,
                                padding: "1rem"
                            },
                        },}}
                             title={<Typography variant="subtitle1" color={settings.theme === THEMES.LIGHT?theme.palette.primary.contrastText:theme.palette.primary.main}>Action Type indicates whether the trigger conditions have been met or not.
                                 The Trigger Contract will only call the Destination Contract on ‘Triggered’. But both type of actions will be recorded on-chain.</Typography>}>
                        <InfoIcon style={{fontSize: "1rem", color: theme.palette.primary.contrastText}}/>
                    </Tooltip>
                </Grid>
            </Grid>
            <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Source Block Num</Typography></Grid>
            <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Destination Block Num</Typography></Grid>
            <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Action Tx Hash</Typography></Grid>
            <Grid item xs={2}><Typography variant={"body2"} color={theme.palette.primary.contrastText}>Payload</Typography></Grid>
        </Grid>

        <Grid container item style={{height: "280px", overflow: "scroll"}}  alignContent={"flex-start"}>
            {automationSubscriptionDataGetter.map((each:any, i:number)=><Grid container item style={{height: "3rem",paddingTop: "1.5rem", paddingBottom: "1.5rem",  borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>
                <Grid item xs={2}><Typography variant={"h6"} color={each.isTriggered? theme.palette.success.main : theme.palette.primary.main}>{each.isTriggered? "Triggered":"Non-Trigger"}</Typography></Grid>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}>{each.srcBlockNum.toString()}</Typography></Grid>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}>{each.event.blockNumber}</Typography></Grid>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}>{each.blockhash.slice(0, 8)+"..."+each.event.blockHash.slice( -4)}</Typography></Grid>
                <Grid item xs={2}><Typography variant={"h6"} color={theme.palette.primary.main}> {each.payload.slice(0, 8)+"..."+each.payload.slice( -4)+" "}</Typography></Grid>
            </Grid>)}
        </Grid>

        <Grid container item style={{paddingTop: "1.5rem"}}>
            <Grid item container xs={6}  direction={"column"}>
                <Grid item xs={1}>
                    <Typography style={{padding:"1.5rem 0px"}} variant="body2" color={theme.palette.primary.contrastText}>Demo Description: Sample logic 'automation.ts' defines that automation
                        needs to be triggered when price is higher than predefined threshold.</Typography>
                </Grid>
                <Grid item container style={{overflow: "scroll", height: "500px",  backgroundColor: "#202224", padding: "0 1.5rem", border: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>
                    <CodeMirror
                        value={`
########################################
# FileName: automation.ts              #
# Author: Hyper Oracle                 #
########################################

import { BigInt } from "as-bigint";
import { Event, GraphState, Bytes32, Bytes } from "../type";

var esig_sync = '0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1';
var esig_swap = '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822';

var trigger_price_threshold = BigInt.fromInt16(200);
export function handleEvent(event: Event, pre_state: GraphState = 0): GraphState{
    var next_state: GraphState;
    if (event.topics[0] == Bytes32.fromHex(esig_sync)){
        var reserve0 = Bytes.fromUint8Array(event.data.data.slice(0,32)).toBigInt()
        var reserve1 = Bytes.fromUint8Array(event.data.data.slice(32)).toBigInt()

        var price = reserve0.mul(1000).div(reserve1);
        var is_trigger;
        var payload;
        if (price > trigger_price_threshold.mul(1000)){
            is_trigger = 1;
            payload = price.toInt32();
        } else {
            is_trigger = 0;
            payload = 0;
        }
        next_state = changetype<GraphState>(is_trigger<<255 & payload);

    } else { // not possible
        next_state = pre_state
    }
    return next_state;
}
`}
                        readOnly
                        height="100%"
                        theme={codemirrorTheme}
                        extensions={[javascript({ jsx: true })]}
                        basicSetup={{lineNumbers: false, highlightActiveLineGutter: false, foldGutter: false}}
                    />
                </Grid>
            </Grid>
            <Grid item container xs={6} style={{padding: "0 2.5rem"}} direction={"column"} >
                <Grid item container alignItems={"center"} xs={1} alignContent={"flex-start"}>
                    <Grid item>
                        <Tooltip placement={"top-start"} componentsProps={{
                                     tooltip: {
                                         sx: {
                                             bgcolor:  theme.palette.secondary.main,
                                             padding: "1rem"
                                         },
                                     },}}
                                 title={ <div><Typography variant="subtitle1" color={settings.theme === THEMES.LIGHT?theme.palette.primary.contrastText:theme.palette.primary.main}>(Sepolia Testnet) 0xac1efb2c2e2243a1305a48730f3296f1533b00b9</Typography>
                                     <Typography variant="subtitle1" color={theme.palette.error.main}>CAUTION: NEVER send money to this address through Ethereum Mainnet</Typography>
                            </div>
                            }>
                            <InfoIcon  style={{color: theme.palette.primary.contrastText, fontSize: "1rem"}}/>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Typography style={{padding:"1.5rem 0px", marginLeft: "0.5rem"}} variant="body2" color={theme.palette.primary.contrastText}>Transaction Sender Balance</Typography>
                    </Grid>
                </Grid>
                <Grid>
                    <Typography style={{ marginLeft: "2rem"}} variant="body2" color={theme.palette.primary.contrastText}>{balance} ETH</Typography>
                </Grid>
                <Grid item >
                    <Typography style={{padding:"1.5rem 0px", marginLeft: "2rem"}} variant="body2" color={theme.palette.error.main}>{balance < 0.001 ? "Fund not sufficient! Deposit to Transaction Sender to Reactivate Automation" : ""}</Typography>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
}


export default Automation;
