import {actionTypesConstructor, dispatchAction} from "../utils";
import url from "../../utils/url";
import {FETCH_DATA} from "../middlewares/api";
import {schema as automationSchema} from "./entities/automation";
import {combineReducers} from "redux";
const abi = require("../../utils/zk/autoabi.json");
const ethers = require('ethers');

let provider = new ethers.providers.WebSocketProvider("wss://sepolia.infura.io/ws/v3/66bdab690554486092111f634a9e891c");
let contractAddress = "0xd0F723c6b2226dF56Fe41E63b9eAA66Eb540BcB8";
let contract = new ethers.Contract(contractAddress, abi, provider);

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/

export const types = {
    AUTOMATION_SUBSCRIBER: actionTypesConstructor(
        "AUTOMATION_SUBSCRIBER_REQUEST",
        "AUTOMATION_SUBSCRIBER_SUCCESS",
        "AUTOMATION_SUBSCRIBER_FAILURE"
    ),
    AUTOMATION_SUBSCRIBER_CANCELLED: "AUTOMATION_SUBSCRIBER_CANCELLED"
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
    isSubscriptionOn: false
}

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/

export const actions = {
    subscribeAutomation: ()=>{
        return async (dispatch, getState) => {
            return contract.on("Auto", async (srcBlockNum, blockhash, target, payload, isTriggered, event) => {
                return await dispatch(
                    {
                        type: types.AUTOMATION_SUBSCRIBER.success(),
                        payload: {srcBlockNum, blockhash, target, payload, isTriggered, event}
                    }
                )
            });
        }
    },
    cancelAutomationSubscription: () => {
        return async (dispatch, getState) => {
            contract.removeAllListeners("Auto");
            return await dispatch(
                {
                    type: types.AUTOMATION_SUBSCRIBER_CANCELLED,
                }
            )
        }
    }
}

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const data = (state = initialState, action) => {
    switch (action.type) {
        case types.AUTOMATION_SUBSCRIBER.success():
            return {...state, isSubscriptionOn: true};
        case types.AUTOMATION_SUBSCRIBER_CANCELLED:
            return {...state, isSubscriptionOn: false};
        default:
            return state;
    }
}

const reducer = combineReducers({data})
export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/

export const getIsSubscriptionOn = (state) => {
    return state.automation.data.isSubscriptionOn;
}