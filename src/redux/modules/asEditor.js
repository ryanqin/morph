import {combineReducers} from "redux";

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
export const types = {
   ASEDITOR_TAB: "ASEDITOR/TAB_CHANGE", ASEDITOR_CODE: "ASEDITOR/CODE_UPDATE",
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
    tab: "module"
}


/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export const actions = {
    asEditorTabSwitch: (tab)=>{
        return async (dispatch, getState) =>{
            await dispatch({
                type: types.ASEDITOR_TAB,
                payload: tab
            })
        }
    },
    asEditorCodeUpdate: (value, tab) => {
        return async (dispatch, getState) => {
            await dispatch({
                type: types.ASEDITOR_CODE,
                payload: {value, asEditorCurrentTab: tab}
            })
        }
    }
}

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const data = (state = initialState, action) => {
    switch (action.type) {
        case types.ASEDITOR_TAB:
            return {tab: action.payload}
        default:
            return state;
    }

}

const reducer = combineReducers({data})
export default reducer;


/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getAsEditorCurrentTab = (state) => {
    return state.asEditor.data.tab;
}

