import {combineReducers} from "redux";

/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
export const types = {
    CONFIGURE_WALLET: "APP/CONFIGURE/WALLET_CONNECT",
    CONFIGURE_WALLET_FAILURE: "APP/CONFIGURE/WALLET_CONNECT/FAILURE",
    WALLET_CONNECT: "APP/SET/WALLET_CONNECT",
    WALLET_DISCONNECT: "APP/DISCONNECT/WALLET",
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/

const initialState = {
    isWalletInstalled: true,
    isWalletConnected: false,
}

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/
export const actions = {
    walletConfigurator: () => {
        return async (dispatch, getState) => {
            if (typeof window.ethereum !== "undefined") {
                const address = await loadUserWeb3();
                const chain = null;
                return await dispatch({
                    type: types.CONFIGURE_WALLET,
                    payload: {address, chain},
                });
            } else {
                console.log("[MetaMask:Installation:CHECK]: false");
                return await dispatch({ type: types.CONFIGURE_WALLET_FAILURE, message: "Please install MetaMask", error: "Digital Wallet Installation Error!" });
            }
        };
    },
    setWallet: (wallet)=>{
        return async (dispatch, getState) =>{
            await dispatch({
                type: types.WALLET_CONNECT,
                payload: wallet
            })
        }
    },
    disconnectWallet: ()=>{
        return async (dispatch, getState) =>{
            await dispatch({
                type: types.WALLET_DISCONNECT,
            })
        }
    }
}

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const data = (state = initialState, action) => {
    switch (action.type) {
        case types.CONFIGURE_WALLET_FAILURE:
            return {...state, isWalletInstalled: false}
        case types.CONFIGURE_WALLET:
            return action.payload.address ? {...state, isWalletConnected: true} : {...this.state}
        case types.WALLET_CONNECT:
            return {...state, isWalletConnected: true}
        case types.WALLET_DISCONNECT:
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

export const getWalletStatus = (state) =>{
    return state.wallet.data
}



export const loadUserWeb3 = async () => {
    const accounts = await window.ethereum.request({
        method: 'eth_accounts',
    })

    return accounts.length === 0 ? null : accounts[0];
};
