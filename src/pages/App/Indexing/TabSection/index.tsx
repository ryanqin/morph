import * as React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from '@mui/material/Tabs';
import {TABS} from "../../../../contexts/IndexingTabsContext";
import useIndexingTabs from '../../../../hooks/aboutIndexingTabs/useIndexingTabs';
import { Tab, useTheme} from "@mui/material";
import ZKGraphSection from '../ZKGraphSection';
import BountySection from '../BountyTab';
import OverviewTab from './OverviewTab';
import useSettings from "../../../../hooks/aboutSettings/useSettings";
import Automation from '../../Automation';

type TabPanelProps = {
    children: JSX.Element,
    index: string,
    value: string
}
function TabPanel(props:TabPanelProps) {
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
                    <Typography>{children}</Typography>
            )}
        </div>
    );
}


function a11yProps(index: string) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export default function TabSection(props:any) {
    const {tabs, currentTab, setCurrentTab} = useIndexingTabs();
    const theme = useTheme();
    const {settings} = useSettings();
    const {protocol} = props;

    const handleChange = (event:any, newValue:string) => {
        // @ts-ignore
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ width: 'auto', height: "auto" , marginTop: "3rem"}}>
            <Box sx={{  borderBottom: `1px solid ${settings.theme === "DARK"?theme.palette.primary.contrastText:theme.palette.secondary.contrastText}`}}>
                <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.slice(0 , protocol.protocolType !== "ZKAUTOMATION"? -1:tabs.length).map((tab, k)=>
                        <Tab key={k} value={tab.value} label={tab.label} style={{backgroundColor: currentTab===tab.value? theme.palette.secondary.main : "", color:currentTab===tab.value? theme.palette.text.secondary:theme.palette.secondary.contrastText }} {...a11yProps(tab.value)} />
                    )}
                </Tabs>
            </Box>
            <TabPanel value={currentTab} index={TABS.OVERVIEW}>
                <OverviewTab protocol={protocol.overview} protocolType={protocol.protocolType}/>
            </TabPanel>
            <TabPanel value={currentTab} index={TABS.ZKGRAPH}>
                <ZKGraphSection/>
            </TabPanel>
            <TabPanel value={currentTab} index={TABS.BOUNTY}>
                <BountySection/>
            </TabPanel>
            {
                protocol.protocolType === "ZKAUTOMATION" && <TabPanel value={currentTab} index={TABS.AUTOMATION}>
                    <Automation/>
                </TabPanel>
            }
        </Box>
    );
}