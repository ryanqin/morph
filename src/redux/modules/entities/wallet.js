/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/

import {types} from "../wallet";

const initialState = {
    address: null,
    chainId: null
}

export const schema = {
    name: "wallet",
    id: "id",
};


/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CONFIGURE_WALLET:
            return {address: action.payload.address, chainId: action.payload.chain}
        case types.WALLET_CONNECT:
            return {address: action.payload.address, chainId: action.payload.chain}
        case types.WALLET_DISCONNECT:
            return initialState;
        default:
            return state;
    }
}

export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/

export const getWallet = (state) => {
    return state.entities.wallet
}

