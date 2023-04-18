import Grid from "@mui/material/Grid";
import {PlayGroundProps} from "../../../../../redux/modules/entities/playground";
import CodeMirror from "@uiw/react-codemirror";
import codemirrorTheme from "../../../../../theme/codemirrorTheme";

import {json, jsonParseLinter} from "@codemirror/lang-json";
import {lintGutter, linter} from "@codemirror/lint";
import React, { useCallback} from "react";
import {schemaValues, validateInput} from "../../../../../utils/schemaValidate";
import {useParams} from "react-router-dom";

type OutputSectionProps = {
    playgroundDataGetter:PlayGroundProps,
    updateData: any,
    setVerifyWarning:  React.Dispatch<React.SetStateAction<null>>,
    verifyWarning: null | string
}


const OutputSection = (props: OutputSectionProps) =>{
    let {protocolType} = useParams();

    const onChange = useCallback((value:string) => {
        props.setVerifyWarning(null)
        props.setVerifyWarning(validateInput(value, protocolType));
        if(!props.verifyWarning){
            props.updateData({...schemaValues(value, protocolType)}, protocolType)
        }
    }, [props.playgroundDataGetter]);

    return <Grid item style={{paddingLeft: "1rem", overflow: "scroll", width: "100%"}}>
        <CodeMirror
            value={Object.keys(props.playgroundDataGetter).length > 0? `{
  "data":{             
    "blocknum":${props.playgroundDataGetter.blockNumber},
    "blockhash":"${props.playgroundDataGetter.blockHash}",
    "graphdata":{
        "price":${props.playgroundDataGetter.price},
        ${protocolType==="ZKINDEXING"? "\"contract\"" : "\"isTriggered\""}:${protocolType==="ZKINDEXING" ? `"${props.playgroundDataGetter.contract}"` : props.playgroundDataGetter.isTriggered},
        "decimals":${props.playgroundDataGetter.decimals}
    },
    "zkproof":"${props.playgroundDataGetter.zkProof}",
    "zkgstate":"${props.playgroundDataGetter.zkgState}"
  }            
}
`:""}
            height="100%" width={"100%"}
            theme={codemirrorTheme}
            extensions={[json(), linter(jsonParseLinter()), lintGutter()]}
            onChange={onChange}
            basicSetup={{lineNumbers: false, highlightActiveLineGutter: false, foldGutter: false}}
        />
    </Grid>
}

export default OutputSection;

