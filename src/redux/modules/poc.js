import {actionTypesConstructor, dispatchAction} from "../utils";
import {combineReducers} from "redux";
import {FETCH_DATA, POST_DATA} from "../middlewares/api";
import url from "../../utils/url";
import {schema} from "./entities/poc";
import {ethers, providers, utils as etherUtils} from "ethers";
import {instantiate} from "../../bundle";
import {Buffer} from 'buffer';
import BN from "bn.js";
import {ZkWasmServiceHelper, ZkWasmUtil} from "zkwasm-service-helper";
import Web3 from "web3";
import {actions as walletActions} from "./wallet"
/***********************************************************************************************************************
 * 													CONSTANTS 														   *
 * *********************************************************************************************************************/
const provider = new providers.JsonRpcProvider("https://eth.llamarpc.com/");

export const types = {
    CONFIG_CUSTOMIZED_WASM: "POC/CONFIG_CUSTOMIZED_WASM",

    UPDATE_SOURCE_CONTRACT_ADDRESS: "POC/UPDATE/SOURCE_CONTRACT_ADDRESS",
    UPDATE_SOURCE_EVENT_ABI: "POC/UPDATE/SOURCE_EVENT_ABI",
    UPDATE_TX_HASH: "POC/UPDATE/TX_HASH",

    CONFIG_MD5: "POC/CONFIG/CONFIG_MD5",

    NEW_WASM_IMAGE: actionTypesConstructor(
        "POC/SETUP/NEW_WASM_IMAGE_REQUEST",
        "POC/SETUP/NEW_WASM_IMAGE_SUCCESS",
        "POC/SETUP/NEW_WASM_IMAGE_FAILURE"
    ),

    CHECK_IMAGE_STATUS: actionTypesConstructor(
        "POC/SETUP/CHECK_IMAGE_STATUS_REQUEST",
        "POC/SETUP/CHECK_IMAGE_STATUS_SUCCESS",
        "POC/SETUP/CHECK_IMAGE_STATUS_FAILURE"
    ),

    DEPLOY_WASM_IMAGE: actionTypesConstructor(
        "POC/DEPLOY/WASM_IMAGE_REQUEST",
        "POC/DEPLOY/WASM_IMAGE_SUCCESS",
        "POC/DEPLOY/WASM_IMAGE_FAILURE"
    ),

    CHECK_DEPLOY_WASM_IMAGE_STATUS: actionTypesConstructor(
        "POC/DEPLOY/CHECK_WASM_IMAGE_REQUEST",
        "POC/DEPLOY/CHECK_WASM_IMAGE_SUCCESS",
        "POC/DEPLOY/CHECK_WASM_IMAGE_FAILURE"
    ),

    PROVE_WASM_IMAGE: actionTypesConstructor(
        "POC/DEPLOY/PROVE_WASM_IMAGE_REQUEST",
        "POC/DEPLOY/PROVE_WASM_IMAGE_SUCCESS",
        "POC/DEPLOY/PROVE_WASM_IMAGE_FAILURE"
    ),

    CHECK_PROVE_WASM_IMAGE_STATUS: actionTypesConstructor(
        "POC/DEPLOY/CHECK_PROVE_WASM_IMAGE_STATUS_REQUEST",
        "POC/DEPLOY/CHECK_PROVE_WASM_IMAGE_STATUS_SUCCESS",
        "POC/DEPLOY/CHECK_PROVE_WASM_IMAGE_STATUS_FAILURE"
    ),

    EXECUTE_WASM_MAPPING: "POC/EXECUTE/EXECUTE_WASM_MAPPING",

    VERIFY_CONTRACT: actionTypesConstructor(
        "POC/VERIFY/VERIFY_CONTACT_REQUEST",
        "POC/VERIFY/VERIFY_CONTACT_SUCCESS",
        "POC/VERIFY/VERIFY_CONTACT_FAILURE",
    ),

    DEPLOYED_IMAGE: actionTypesConstructor(
        "POC/GET/DEPLOYED_IMAGE_REQUEST",
        "POC/GET/DEPLOYED_IMAGE_SUCCESS",
        "POC/GET/DEPLOYED_IMAGE_FAILURE",
    )
}

/***********************************************************************************************************************
 * 													STATE   														   *
 * *********************************************************************************************************************/
const initialState = {
    isAddingNewWasmImageRequesting: false,
    isCheckingWasmStatus: false,
    isDeployingWasmImageRequesting: false,
    isCheckingDeployWasmImageStatus: false,
    isProvingWasmImage: false,
    isCheckingProveWasmStatus: false,
    isVerifying: false,
    isGettingDeployedImageRequesting: false
}

/***********************************************************************************************************************
 * 													ACTIONS 														   *
 * *********************************************************************************************************************/

export function arrayToFile(array) {
    return new File( [array], "poc_module.wasm", {
        type: "application/wasm",
        lastModified: Date.now()
    });
}

export const actions = {
    configCustomizedWasm: (wasmUnit8Array)=>{
        return async (dispatch, getState) => {
            await dispatch({
                type: types.CONFIG_CUSTOMIZED_WASM,
                response: wasmUnit8Array
            })
        }
    },
    addNewWasmImage: ()=>{
        return async (dispatch, getState) => {
            const md5 = ZkWasmUtil.convertToMd5(getState().entities.poc.customizedWasmUint8array.uint8array).toUpperCase();
            console.log("md5: ", md5)

            const restUrl = "https://zkwasm.hyperoracle.io";
            const zkWasmImageHelper = new ZkWasmServiceHelper(restUrl, "", "");
            let image = await zkWasmImageHelper.queryImage(md5);
            if(image !== null){
                return await dispatch(
                    {
                        type: types.CONFIG_MD5,
                        response: image.md5
                    }
                )
            }

            let msg = ZkWasmUtil.createAddImageSignMessage({
                name:"poc_module.wasm",
                image_md5: md5,
                image: arrayToFile(getState().entities.poc.customizedWasmUint8array.uint8array),
                user_address:getState().entities.wallet.address.toLowerCase(),
                description_url: "test poc",
                avator_url: "https://www.hyperoracle.io/static/media/Hyper%20Oracle%20Logo_White.8d58b96fc82ce311ad7ea6bf614ef344.svg",
                circuit_size: 18,
            });
            let signature = await signMessage(msg);
            let formData = new FormData();
            formData.append('name', "poc_module.wasm");
            formData.append('image_md5', md5);
            formData.append("image",arrayToFile(getState().entities.poc.customizedWasmUint8array.uint8array));
            formData.append("user_address", getState().entities.wallet.address.toLowerCase(),);
            formData.append("description_url", "test poc");
            formData.append("avator_url", "https://www.hyperoracle.io/static/media/Hyper%20Oracle%20Logo_White.8d58b96fc82ce311ad7ea6bf614ef344.svg");
            formData.append("circuit_size", 18);
            formData.append("signature", signature);

            const endpoint = url.postNewWasmImage();
            return await dispatch(
                dispatchAction(
                    POST_DATA,
                    types.NEW_WASM_IMAGE.all(),
                    endpoint,
                    null,
                    formData
                )
            )

        }
    },
    fetchWasmImageStatus: ()=>{
        return async (dispatch, getState) =>{
            const md5 = getState().entities.poc.customizedWasmUint8array.md5;
            console.log(`fetchWasmImageStatus/setup: ${getState().entities.poc.customizedWasmUint8array.setup.status}`);
            if(md5 !== "" &&  !["Fail", "Done"].includes(getState().entities.poc.customizedWasmUint8array.setup.status)){
                const endpoint = url.checkWasmImageStatus(md5, "Setup")
                return await dispatch(
                    dispatchAction(
                        FETCH_DATA,
                        types.CHECK_IMAGE_STATUS.all(),
                        endpoint,
                        schema
                    )
                )
            }else{
                return dispatch({
                    type: types.CHECK_IMAGE_STATUS.failure(),
                    message: "md5 not found"
                })
            }
        }
    },
    deployWasmImage: ()=>{
        return async (dispatch, getState) => {
            const endpoint = url.deployWasmImageURL();
            const md5 = getState().entities.poc.customizedWasmUint8array.md5;

            let signature = await signMessage(JSON.stringify({
                user_address: getState().entities.wallet.address.toLowerCase(),
                md5,
                chain_id: 5
            }));

            const req = JSON.stringify({
                user_address: getState().entities.wallet.address.toLowerCase(),
                md5,
                chain_id: 5,
                signature
            })

            return await dispatch(
                dispatchAction(
                    POST_DATA,
                    types.DEPLOY_WASM_IMAGE.all(),
                    endpoint,
                    null,
                    req
                )
            )
        }
    },
    getDeployedWasmImage: () => {
        return async (dispatch, getState) => {
            const md5 = getState().entities.poc.customizedWasmUint8array.md5;
            const endpoint = url.searchImageURL(md5)

            return await dispatch(
                dispatchAction(
                    FETCH_DATA,
                    types.DEPLOYED_IMAGE.all(),
                    endpoint,
                    schema
                )
            )
        }
    },
    checkDeployWasmImageStatus: ()=>{
        return async (dispatch, getState) => {
            const md5 = getState().entities.poc.customizedWasmUint8array.md5;
            const endpoint = url.checkWasmImageStatus(md5, "Deploy");
            console.log(`fetchWasmImageStatus/deploy: ${getState().entities.poc.customizedWasmUint8array.deploy.status}`);
            return await dispatch(
                dispatchAction(
                    FETCH_DATA,
                    types.CHECK_DEPLOY_WASM_IMAGE_STATUS.all(),
                    endpoint,
                    schema
                )
            )
        }
    },
    proveWasmImage: ()=>{
        return async (dispatch, getState) => {
            const md5 = getState().entities.poc.customizedWasmUint8array.md5;
            const pub = getState().entities.poc.customizedWasmUint8array.execute.pub
            const endpoint = url.proveWasmImageURL();

            let signature = await signMessage(JSON.stringify({
                user_address: getState().entities.wallet.address.toLowerCase(),
                md5,
                public_inputs: [],
                private_inputs: pub
            }));

            const req = JSON.stringify({
                user_address:getState().entities.wallet.address.toLowerCase(),
                md5,
                public_inputs: [],
                private_inputs: pub,
                signature
            });

            return await dispatch(
                dispatchAction(
                    POST_DATA,
                    types.PROVE_WASM_IMAGE.all(),
                    endpoint,
                    null,
                    req
                )
            )
        }
    },
    checkWasmImageStatus: ()=>{
        return async (dispatch, getState) =>{
            const md5 = getState().entities.poc.customizedWasmUint8array.md5;
            const endpoint = url.checkWasmImageStatus(md5, "Prove");
            console.log(`fetchWasmImageStatus/prove: ${getState().entities.poc.customizedWasmUint8array.prove.status}`);
            return await dispatch(
                dispatchAction(
                    FETCH_DATA,
                    types.CHECK_PROVE_WASM_IMAGE_STATUS.all(),
                    endpoint,
                    schema
                )
            )
        }
    },
    updateSourceContractAddress: (address)=>{
        return async (dispatch, getState) =>{
            return await dispatch(
                {
                    type: types.UPDATE_SOURCE_CONTRACT_ADDRESS,
                    payload: address
                }
            )
        }
    },
    updateSourceEventAbi: (eventName)=>{
        return async (dispatch, getState) =>{
            return await dispatch(
                {
                    type: types.UPDATE_SOURCE_EVENT_ABI,
                    payload: eventName
                }
            )
        }
    },
    updateTxHash: (hash)=>{
        return async (dispatch, getState) =>{
            return await dispatch(
                {
                    type: types.UPDATE_TX_HASH,
                    payload: hash
                }
            )
        }
    },
    executeWasmMapping: ()=>{
        return async (dispatch, getState) =>{

            console.log("executeWasmMapping")
            const wasmUint8Array =  getState().entities.poc.customizedWasmUint8array.uint8array;
            const sourceContractAddress = getState().entities.poc.configInfo.sourceContractAddress; // ethers.utils.getAddress
            const sourceEventName = getState().entities.poc.configInfo.sourceEventABI;
            const txHash = getState().entities.poc.customizedWasmUint8array.execute.txHash;

            let log = await geLastLog(
                provider,
                ethers.utils.getAddress(sourceContractAddress),
                txHash,
                sourceEventName
            );

            let emptyValue = "0x" + "0".repeat(64);
            let [eventSig, topic1 = emptyValue, topic2 = emptyValue, topic3 = emptyValue] = log.topics;
            let data = log.data || emptyValue;
            console.log("executeWasmMapping: ")
            console.table({"log": log, "data": data})

            let output = await callWasm(eventSig, topic1, topic2, topic3, data, wasmUint8Array);
            console.log("output", output);

            // let output = "0x0000000000000000000000000000000000000000000000000000000000000001";
            let pub = generateInput(eventSig, topic1, topic2, topic3, data, output);
            console.log("pub", pub);

            return await dispatch(
                {
                    type: types.EXECUTE_WASM_MAPPING,
                    response: {
                        output, pub
                    }
                }
            )

        }
    },
    verifyContractAtPoc: ()=>{
        return async (dispatch, getState) => {

            dispatch({
                type: types.VERIFY_CONTRACT.request(),
                response: "SENDING"
            })

            const contractAddress = getState().entities.poc.customizedWasmUint8array.deploy.deployedAddress;
            let proof = bytesToBN(getState().entities.poc.customizedWasmUint8array.prove.proof);
            let verify_instance = bytesToBN(getState().entities.poc.customizedWasmUint8array.prove.instances);
            let aux = bytesToBN(getState().entities.poc.customizedWasmUint8array.prove.aux);
            console.log(getState().entities.poc.customizedWasmUint8array.prove.pub)
            let args = parseArgs(getState().entities.poc.customizedWasmUint8array.prove.pub).map((x) => x.toString(10));
            console.table({"contractAddress": contractAddress, "proof": proof, "verify_instance": verify_instance, "aux": aux, "target_instance": args})

            if (args.length === 0) {
                args = [0];
            }

            const web3 = new Web3('https://rpc.ankr.com/eth_goerli');
            const contract = new web3.eth.Contract(contract_abi.abi, contractAddress);

            try {
                await contract.methods
                    .verify(proof, verify_instance, aux, [args])
                    .call();
            } catch (error) {
                console.log(error.message);
                console.log("verify failed");
                return await dispatch({
                    type: types.VERIFY_CONTRACT.success(),
                    response: false
                })
            }

            console.log("verify success");
            return await dispatch({
                type: types.VERIFY_CONTRACT.success(),
                response: true
            })

        }
    }
}


/***********************************************************************************************************************
 * 													REDUCERS 														   *
 * *********************************************************************************************************************/
const data = (state = initialState, action) => {
    switch (action.type) {
        case types.NEW_WASM_IMAGE.request():
            return {...state, isAddingNewWasmImageRequesting: true}
        case types.NEW_WASM_IMAGE.success():
            return {...state, isAddingNewWasmImageRequesting: false}
        case types.NEW_WASM_IMAGE.failure():
            return {...state, isAddingNewWasmImageRequesting: false}
        case types.CHECK_IMAGE_STATUS.request():
            return {...state, isCheckingWasmStatus: true}
        case types.CHECK_IMAGE_STATUS.success():
            return {...state, isCheckingWasmStatus: false}
        case types.CHECK_IMAGE_STATUS.failure():
            return {...state, isCheckingWasmStatus: false}
        case types.DEPLOY_WASM_IMAGE.request():
            return {...state, isDeployingWasmImageRequesting: true}
        case types.DEPLOY_WASM_IMAGE.success():
            return {...state, isDeployingWasmImageRequesting: false}
        case types.DEPLOY_WASM_IMAGE.failure():
            return {...state, isDeployingWasmImageRequesting: false}
        case types.CHECK_DEPLOY_WASM_IMAGE_STATUS.request():
            return {...state, isCheckingDeployWasmImageStatus: true}
        case types.CHECK_DEPLOY_WASM_IMAGE_STATUS.success():
            return {...state, isCheckingDeployWasmImageStatus: false}
        case types.CHECK_DEPLOY_WASM_IMAGE_STATUS.failure():
            return {...state, isCheckingDeployWasmImageStatus: false}
        case types.PROVE_WASM_IMAGE.request():
            return {...state, isProvingWasmImage: true}
        case types.PROVE_WASM_IMAGE.success():
            return {...state, isProvingWasmImage: false}
        case types.PROVE_WASM_IMAGE.failure():
            return {...state, isProvingWasmImage: false}
        case types.VERIFY_CONTRACT.request():
            return {...state, isVerifying: true}
        case types.VERIFY_CONTRACT.success():
            console.log(action)
            return {...state, isVerifying: false}
        case types.VERIFY_CONTRACT.failure():
            console.log(action)
            return {...state, isVerifying: false}
        case types.DEPLOYED_IMAGE.request():
            return {...state, isDeployingWasmImageRequesting: true}
        case types.DEPLOYED_IMAGE.success():
            return {...state, isDeployingWasmImageRequesting: false}
        case types.DEPLOYED_IMAGE.failure():
            return {...state, isDeployingWasmImageRequesting: false}

        default:
            return state;
    }
}


const reducer = combineReducers({data})
export default reducer;

/***********************************************************************************************************************
 * 													SELECT  														   *
 * *********************************************************************************************************************/


async function geLastLog(provider, address, txhash, eventName) {
    let lastLog = null;
    let expectTopic = etherUtils.id(eventName);
    const receipt = await provider.getTransactionReceipt(txhash);
    console.log("receipt: ", receipt)
    for (let j = receipt.logs.length - 1; j >= 0; j--) {
        const log = receipt.logs[j];
        const logTopic = log.topics[0];
        console.table({
            "logTopic": logTopic,
            "expectTopic": expectTopic,
            "log.address": log.address,
            "address": address
        })
        if (logTopic === expectTopic && log.address === address) {
            lastLog = log;
            break;
        }
    }

    console.log("lastlog: ", lastLog)
    return lastLog;
}

function hexToUint8Array(hex) {
    if (hex.startsWith("0x")) {
        hex = hex.substring(2);
    }
    let arr = [];
    for (let i = 0, l = hex.length; i < l; i += 2) {
        arr.push(parseInt(hex.substr(i, 2), 16));
    }
    return new Uint8Array(arr);
}

function uint8array2str(byteArray) {
    return "0x" + Buffer.from(byteArray).toString('hex');
}

async function callWasm(eventSig, topic1, topic2, topic3, data, wasmUint8Array) {
    const exports = await instantiate(
        await WebAssembly.compileStreaming(fetch(window.URL.createObjectURL(new Blob([wasmUint8Array], {type: "application/wasm"})))),
        {}
    );
    let output = exports.handleEvent(
        hexToUint8Array(eventSig),
        hexToUint8Array(topic1),
        hexToUint8Array(topic2),
        hexToUint8Array(topic3),
        hexToUint8Array(data)
    );

    return uint8array2str(output);
}

function generateInput(eventSig, topic1, topic2, topic3, data, output) {
    let dataLength = data.length;
    if (data.startsWith("0x")) {
        dataLength = dataLength - 2;
    }
    dataLength = dataLength / 2;

    let publicinput = new Array(7);
    publicinput[0] = `${eventSig}:bytes-packed`;
    publicinput[1] = `${topic1}:bytes-packed`;
    publicinput[2] = `${topic2}:bytes-packed`;
    publicinput[3] = `${topic3}:bytes-packed`;
    publicinput[4] = `0x${dataLength.toString(16)}:i64`;
    publicinput[5] = `${data}:bytes-packed`;
    publicinput[6] = `${output}:bytes-packed`;

    return publicinput;
}

// Convert a hex string to a byte array
function hexToBNs(hexString){
    let bytes = new Array(hexString.length/2);
    for (var i = 0; i < hexString.length; i += 2) {
        bytes[i] = new BN(hexString.slice(i, i+2), 16);
    }
    return bytes;
}

export function parseArg(input) {
    let inputArray = input.split(":");
    let value = inputArray[0];
    let type = inputArray[1];
    let re1 = new RegExp(/^[0-9A-Fa-f]+$/); // hexdecimal
    let re2 = new RegExp(/^\d+$/); // decimal

    // Check if value is a number
    if(!(re1.test(value.slice(2)) || re2.test(value))) {
        console.log("Error: input value is not an interger number");
        return null;
    }

    // Convert value byte array
    if(type == "i64") {
        let v;
        if(value.slice(0, 2) == "0x") {
            v = new BN(value.slice(2), 16);
        } else {
            v = new BN(value);
        }
        return [v];
    } else if(type == "bytes" || type == "bytes-packed") {
        if(value.slice(0, 2) != "0x") {
            console.log("Error: bytes input need start with 0x");
            return null;
        }
        let bytes = hexToBNs(value.slice(2));
        return bytes;
    } else {
        console.log("Unsupported input data type: %s", type);
        return null;
    }
}

export function parseArgs(raw) {
    let parsedInputs = new Array();
    for (var input of raw) {
        input = input.trim();
        if (input!=="") {
            let args = parseArg(input);
            if (args!=null) {
                parsedInputs.push(args);
            } else {
                throw Error(`invalid args in ${input}`);
            }
        }
    }
    return parsedInputs.flat();
}

export function bytesToBN(data) {
    let chunksize = 64;
    let bns = [];
    for (let i = 0; i < data.length; i += 32) {
        const chunk = data.slice(i, i + 32);
        let a = new BN(chunk,'le');
        bns.push(a);
        // do whatever
    }
    return bns;
}




export const contract_abi = {
    "contractName": "AggregatorVerifier",
    "abi": [
        {
            "inputs": [
                {
                    "internalType": "contract AggregatorVerifierCoreStep[]",
                    "name": "_steps",
                    "type": "address[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256[]",
                    "name": "proof",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "verify_instance",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "aux",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[][]",
                    "name": "target_instance",
                    "type": "uint256[][]"
                }
            ],
            "name": "verify",
            "outputs": [],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        }
    ],
}

export async function signMessage(message) {
    let provider = window.ethereum;
    if (!provider) {
        throw new Error("No provider found!");
    }
    const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
    })
    const account = accounts[0];

    const msg = Web3.utils.utf8ToHex(message);
    const msgParams = [msg, account];
    //TODO: type this properly
    const sig = await (provider).request({
        method: "personal_sign",
        params: msgParams,
    });
    return sig;

}

