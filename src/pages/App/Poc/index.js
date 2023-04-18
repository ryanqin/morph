import TextField from "@material-ui/core/TextField";
import { Button, Link, useTheme} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import TitleCard from "../../../components/TitleCard";
import usePoc from "../../../hooks/aboutPOC/usePoc";
import {CircularProgress} from "@material-ui/core";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {useInterval} from "../../../hooks/useInterval";
import POCModal from "../../../components/POCModal";
import ASEditor from "../../../components/ASEditor";
import useASEditor from "../../../hooks/aboutASEditor/useASEditor";
import useWallet from "../../../hooks/aboutWallet/useWallet";


const Poc = () =>{
    const theme = useTheme()

    const [genString, setGenString] = useState("");
    const {customizedWasmUint8arrayConfigger,
        newWasmImageAdder,
        customizedWasmGetter,
        wasmImageStatusFetcher,
        wasmImageDeployer,
        deployedWasmImageGetter,
        wasmImageDeploymentChecker,
        wasmImageProver,
        wasmImageProofChecker,
        pOCConfigInfoGetter,
        sourceContractAddressUpdater,
        sourceEventAbiUpdater,
        txHashUpdater,
        WasmMappingExecutor,
        contractAtPocVerifier
    } = usePoc();
    const {walletStatusGetter} = useWallet();
    const [intervalCallback, setIntervalCallback] = useState(()=>wasmImageStatusFetcher);
    const [openModal, setOpenModal] = useState(false);
    const [modalInfoType, setModalInfoType] = useState("setup")
    const {asEditorGetter} = useASEditor()

    const handleModal = () =>{
        setOpenModal(!openModal)
    }

    const {setRunFlag} = useInterval(async ()=>{
        await intervalCallback();
    }, 2000)

    useEffect(()=>{
        if(customizedWasmGetter.md5 !== "") setRunFlag(true);
        else setRunFlag(false);
    }, [customizedWasmGetter.md5])

    useEffect(()=>{
        if(["Fail", "Done"].includes(customizedWasmGetter.setup.status)){
            setRunFlag(false)
        }
    }, [customizedWasmGetter.setup.status])

    useEffect(()=>{
        if(customizedWasmGetter.deploy.id !== ""){
            setIntervalCallback(()=>wasmImageDeploymentChecker);
            setRunFlag(true)
        }
    }, [customizedWasmGetter.deploy.id])

    useEffect(()=>{
        if(["Fail", "Done"].includes(customizedWasmGetter.deploy.status)){
            setRunFlag(false)
        }
    }, [customizedWasmGetter.deploy.status])

    useEffect(()=>{
        if(["Done"].includes(customizedWasmGetter.deploy.status)){
            deployedWasmImageGetter();
        }
    }, [customizedWasmGetter.deploy.status])

    useEffect(()=>{
        if(customizedWasmGetter.prove.id !== ""){
            setIntervalCallback(()=>wasmImageProofChecker);
            setRunFlag(true)
        }
    }, [customizedWasmGetter.prove.id])

    useEffect(()=>{
        if(["Fail", "Done"].includes(customizedWasmGetter.prove.status)){
            setRunFlag(false)
        }
    }, [customizedWasmGetter.prove.status])

    const configCustomizedWasmUint8Array = () =>{
        if( asEditorGetter.moduleWasm !== null){
            const newValue = Uint8Array.from(asEditorGetter.moduleWasm.split(',').map(each => parseInt(each)))
            console.log(newValue);
            setGenString("module.wasm")
            customizedWasmUint8arrayConfigger(newValue)
        }
    }

    useEffect(() => {
        configCustomizedWasmUint8Array();
    },[asEditorGetter.moduleWasm])

    return <Grid container>
        <Grid item>
           <TitleCard page={"POC"} width={"100%"}/>
        </Grid>

        <Grid container item style={{height: "500px", marginTop: "4rem"}} direction={"row"}>
            <Grid item container xs={8} style={{backgroundColor:"black"}}>
                <ASEditor/>
            </Grid>
            <Grid container item xs={4} direction={"column"} style={{ padding: "2rem"}} alignContent={"flex-start"}>
                    <Grid container item xs={4}  direction={"column"}>
                        <Grid item style={{marginBottom: "1rem"}}>
                            <Typography color={theme.palette.primary.contrastText} variant="h6">Source Contract Address</Typography>
                        </Grid>

                        <Grid item>
                            <Typography color={theme.palette.primary.contrastText} variant="h6">
                                <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue={pOCConfigInfoGetter.sourceContractAddress}
                                variant="filled"
                                onChange={(e)=>sourceContractAddressUpdater(e.target.value)}
                                size="small"
                                sx={{
                                    width: "100%",
                                    input: {
                                        color: theme.palette.primary.main,
                                    }
                                }}
                                />
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container item xs={4}  direction={"column"}>
                        <Grid item style={{marginBottom: "1rem"}}>
                            <Typography color={theme.palette.primary.contrastText} variant="h6">Source Event Name</Typography>
                        </Grid>

                        <Grid item>
                            <Typography color={theme.palette.primary.contrastText} variant="h6">
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-small"
                                    defaultValue={pOCConfigInfoGetter.sourceEventABI}
                                    onChange={(e)=>sourceEventAbiUpdater(e.target.value)}
                                    variant="filled"
                                    sx={{
                                        width: "100%",
                                        input: {
                                            color: theme.palette.primary.main,
                                        }
                                    }}
                                    size="small"/>
                            </Typography>
                        </Grid>
                    </Grid>
            </Grid>
        </Grid>

        {/*step 1*/}
        <Grid container item style={{height: "200px", marginTop: "4rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.main}>{"< Step 1 > Setup"} </Typography>
            </Grid>

            <Grid container item direction="row" style={{ padding: "1rem 4rem 0.5rem 4rem"}}>
                <Grid container item xs={8} direction={"column"}>
                    <Grid item xs={6}> <Typography variant={"h6"} color={theme.palette.primary.contrastText}> Generated String</Typography></Grid>

                        {
                            genString !== "" ? <Grid item container direction={"row"}>
                                <CheckCircleIcon fontSize={"small"} color={"success"}/>
                                <Link href={window.URL.createObjectURL(new Blob([customizedWasmGetter.uint8array], {type: "application/wasm"}))} download={"poctest.wasm"}>
                                    <Typography variant={"h6"} style={{marginLeft: "0.5rem"}}  color={theme.palette.primary.contrastText}>{genString}</Typography>
                                </Link>
                            </Grid> : genString
                        }
                </Grid>
            </Grid>

            <Grid container item direction="row" style={{ padding: "0.5rem 4rem"}}>
                <Grid container item xs={8} direction={"column"}>
                    <Grid item container direction={"row"} xs={6} alignItems={"center"}>
                            <Typography variant={"h6"}  color={theme.palette.primary.contrastText}>ZKWASM Image</Typography>
                            {["Fail", "Done"].includes(customizedWasmGetter.setup.status) ? <Button onClick={()=>{handleModal(); setModalInfoType("setup")}} style={{marginLeft: "1rem"}} size={"small"}>View Detail</Button> : ""}
                    </Grid>
                    <Grid item container direction={"row"}>
                        {["Pending", "Processing"].includes(customizedWasmGetter.setup.status) ? <CircularProgress size={"1rem"} color={"info"}/> : ""}
                        {customizedWasmGetter.setup.status === "Fail" ? <ErrorIcon fontSize={"small"} color={"error"}/> : "" }
                        {customizedWasmGetter.setup.status === "Done" ? <CheckCircleIcon fontSize={"small"} color={"success"}/> : ""}
                        <Typography variant={"h6"} style={{marginLeft: "0.5rem"}}  color={theme.palette.primary.contrastText}>{customizedWasmGetter.md5}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4}><Button onClick={newWasmImageAdder}
                                          disabled={!walletStatusGetter.isWalletConnected}
                >SET UP</Button></Grid>
            </Grid>
        </Grid>

        {/*step 2*/}
        <Grid container item style={{height: "300px", marginTop: "4rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.main}>{"< Step 2 > Execution"} </Typography>
            </Grid>

            <Grid container item direction="row" style={{ padding: "1rem 4rem 0.5rem 4rem"}}>
                <Grid container item xs={8} direction={"column"}>
                    <Grid item style={{marginBottom: "1rem"}}> <Typography variant={"h6"}  color={theme.palette.primary.contrastText}>Block /TX Hash</Typography></Grid>
                    <Grid item>
                        <Typography color={theme.palette.primary.contrastText} variant="h6">
                            <TextField
                                hiddenLabel
                                id="filled-hidden-label-small"
                                defaultValue={customizedWasmGetter.execute.txHash}
                                variant="filled"
                                onChange={(e)=>txHashUpdater(e.target.value)}
                                sx={{
                                    width: "100%",
                                    input: {
                                        color: theme.palette.primary.main,
                                    }
                                }}
                                size="small"/>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4}></Grid>
            </Grid>

            <Grid container item direction="row" style={{padding: "0.5rem 4rem"}}>
                <Grid container item xs={8} direction={"column"}>
                    <Grid item xs={6}> <Typography variant={"h6"}  color={theme.palette.primary.contrastText}>Output State</Typography></Grid>
                    <Grid item  container direction={"row"}>
                        {customizedWasmGetter.execute.output!==""?<CheckCircleIcon fontSize={"small"} color={"success"}/>:""}
                        <Typography variant={"h6"} style={{marginLeft: "0.5rem"}}   color={theme.palette.primary.contrastText}>{customizedWasmGetter.execute.output}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4}><Button onClick={WasmMappingExecutor}
                                          disabled={!walletStatusGetter.isWalletConnected}
                >
                    EXECUTE</Button></Grid>
            </Grid>
        </Grid>

        {/*step 3*/}
        <Grid container item style={{height: "200px", marginTop: "4rem"}}>
            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.main}>{"< Step 3 > Proof Generation"} </Typography>
            </Grid>

            <Grid container item direction="row" style={{padding: "0.5rem 4rem"}}>
                <Grid container item xs={8} direction={"column"}>
                    <Grid item  xs={6} container direction={"row"} alignItems={"center"}>
                        <Typography variant={"h6"}  color={theme.palette.primary.contrastText}>Proof details</Typography>
                        {["Fail", "Done"].includes(customizedWasmGetter.prove.status) ? <Button onClick={()=>{handleModal(); setModalInfoType("prove")}} style={{marginLeft: "1rem"}} size={"small"}>View Detail</Button>  : ""}

                    </Grid>
                    <Grid item  container direction={"row"}>
                        {["Pending", "Processing"].includes(customizedWasmGetter.prove.status) ? <CircularProgress size={"1rem"} color={"info"}/> : ""}
                        {customizedWasmGetter.prove.status === "Fail" ? <ErrorIcon fontSize={"small"} color={"error"}/> : "" }
                        {customizedWasmGetter.prove.status === "Done" ? <CheckCircleIcon fontSize={"small"} color={"success"}/> : ""}
                        <Typography variant={"h6"} style={{marginLeft: "0.5rem"}}  color={theme.palette.primary.contrastText}>{customizedWasmGetter.prove.id}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4}><Button onClick={wasmImageProver}
                                          disabled={!walletStatusGetter.isWalletConnected}
                >GENERATE</Button></Grid>
            </Grid>
        </Grid>

        {/*step 4*/}
        <Grid container item style={{height: "200px", marginTop: "4rem"}}>

            <Grid item>
                <Typography variant={"h5"} color={theme.palette.primary.main}>{"< Step 4 >  Verification"} </Typography>
            </Grid>

            <Grid container item direction="row" style={{padding: "0.5rem 4rem"}}>
                <Grid container item xs={8} direction={"column"}>
                    <Grid item  xs={6} container direction={"row"} alignItems={"center"}>
                        <Typography variant={"h6"}  color={theme.palette.primary.contrastText}>ZK Verification Contract</Typography>
                        {["Fail", "Done"].includes(customizedWasmGetter.deploy.status) ? <Button onClick={()=>{handleModal(); setModalInfoType("deploy")}} style={{marginLeft: "1rem"}} size={"small"}>View Detail</Button> : ""}
                    </Grid>
                    <Grid item  container direction={"row"}>

                        {["Pending", "Processing"].includes(customizedWasmGetter.deploy.status) ? <CircularProgress size={"1rem"} color={"info"}/> : ""}
                        {customizedWasmGetter.deploy.status === "Fail" ? <ErrorIcon fontSize={"small"} color={"error"}/> : "" }
                        {customizedWasmGetter.deploy.status === "Done" ? <CheckCircleIcon fontSize={"small"} color={"success"}/> : ""}
                        <Typography variant={"h6"} style={{marginLeft: "0.5rem"}}   color={theme.palette.primary.contrastText}>{customizedWasmGetter.deploy.deployedAddress}</Typography>

                    </Grid>
                </Grid>
                <Grid item xs={4}><Button onClick={wasmImageDeployer}
                                          disabled={!walletStatusGetter.isWalletConnected}
                >DEPLOY</Button></Grid>
            </Grid>

            <Grid container item direction="row" style={{padding: "0.5rem 4rem"}}>
                <Grid container item xs={8} direction={"column"}>
                    <Grid item xs={6}> <Typography variant={"h6"}  color={theme.palette.primary.contrastText}>Verification result</Typography></Grid>
                    <Grid item  container direction={"row"}>
                        {customizedWasmGetter.verify.result === "SENDING" ? <CircularProgress size={"1rem"} color={"info"}/> : ""}
                        {customizedWasmGetter.verify.result === false ? <ErrorIcon fontSize={"small"} color={"error"}/> : "" }
                        {customizedWasmGetter.verify.result === true ? <CheckCircleIcon fontSize={"small"} color={"success"}/>: ""}
                        <Typography variant={"h6"}  style={{marginLeft: "0.5rem"}}  color={theme.palette.primary.contrastText}>{customizedWasmGetter.verify.result===true? "Valid!" : ""}</Typography>
                        <Typography variant={"h6"}  style={{marginLeft: "0.5rem"}}  color={theme.palette.primary.contrastText}>{customizedWasmGetter.verify.result===false? "Failed!" : ""}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={4}><Button onClick={contractAtPocVerifier}
                                          disabled={!walletStatusGetter.isWalletConnected}
                >VERIFY</Button></Grid>
            </Grid>

        </Grid>

        <POCModal title={""} open={openModal} handleClose={handleModal} modalInfoType={modalInfoType}/>

    </Grid>
}


export default Poc;
