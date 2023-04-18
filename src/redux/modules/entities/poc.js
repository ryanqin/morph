/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
import {types} from "../poc";

const initialState = {
    configInfo:{
        sourceContractAddress: "0x8c09571bc1932fEb1367853bA26e1f5Dc9e1249b",
        sourceEventABI: "Sync(uint112,uint112)"
    },
    customizedWasmUint8array: {
        uint8array: null,
        md5: "",
        setup:{
            id: "",
            status: null,
            taskType: null,
            submit_time: null,
            process_started: null,
            process_finished: null,
            user_address: null,
        },
        deploy: {
            id: "",
            status: null,
            taskType: null,
            submit_time: null,
            process_started: null,
            process_finished: null,
            user_address: null,
            deployedAddress: ""
        },
        prove: {
            id: "",
            status: null,
            taskType: null,
            submit_time: null,
            process_started: null,
            process_finished: null,
            user_address: null,
            proof: [],
            instances: [],
            aux: [],
            pub: [],
            pvt: ""
        },
        execute: {
            txHash: "0x9825d7590e5c31b6cd3fd4e12a4afff309b64d6a9aedead86ae80997ac6aaea6",
            output: "",
            pub: "",
            pvt: ""
        },
        verify: {
            result: "UNSENT"
        }
    },
}

export const schema = {
    name: "poc",
    id: "id",
};


/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CONFIG_CUSTOMIZED_WASM:
            return {...state, customizedWasmUint8array: { ...state.customizedWasmUint8array, uint8array: action.response}}
        case types.CONFIG_MD5:
            return {...state, customizedWasmUint8array: { ...state.customizedWasmUint8array, md5: action.response}}
        case types.NEW_WASM_IMAGE.success():
            return {...state, customizedWasmUint8array: { ...state.customizedWasmUint8array, md5: action.response.result.md5, setup: {...state.customizedWasmUint8array.setup, id: action.response.result.id}}}
        case types.CHECK_IMAGE_STATUS.success():
            return {...state,
                customizedWasmUint8array: {
                ...state.customizedWasmUint8array,
                    setup: {
                    ...state.customizedWasmUint8array.setup,
                        status: action.response.result[0].status,
                        taskType: action.response.result[0].task_type,
                        submit_time: action.response.result[0].submit_time,
                        process_started: action.response.result[0].process_started,
                        process_finished: action.response.result[0].process_finished,
                        user_address: action.response.result[0].user_address,
                }
            }
            }
        case types.DEPLOY_WASM_IMAGE.success():
            return {...state, customizedWasmUint8array: {...state.customizedWasmUint8array, deploy: {...state.customizedWasmUint8array.deploy, id: action.response.result.id}}}
        case types.DEPLOYED_IMAGE.success():
            return {...state, customizedWasmUint8array: {...state.customizedWasmUint8array, deploy: {...state.customizedWasmUint8array.deploy, deployedAddress: action.response.result[0].deployment[0].address}}}
        case types.CHECK_DEPLOY_WASM_IMAGE_STATUS.success():
            return {...state, customizedWasmUint8array:
                    {...state.customizedWasmUint8array,
                        deploy:
                            {...state.customizedWasmUint8array.deploy,
                                status: action.response.result[0].status,
                                taskType: action.response.result[0].task_type,
                                submit_time: action.response.result[0].submit_time,
                                process_started: action.response.result[0].process_started,
                                process_finished: action.response.result[0].process_finished,
                                user_address: action.response.result[0].user_address
                            }
                    }
            }
        case types.PROVE_WASM_IMAGE.success():
            return {...state, customizedWasmUint8array: {...state.customizedWasmUint8array, prove: {...state.customizedWasmUint8array.prove, id: action.response.result.id}}}
        case types.CHECK_PROVE_WASM_IMAGE_STATUS.success():
            return {...state, customizedWasmUint8array:
                    {...state.customizedWasmUint8array,
                        prove:
                            {...state.customizedWasmUint8array.prove,
                                status: action.response.result[0].status,
                                proof: action.response.result[0].proof,
                                pvt: action.response.result[0].private_inputs,
                                pub: action.response.result[0].public_inputs,
                                instances: action.response.result[0].instances,
                                aux: action.response.result[0].aux,
                                taskType: action.response.result[0].task_type,
                                submit_time: action.response.result[0].submit_time,
                                process_started: action.response.result[0].process_started,
                                process_finished: action.response.result[0].process_finished,
                                user_address: action.response.result[0].user_address,
                            }
                    }
            }
        case types.UPDATE_SOURCE_CONTRACT_ADDRESS:
            return {...state, configInfo: {...state.configInfo, sourceContractAddress: action.payload}}
        case types.UPDATE_SOURCE_EVENT_ABI:
            return {...state, configInfo: {...state.configInfo, sourceEventABI: action.payload}}
        case types.UPDATE_TX_HASH:
            return {...state,  customizedWasmUint8array: {...state.customizedWasmUint8array, execute: {...state.customizedWasmUint8array.execute, txHash: action.payload}}}
        case types.EXECUTE_WASM_MAPPING:
            return {...state,  customizedWasmUint8array: {...state.customizedWasmUint8array, execute: {...state.customizedWasmUint8array.execute, output:action.response.output, pub: action.response.pub}}}
        case types.VERIFY_CONTRACT.success():
            return {...state, customizedWasmUint8array: {...state.customizedWasmUint8array, verify: {result: action.response}}}
        default:
            return state;
    }
}

export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/

export const getCustomizedWasm = (state) =>{
    return state.entities.poc.customizedWasmUint8array;
}

export const getPOCConfigInfo = (state) =>{
    return state.entities.poc.configInfo;
}