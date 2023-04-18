import Grid from "@mui/material/Grid";
import CodeMirror from "@uiw/react-codemirror";
import { codemirrorTheme } from "../../../../../theme/codemirrorTheme";
import {javascript} from "@codemirror/lang-javascript";
import {useParams} from "react-router-dom";

const InputSection = () => {
    let {protocolType} = useParams();
    return <Grid item style={{marginTop: "1rem", overflow: "scroll", width: "100%"}}>
        <CodeMirror
            value={`{          
    blocknum,
    blockhash,
    graphdata{
        price,
        ${protocolType==="ZKINDEXING" ? "contract" : "isTriggered"},
        decimals,
    },
    zkproof,
}`}
            height="100%"
            readOnly
            theme={codemirrorTheme}
            extensions={[javascript({ jsx: true })]}
            basicSetup={{lineNumbers: false, highlightActiveLineGutter: false, foldGutter: false}}
        />
    </Grid>
}

export default InputSection;