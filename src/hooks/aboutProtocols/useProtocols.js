import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions as protocolsAction,
} from "../../redux/modules/protocols";
import {useEffect} from "react";
import protocols from "../../protocols";
import useMounted from "../useMounted";
import {getProtocolBasicById, getProtocolIds} from "../../redux/modules/entities/protocols";
import {FETCH_DATA} from "../../redux/middlewares/api";

const useProtocols = (action) => {
    const mounted = useMounted();
    const dispatch = useDispatch();

    const protocolsDispatcher = bindActionCreators(
        protocolsAction,
        dispatch
    );

    useEffect(()=>{
        if (mounted.current && action === FETCH_DATA) protocolsDispatcher.configProtocolData(protocols)
    }, [mounted])

    return {
        getProtocolIds: useSelector((state) => getProtocolIds(state)),
        protocolBasicByIdGetter:useSelector((state) => (id)=> getProtocolBasicById(state, id))
    }
}

export default useProtocols;