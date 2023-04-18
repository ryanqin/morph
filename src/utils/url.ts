import {EndPoint} from "./types/requestTypes";

export const baseUrl = () => {
    let env = process.env.REACT_APP_ENV;
    if (env === "production") {
        return process.env.REACT_APP_PROD_BASE;
    } else if (env === "development") {
        return process.env.REACT_APP_DEV_BASE;
    }
};

export default {
    getEthStatus: (zkgid:string):EndPoint => ({
        url:`https://node.hyperoracle.io/graph?zkgid=${zkgid}`,
        isProtected: false,
    }),
    getThreshold: ():EndPoint => ({
        url: "https://node.hyperoracle.io/auto/threshold",
        isProtected: false,
    }),
    postNewWasmImage: ():EndPoint => ({
        url: "https://zkwasm.hyperoracle.io/setup",
        isProtected: false,
    }),
    checkWasmImageStatus:  (md5:string, taskType: string | null =null):EndPoint => ({
        url: `https://zkwasm.hyperoracle.io/tasks?md5=${md5}${taskType? "&tasktype="+taskType : ""}`,
        isProtected: false
    }),
    deployWasmImageURL: ():EndPoint => ({
        url: "https://zkwasm.hyperoracle.io/deploy",
        isProtected: false,
        contentType: { "Content-Type":"application/json" },
    }),
    proveWasmImageURL: ():EndPoint => ({
        url: "https://zkwasm.hyperoracle.io/prove",
        isProtected: false,
        contentType: { "Content-Type":"application/json" },
    }),
    searchImageURL: (md5:string,):EndPoint => ({
        url: `https://zkwasm.hyperoracle.io/image?md5=${md5}`,
        isProtected: false,
    })
};