import { FETCH_DATA, POST_DATA } from "../middlewares/api";
import {EndPoint} from "../../utils/types/requestTypes";

const dispatchAction:(method: string, types: string[], endpoint: EndPoint, schema: any, data?: any) => { [p: string]: { schema: any; types: string[]; endpoint: EndPoint; data: any } } | { [p: string]: { schema: any; types: string[]; endpoint: any } } = (method:string, types:string[], endpoint:EndPoint, schema:any, data = null)=> {
  if (![FETCH_DATA, POST_DATA].includes(method)) {
    throw new Error(`${method} is not supported!`);
  }
  if (method === POST_DATA && !data) {
    throw new Error(`${method}: request data is required!`);
  }

  return data
    ? {
        [method]: {
          types,
          endpoint,
          schema,
          data,
        },
      }
    : {
        [method]: {
          types,
          endpoint,
          schema,
        },
      };
};

export default dispatchAction;
