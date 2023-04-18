/***********************************************************************************************************************
 * 													SCHEMA 														   *
 * *********************************************************************************************************************/
import {types} from "../ethStatus";

const initialState = {
  blockNumber: 0,
  blockHash: "0x",
  zkProof: "0x",
  price: 0,
  decimals: 3,
  zkgState: "0x",
};

export const schema = {
  name: "ethStatus",
  id: "id",
};

/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ETH_INDEXING_STATUS.success():
      return {
        blockNumber: action.response.blocknum,
        blockHash: action.response.blockhash,
        zkProof: action.response.zkproof,
        price: action.response.graphdata["price_weth_usdc"],
        decimals: action.response.graphdata.decimals,
        zkgState: action.response.zkgstate,
        contract:  action.response.graphdata.contract,
      };
    case types.FETCH_ETH_AUTOMATION_STATUS.success():
      return {
        blockNumber: action.response.blocknum,
        blockHash: action.response.blockhash,
        zkProof: action.response.zkproof,
        price: action.response.graphdata["price_weth_usdc"],
        decimals: action.response.graphdata.decimals,
        zkgState: action.response.zkgstate,
        isTriggered:  action.response.graphdata.is_trigger,
      };
    default:
      return state;
  }
};

export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/
export const getEthStatus = (state) => {
  return state.entities.ethStatus;
};
