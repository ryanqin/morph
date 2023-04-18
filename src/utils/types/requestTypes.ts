export type EndPoint =  {
    url: string;
    isProtected: boolean;
    contentType?: {};
}

export type SuccessResponseMessageType = {
    type: string;
    message: string;
    response: any
}

export type ErrorMessageType = {
    code: Number;
    message: string;
    error: string
}