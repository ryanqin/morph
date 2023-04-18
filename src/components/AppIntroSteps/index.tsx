import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography/Typography";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import codemirrorTheme from "../../theme/codemirrorTheme";
import {useEffect, useState} from "react";

type AppIntroStepsInstallmentProps = {
    [key: string]: {
        title: string,
        steps: {
            id: number,
            name: string,
            code: string,
        }[]
    }
}

const appIntroStepsInstallmentProps:AppIntroStepsInstallmentProps = {
    "zkIndexing": {
        title: "Implement with 3 simple steps",
        steps: [{
            id: 0,
            name: "Write zkGraph",
            code: `// 1. zkindexing.yaml
dataSources:
  ...
  mapping:
    appType: zkIDX
    eventHandlers:
      - event: Event(uint256,..)
      handler: handleNewEvent

// 2. schema.graphql
  type Example @entity {
    id: ID!
    owner: Bytes
  }

// 3. mapping.ts
  function handleNewEvent(Event){
    return (
      resultingData
    )
  }`,
        }, {
            id: 1,
            name: "Deploy zkGraph",
            code: `// Enter zkGraph Folder
cd zkGraph-Example

// Build zkGraph Project
zkgraph build

// Deploy zkGraph to Network
zkgraph deploy`,
        }, {
            id: 2,
            name: "Query with GraphQL",
            code: `// Request     // Response
{              {
  blocknum,      "blocknum":16220644,
  graphdata {    "graphdata":{
    price,         "price":226.729,
    contract,      "contract":"UniswapV2(UNI-WETH)",
  },             },
  zkproof        "zkproof":"0xb3...6898"
}              }`,
        }]
    },
    "zkAutomation": {
        title: "How to operate zkAutomation?",
        steps: [{
            id: 0,
            name: "Select Automation Target Function",
            code: `TARGET CONTRACT
    0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48

TARGET FUNCTION
    liquidate ()
    arbitrage ()
    updateOracle ()
    harvestEarning ()`,
        }, {
            id: 1,
            name: "Trigger Based on zkGraph Source or Time",
            code: `TRIGGER ON zkGraph
    mapping:
        appType: zkAUTO
        eventHandlers: ...

TRIGGER ON TIME
    Start from Block 166024
    Trigger every 2 hours`,
        }, {
            id: 2,
            name: "Create and Deposit for Bounty",
            code: `CONFIG BOUNTY
    Bounty_Creator_Address=0x...
    Bounty_Type=zkAutomation
    Bounty_Life_Cycle=100 blocks

DEPOSIT INTO BOUNTY
    Bounty_Fee_Pool=8800 $ETH
    Bounty_Fee_Per_Execution=0.8 $ETH

CREATE BOUNTY
    Bounty_Nodes ++
    Bounty_Execution ++
    Bounty_Fee_Pool --`,
        }]
    },
}


type AppIntroStepsProps = {
    app: "zkIndexing" | "zkAutomation"
}

const AppIntroSteps = (props: AppIntroStepsProps) =>{
    const theme = useTheme();

    const [stepIndex, setStepIndex] = useState(0)

    useEffect(()=>{
        setStepIndex(0)
    }, [])


    return <Box>
        <Box>
            <Typography variant={"h3"} color={theme.palette.primary.main} style={{marginBottom: "1rem", marginTop: "8.5rem"}}> {"< >"} </Typography>
            <Typography color={theme.palette.primary.main} style={{marginTop: "1rem", marginBottom: "3.875rem"}}  variant={"h1"}>{appIntroStepsInstallmentProps[props.app].title}</Typography>
        </Box>
        <Grid container style={{width: "100%", height: "348px", border: `solid 1px ${theme.palette.primary.main}`}}>
            <Grid item container xs={5}>
                <Grid item container direction="column"  style={{padding: "2rem"}}>
                    <Grid item>
                        <Typography variant={"h4"} color={theme.palette.secondary.contrastText}>Step 0{stepIndex+1}</Typography>
                    </Grid>
                    <Grid item style={{marginTop: "1rem"}}>
                        <Typography color={theme.palette.primary.main} variant={"h3"}>{appIntroStepsInstallmentProps[props.app].steps[stepIndex].name}</Typography>
                    </Grid>
                </Grid>
                <Grid item container  style={{padding: "2rem"}}  justifyContent={"flex-start"} alignItems={"flex-end"}>
                    <Grid item>
                        <Button  style={{backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.text.secondary,
                            padding: "16px 16px"}} disabled={stepIndex===0} onClick={()=>setStepIndex(stepIndex-1)}>{"<-"}</Button>
                    </Grid>
                    <Grid item style={{marginLeft: "8px"}}>
                        <Button  style={{backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.text.secondary,
                            padding: "16px 16px"}} disabled={stepIndex===2} onClick={()=>setStepIndex(stepIndex+1)}>{"->"}</Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container xs={7} direction="column" style={{backgroundColor: "#202224", padding: "1rem", height: "100%"}}>
                <Grid item xs={10} style={{overflow: "scroll"}}>
                    <CodeMirror
                        value={appIntroStepsInstallmentProps[props.app].steps[stepIndex].code}
                        readOnly
                        theme={codemirrorTheme}
                        style={{fontSize: "large"}}
                        extensions={[javascript({ jsx: true })]}
                        basicSetup={{lineNumbers: false, highlightActiveLineGutter: false, foldGutter: false}}
                    />
                </Grid>
                <Grid item xs={2} container justifyContent={"flex-end"} alignItems={"flex-end"}>
                    <Grid item>
                        <Button  style={{backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.text.secondary}}><Typography variant={"h6"}>View more examples on GitHub </Typography> </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    </Box>


}


export default AppIntroSteps;
