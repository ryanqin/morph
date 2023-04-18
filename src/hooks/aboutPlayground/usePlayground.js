import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as playgroundActions,
    getIsVerifying,
    getPulledData,
    getVerificationResult
} from "../../redux/modules/playground";
import {getPlaygroundData} from "../../redux/modules/entities/playground";

const usePlayground = () => {
    const dispatch = useDispatch();
    const playgroundDispatcher = bindActionCreators(
        playgroundActions,
        dispatch
    );

    return {
        getPulledData: useSelector((state) => getPulledData(state)),
        getIsVerifying: useSelector((state) => getIsVerifying(state)),
        offChainVerify: async(protocolType)=>await playgroundDispatcher.offChainVerify(protocolType),
        pullData: async(protocolType)=> await playgroundDispatcher.pullData(protocolType),
        playgroundDataGetter: useSelector((state) => getPlaygroundData(state)),
        getVerificationResultGetter: useSelector((state) => getVerificationResult(state)),
        updateData: async(data, protocolType)=>await playgroundDispatcher.updateData(data, protocolType),
        playgroundCleaner: async ()=>await playgroundDispatcher.cleanPlayground()
    }
}

export default usePlayground;