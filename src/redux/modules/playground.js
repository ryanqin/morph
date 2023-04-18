import {actionTypesConstructor} from "../utils";
import {VIEW_CONTRACT} from "../middlewares/api";
import abi from "../../utils/zk/zkabi.json";
import {uint2hexbytes32} from "../../utils/priceToByte";
import {combineReducers} from "redux";
import { Buffer } from 'buffer';

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
export const types = {
    OFF_CHAIN_VERIFY: actionTypesConstructor(
        "PLAYGROUND/OFF_CHAIN_VERIFY_REQUEST",
        "PLAYGROUND/OFF_CHAIN_VERIFY_SUCCESS",
        "PLAYGROUND/OFF_CHAIN_VERIFY_FAILURE"
    ),

    PULL_DATA_INDEXING: "PLAYGROUND/PULL_DATA_INDEXING",
    PULL_DATA_AUTOMATION: "PLAYGROUND/PULL_DATA_AUTOMATION",
    UPDATE_DATA_INDEXING: "PLAYGROUND/UPDATE_DATA_INDEXING",
    UPDATE_DATA_AUTOMATION: "PLAYGROUND/UPDATE_DATA_AUTOMATION",

    CLEAN_PLAYGROUND: "PLAYGROUND/CLEAN",
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
    isVerifying: false,
    pulledData: false,
    verificationResult: "UNSENT"
}

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/

function int2uint8array(number) {
    // you can use constant number of bytes by using 8 or 4
    const len = Math.ceil(Math.log2(number) / 8);
    const byteArray = new Uint8Array(len);

    for (let index = 0; index < byteArray.length; index++) {
        const byte = number & 0xff;
        byteArray[len - index -1] = byte;
        number = (number - byte) / 256;
    }

    return byteArray;
}

function uint8array2str(byteArray) {
    return Buffer.from(byteArray).toString('hex');
}

function calcState(price, is_trigger) {
    let priceArray = int2uint8array(price);
    let state = new Uint8Array(32);
    state.set(priceArray, 32 - priceArray.length);
    if (is_trigger) {
        state[0] = 128;
    }

    return "0x" + uint8array2str(state);
}

export const actions = {
    offChainVerify: (protocolType)=>{
        return async (dispatch, getState) => {
            const blockHash = await getState().entities.playground.blockHash;
            const blockNumber = await getState().entities.playground.blockNumber;
            const zkProof = await getState().entities.playground.zkProof;
            const zkgState = await getState().entities.playground.zkgState;
            const price = await getState().entities.playground.price * 1000;
            const isTriggered = await getState().entities.playground.isTriggered;

            console.table({"blockHash":blockHash, "zkgState": zkgState, "zkProof": zkProof,
                "uint2hexbytes32(price)": uint2hexbytes32(price),
                "calcState(price, isTriggered)": calcState(price, isTriggered)
            })

            if(protocolType==="ZKAUTOMATION"){
                if(calcState(price, isTriggered)!==zkgState)return await dispatch(
                    {
                        type: types.OFF_CHAIN_VERIFY.failure(),
                        message: "Validation failed!",
                        error: "Validation failed!",
                    }
                )
            }else {
                if(uint2hexbytes32(price) !== zkgState) return await dispatch(
                    {
                        type: types.OFF_CHAIN_VERIFY.failure(),
                        message: "Validation failed!",
                        error: "Validation failed!",
                    }
                )
            }
            return await dispatch(
                {
                    [VIEW_CONTRACT]: {
                        types: types.OFF_CHAIN_VERIFY.all(),
                        contractAddress: "0x0d430614C9dec499eD95080e036F16657973F4B7",
                        abi,
                        provider: "https://rpc.sepolia.org/",
                        funcName: "verify",
                        params: [blockNumber, blockHash, zkgState, zkProof]
                    },
                }
            )
        }
    },
    pullData: (protocolType)=>{
        return async (dispatch, getState) => {
            return await dispatch(
                {
                    type: protocolType === "ZKINDEXING" ? types.PULL_DATA_INDEXING : types.PULL_DATA_AUTOMATION,
                    response: getState().entities.ethStatus
                }
            )
        }
    },
    updateData: (data, protocolType)=>{
        return async (dispatch, getState) => {
            return await dispatch(
                {
                    type: protocolType === "ZKINDEXING" ? types.UPDATE_DATA_INDEXING: types.UPDATE_DATA_AUTOMATION,
                    response: data
                }
            )
        }
    },
    cleanPlayground: () => {
        return async (dispatch, getState) => {
            return await dispatch(
                {type: types.CLEAN_PLAYGROUND}
            )
        }
    }
}

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const data = (state = initialState, action) => {
    switch (action.type) {
        case types.OFF_CHAIN_VERIFY.request():
            return {...state, isVerifying: true, verificationResult: "SENDING"}
        case types.OFF_CHAIN_VERIFY.success():
            return {...state, isVerifying: false, verificationResult: true}
        case types.OFF_CHAIN_VERIFY.failure():
            return {...state, isVerifying: false, verificationResult: false}
        case types.PULL_DATA_INDEXING:
        case types.PULL_DATA_AUTOMATION:
            return { ...state, pulledData: Date.now(), verificationResult: "UNSENT", isVerifying: false };
        case types.UPDATE_DATA_INDEXING:
        case types.UPDATE_DATA_AUTOMATION:
            return {...state, verificationResult: "UNSENT", isVerifying: false}
        case types.CLEAN_PLAYGROUND:
            return initialState;
        default:
            return state;
    }
}

const reducer = combineReducers({data})
export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getIsVerifying = (state) => {
    return state.playground.data.isVerifying;
};

export const getVerificationResult = (state) => {
    return state.playground.data.verificationResult;
}

export const getPulledData = (state) => {
    return state.playground.data.pulledData;
};
