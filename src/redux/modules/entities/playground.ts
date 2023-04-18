import {types} from "../playground";

/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
export type PlayGroundProps = {
    blockNumber: number,
    blockHash: string,
    zkProof: string,
    price: number,
    decimals: number,
    zkgState: string,
    contract?: string,
    isTriggered?:string,
    verificationResult: string,
}

const initialState:PlayGroundProps = {
    blockNumber: 0,
    blockHash: "0x",
    zkProof: "0x",
    price: 0,
    decimals: 3,
    zkgState: "0x",
    verificationResult: "UNSENT",
};

export const schema = {
    name: "playground",
    id: "id",
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const reducer = (state = initialState, action:{type: string, response: any}) => {
    switch (action.type) {
        case types.PULL_DATA_INDEXING:
            return {
                blockNumber: action.response.blockNumber,
                blockHash: action.response.blockHash,
                zkProof: action.response.zkProof,
                price: action.response.price,
                decimals: action.response.decimals,
                zkgState: action.response.zkgState,
                contract:  action.response.contract,
                verificationResult: "UNSENT",
            };
        case types.PULL_DATA_AUTOMATION:
            return {
                blockNumber: action.response.blockNumber,
                blockHash: action.response.blockHash,
                zkProof: action.response.zkProof,
                price: action.response.price,
                decimals: action.response.decimals,
                zkgState: action.response.zkgState,
                isTriggered:  action.response.isTriggered,
                verificationResult: "UNSENT",
            };
        case types.UPDATE_DATA_INDEXING:
            return {
                blockNumber: action.response.blockNumber,
                blockHash: action.response.blockHash,
                zkProof: action.response.zkProof,
                price: action.response.price,
                decimals: action.response.decimals,
                zkgState: action.response.zkgState,
                contract:  action.response.contract,
                verificationResult: "UNSENT",
            };
        case types.UPDATE_DATA_AUTOMATION:
            return {
                blockNumber: action.response.blockNumber,
                blockHash: action.response.blockHash,
                zkProof: action.response.zkProof,
                price: action.response.price,
                decimals: action.response.decimals,
                zkgState: action.response.zkgState,
                isTriggered:  action.response.isTriggered,
                verificationResult: "UNSENT",
            };
        case types.OFF_CHAIN_VERIFY.request():
            return {
                ...state,
                verificationResult: "SENDING"
            }
        case types.OFF_CHAIN_VERIFY.success():
            console.log(action)
            return {
                ...state,
                verificationResult: true
            }
        case types.OFF_CHAIN_VERIFY.failure():
            return {
                ...state,
                verificationResult: false
            }
        case types.CLEAN_PLAYGROUND:
            return initialState;
        default:
            return state;
    }
};

export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getPlaygroundData = (state: any) => {
    return state.entities.playground;
};
