import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import useSettings from "../../../../../hooks/aboutSettings/useSettings";
import CodeMirror from "@uiw/react-codemirror";
import useEthStatus from "../../../../../hooks/aboutEthStatus/useEthStatus";
import {codemirrorTheme1} from "../../../../../theme/codemirrorTheme";
import {javascript} from "@codemirror/lang-javascript";
import {useParams} from "react-router-dom";

const InstantDataTracker = () =>{
    const theme = useTheme();
    const {settings} = useSettings();
    const {ethStatusData} = useEthStatus();
    const {protocolType} = useParams();

    return <Grid container item xs={9} style={{backgroundColor: "#2F4253", width: "100%"}} direction={"column"}>
        <Grid container item xs={2} style={{ padding: "0 1rem", borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}} alignContent={"center"}>
            <Grid item>
                <Typography sx={{backgroundColor: theme.palette.error.main, borderRadius: "50%", height: "1rem", width: "1rem", textAlign: "center"}} color={theme.palette.primary.main}/>
            </Grid>
            <Grid item style={{paddingLeft: "1rem"}}>
                <Typography sx={{backgroundColor: theme.palette.warning.main, borderRadius: "50%", height: "1rem", width: "1rem", textAlign: "center"}} color={theme.palette.primary.main}/>
            </Grid>
            <Grid item style={{paddingLeft: "1rem"}}>
                <Typography sx={{backgroundColor: theme.palette.success.main, borderRadius: "50%", height: "1rem", width: "1rem", textAlign: "center"}} color={theme.palette.primary.main}/>
            </Grid>
        </Grid>
        <Grid container item xs={10}>
            <Grid item style={{overflow: "hidden"}}>
                <CodeMirror
                    value={` [+] Block Number: ${ethStatusData.blockNumber}
 [+] Block Hash: ${ethStatusData.blockHash}
 [+] zkProof [not a completed proof]: ${ethStatusData.zkProof}
 [+] ETH Price in USDC: ${ethStatusData.price}
 [+] Decimals: ${ethStatusData.decimals}
 [+] ${protocolType === "ZKINDEXING" ? "Contract" : "isTriggered"}: ${protocolType === "ZKINDEXING" ? ethStatusData.contract : ethStatusData.isTriggered}`}

                    readOnly
                    theme={codemirrorTheme1}
                    extensions={[javascript({ jsx: true })]}
                    basicSetup={{lineNumbers: false, highlightActiveLineGutter: false, foldGutter: false}}/>
            </Grid>
        </Grid>
    </Grid>
}

export default InstantDataTracker