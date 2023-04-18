import TitleCard from "../../components/TitleCard";
import Box from "@mui/material/Box";
import Title from "../../components/Title";
import FeatureCard from "../../components/FeatureCard";
import zkindexing from "../../../src/assets/featureBG/Triad-Space.svg";
import automation from "../../../src/assets/featureBG/Spiral-Dots.svg";
import zkindexing_d from "../../../src/assets/featureBG/Triad-Space_dark.svg";
import automation_d from "../../../src/assets/featureBG/Spiral-Dots_dark.svg";
import DetailCard from "../../components/DetailCard";
import LinkCard from "../../components/LinkCard";
import Typography from "@mui/material/Typography";
import Roadmap from "../../components/Roadmap";
import CommunityModal from "../../components/CommunityModal";
import useSettings from "../../hooks/aboutSettings/useSettings";
import News from "../../components/News";


const Home = () =>{
    const {settings} = useSettings();

    return<>
        <TitleCard page={"home"} width={"782px"}/>
        <Box style={{marginTop: "150px", marginBottom:"70px"}} >
            <Title variant={"h2"} title={"Fully Decentralized Infra, Powered by ZK."}/>
        </Box>
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"space-between"}}>
            <FeatureCard to={{link: "/about/indexing", linkText:"Explore zkIndexing", isInternal: true}} image={settings.theme === "LIGHT" ? zkindexing : zkindexing_d} title={"Trustless Indexing and Querying of Blockchain Data"} features={["Build Fully Decentralized and Secure DApps", "Lightening-fast Performance and Low Latency", "One zkGraph, Query Any Data"]}/>
            <FeatureCard to={{link: "/about/automation", linkText:"Explore zkAutomation", isInternal: true}} image={settings.theme === "LIGHT" ? automation : automation_d}  title={"Trustless Automation Not Bounded by Source"} features={["Trustless, Verifiable and Secure Automation", "Automate with Any On/Off-chain Source Data", "Any Automation/Keeper Job Enabled"]}/>
        </Box>
        <Box sx={{marginTop: "147px"}}>
            <DetailCard/>
        </Box>
        <Box sx={{marginTop: "83px"}}>
            <Typography color="#527C93" variant={"h4"}>Be part of the Hyper Oracle network</Typography>
        </Box>
        <Box sx={{display: "flex", marginTop: "32px", flexDirection: "row", justifyContent:"space-between"}}>
            <LinkCard buttonType={"first"} to={{link: "/app/zkGraph", isInternal: true, linkText:"Explore all zkGraphs"}}  tag={{type: "step", step: "01"}} title={"Want to learn more about zkGraph?"}/>
            <LinkCard   buttonType={"first"} to={{link: "/about/indexing", isInternal: true, linkText:"Learn about zkIndexing"}} tag={{type: "step", step: "02"}}  title={"Interested in running a node?"}/>
            <CommunityModal title={"Want to learn more about Hyper Oracle?"} tag={{type: "step", step: "03"}} disableFocusRipple hasPadding={false} linkText={"Join our whitelist"} />

        </Box>
        {/*<Box>*/}
        {/*    <InvestorCard/>*/}
        {/*</Box>*/}
        <Box sx={{marginTop: "100px"}}>
            <Roadmap/>
        </Box>

        <News />
    </>

}

export default Home
