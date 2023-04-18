import TitleCard from "../../../components/TitleCard";
import AppIntroSteps from "../../../components/AppIntroSteps";
import DAppListCard from "../../../components/DAppListCard";
import News from "../../../components/News";

const ZKAutomation = () =>{

    return <>
        <TitleCard page={"zkAutomation"} width={"100%"}/>
        <AppIntroSteps app={"zkAutomation"}/>
        <DAppListCard/>

        <News />
    </>
}


export default ZKAutomation;
