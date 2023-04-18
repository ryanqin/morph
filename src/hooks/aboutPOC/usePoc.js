import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as pocAction,
} from "../../redux/modules/poc";
import {getCustomizedWasm, getPOCConfigInfo} from "../../redux/modules/entities/poc";

const usePoc = () => {
    const dispatch = useDispatch();

    const pocDispatcher = bindActionCreators(
        pocAction,
        dispatch
    );

    return {
        customizedWasmUint8arrayConfigger: async (wasmUnit8Array) => await pocDispatcher.configCustomizedWasm(wasmUnit8Array),
        newWasmImageAdder: async () => await pocDispatcher.addNewWasmImage(),
        wasmImageStatusFetcher: async () => await pocDispatcher.fetchWasmImageStatus(),
        customizedWasmGetter:  useSelector((state) => getCustomizedWasm(state)),
        wasmImageDeployer: async () => await pocDispatcher.deployWasmImage(),
        deployedWasmImageGetter: async () => await pocDispatcher.getDeployedWasmImage(),
        wasmImageDeploymentChecker: async () => await pocDispatcher.checkDeployWasmImageStatus(),
        wasmImageProver: async () => await pocDispatcher.proveWasmImage(),
        wasmImageProofChecker: async () => await pocDispatcher.checkWasmImageStatus(),
        pOCConfigInfoGetter: useSelector((state) => getPOCConfigInfo(state)),
        sourceContractAddressUpdater:  async (address) => await pocDispatcher.updateSourceContractAddress(address),
        sourceEventAbiUpdater:  async (eventName) => await pocDispatcher.updateSourceEventAbi(eventName),
        txHashUpdater:  async (hash) => await pocDispatcher.updateTxHash(hash),
        WasmMappingExecutor:  async () => await pocDispatcher.executeWasmMapping(),
        contractAtPocVerifier: async () => await pocDispatcher.verifyContractAtPoc()
    }
}

export default usePoc;