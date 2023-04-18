import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from "@mui/material/Typography/Typography";
import useTheme from "@mui/material/styles/useTheme";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Overview from './Overview';
import usePoc from "../../hooks/aboutPOC/usePoc";
import Input from './Input';
import Instances from './Instances';
import Proof from './Proof';
import Aux from './Aux';
import {useEffect } from 'react';


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
    open: boolean,
    handleClose: ()=>boolean,
    modalInfoType: string
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const tabCondition = (modalInfoType:string) => {
    switch (modalInfoType){
        case "setup":
            return [ {label: "Overview", index: 0}];
        case "deploy":
            return [ {label: "Overview", index: 0}];
        case "proof":
            return [{label: "Overview", index: 0},
                {label: "Inputs", index: 1},
                {label: "Instances", index: 2},
                {label: "Proof transcripts", index: 3},
                {label: "Aux Data", index: 4}]
        default:
            return [
                {label: "Overview", index: 0},
                {label: "Inputs", index: 1},
                {label: "Instances", index: 2},
                {label: "Proof transcripts", index: 3},
                {label: "Aux Data", index: 4},
            ]
    }
}

const POCModal = (props:Props) =>{

    const {customizedWasmGetter} = usePoc();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(()=>{
        setValue(0);
    }, [props.open])

    const theme = useTheme();

    return (
        <>
            <Dialog maxWidth={'lg'} fullWidth sx={{
                backdropFilter: "blur(5px)",
            }}
                    open={props.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={props.handleClose}
                    aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{padding: "72px"}}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                {tabCondition(props.modalInfoType).map((tab, i) =>
                                    <Tab key={i} style={{backgroundColor: value===tab.index? theme.palette.secondary.main : "", color:value===tab.index? theme.palette.text.secondary:theme.palette.secondary.contrastText }}  label={tab.label} {...a11yProps(tab.index)} />
                                )}
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Overview
                                application={customizedWasmGetter.md5}
                                id={customizedWasmGetter[props.modalInfoType].id}
                                status={customizedWasmGetter[props.modalInfoType].status}
                                taskType={customizedWasmGetter[props.modalInfoType].taskType}
                                submit_time={customizedWasmGetter[props.modalInfoType].submit_time}
                                process_started={customizedWasmGetter[props.modalInfoType].process_started}
                                process_finished={customizedWasmGetter[props.modalInfoType].process_finished}
                                user_address={customizedWasmGetter[props.modalInfoType].user_address}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Input pub={customizedWasmGetter[props.modalInfoType].pvt}/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Instances instances={customizedWasmGetter[props.modalInfoType].instances}/>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <Proof proof={customizedWasmGetter[props.modalInfoType].proof}/>
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <Aux aux={customizedWasmGetter[props.modalInfoType].aux}/>
                        </TabPanel>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default POCModal;
