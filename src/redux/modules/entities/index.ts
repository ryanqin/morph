import { combineReducers } from "redux";
import asEditor from "./asEditor";
import automation from "./automation";
import ethStatus from "./ethStatus";
import playground from "./playground";
import poc from "./poc";
import protocols from "./protocols";
import wallet from "./wallet";

const rootReducer = combineReducers({
    ethStatus,
    playground,
    protocols,
    automation,
    poc,
    asEditor,
    wallet,
});


export default rootReducer;