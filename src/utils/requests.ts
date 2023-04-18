import {EndPoint, ErrorMessageType} from "./types/requestTypes";

let requestHeaders = new Headers();
requestHeaders.append("Accept", "application/json");

function get(endpoint: EndPoint): Promise<Response> {
    return fetch(endpoint.url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).then((res) => {
        // console.log("[GET]: ", res);
        return handleResponse(res, endpoint.url);
    });
}

function post(endpoint: EndPoint, data: any) {
    console.log(data);
    return fetch(endpoint.url, {
        method: "POST",
        // @ts-ignore
        headers:{
            ...endpoint.contentType,
            Accept: "application/json",
            Authorization: null,
        },
        body: data,
    }).then((res) => {
        console.log("[POST]: ", res);
        return handleResponse(res, endpoint.url);
    });
}

async function handleResponse(response: Response, url: String) : Promise<any|ErrorMessageType> {
    console.log("[url] ", url, response.status)
    if (200 === response.status) {
        let data = await response.json();
        return Promise.resolve(data);
    } else {
        console.error(`Request failed. URL= ${url}`);
        return Promise.reject({
            code: response.status,
            message: "Request failed due to your network error, please try later.",
            error: "Request failed due to your network error, please try later.",
        });
    }
}

export {get, post};
