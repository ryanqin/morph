/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
import {actionTypesConstructor, dispatchAction} from "../utils";
import { schema as ethStatusSchema} from "./entities/ethStatus";
import { FETCH_DATA } from "../middlewares/api";
import {Action, combineReducers, Dispatch} from "redux";
import url from "../../utils/url";

export const types = {
    FETCH_ETH_INDEXING_STATUS: actionTypesConstructor(
        "ETH_INDEXING_STATUS_REQUEST",
        "ETH_INDEXING_STATUS_SUCCESS",
        "ETH_INDEXING_STATUS_FAILURE"
    ),
    FETCH_ETH_AUTOMATION_STATUS: actionTypesConstructor(
        "ETH_AUTOMATION_STATUS_REQUEST",
        "ETH_AUTOMATION_STATUS_SUCCESS",
        "ETH_AUTOMATION_STATUS_FAILURE"
    ),
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
    isFetching: false,
}

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export const actions = {
    loadEthStatus: (zkgid:string, protocolType: string)=>{
        return async (dispatch: Dispatch) => {
            const endpoint = url.getEthStatus(zkgid);
            return await dispatch(
                // @ts-ignore
                dispatchAction(
                    FETCH_DATA,
                    protocolType === "ZKINDEXING" ? types.FETCH_ETH_INDEXING_STATUS.all() : types.FETCH_ETH_AUTOMATION_STATUS.all(),
                    endpoint,
                    ethStatusSchema
                )
            )
        }
    }
}

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const data = (state = initialState, action:Action) => {
    switch (action.type) {
        case types.FETCH_ETH_INDEXING_STATUS.request():
            return { ...state, isFetching: true };
        case types.FETCH_ETH_INDEXING_STATUS.success():
            return { ...state, isFetching: false };
        case types.FETCH_ETH_INDEXING_STATUS.failure():
            return { ...state, isFetching: false };
        case types.FETCH_ETH_AUTOMATION_STATUS.request():
            return { ...state, isFetching: true };
        case types.FETCH_ETH_AUTOMATION_STATUS.success():
            return { ...state, isFetching: false };
        case types.FETCH_ETH_AUTOMATION_STATUS.failure():
            return { ...state, isFetching: false };
        default:
            return state;
    }
}

const reducer = combineReducers({data})
export default reducer;