import {combineReducers} from "redux";

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
export const types = {
    PROTOCOLS_DATA_CONFIG: "APP/PROTOCOLS_DATA_CONFIG",
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
    protocolIDs: [],
}


/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export const actions = {
    configProtocolData: (data)=>{
        return async (dispatch, getState) => {
            return await dispatch(
                {
                    type: types.PROTOCOLS_DATA_CONFIG,
                    response: data
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
        case types.PROTOCOLS_DATA_CONFIG:
            return {protocolIDs: [...action.response.map(each=>each.id)]}
        default:
            return state;
    }

}

const reducer = combineReducers({data})
export default reducer;