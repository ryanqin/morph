import {useEffect, useRef, useState, useCallback} from "react";

export function useInterval(callback, delay){
    const savedCallback = useRef();
    let id = null;

    const [runFlag, setRunFlag] = useState(false);

    const isRunningInterval =  useCallback(()=>{
        if(runFlag) savedCallback.current = callback;
        else {
            savedCallback.current = null;
            clearInterval(id);
        }
    }, [runFlag])

    useEffect(()=>{
        isRunningInterval();
    }, [runFlag])

    useEffect(()=>{
        if(runFlag) savedCallback.current = callback;
    }, [callback]);

    useEffect(()=>{
        if(delay !== null && savedCallback.current !== null){
            id = setInterval(()=>savedCallback.current(), delay);
            return()=>{
                clearInterval(id);
            }
        }
    }, [callback, delay])

    return {setRunFlag}
}