import {types} from "../protocols";

/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
const initialState = {}

export const schema = {
    name: "protocols",
    id: "id",
};


/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.PROTOCOLS_DATA_CONFIG:
            let kvObj = {};
            action.response.forEach((item) => {
                kvObj[item.id] = item;
            });
            return kvObj
        default:
            return state;
    }
}

export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/

export const getProtocolBasicById = (state, protocolId) => {
    return state.entities.protocols[protocolId]
}

export const getProtocolIds = (state) => {
    return state.protocols.data.protocolIDs
}
