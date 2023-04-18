import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators} from "redux";
import {useEffect} from "react";
import { actions as ethStatusActions } from "../../redux/modules/ethStatus";
import { FETCH_DATA} from "../../redux/middlewares/api";
import {getEthStatus} from "../../redux/modules/entities/ethStatus";

const useEthStatus = (action:string="", zkgid:string="", protocolType: string="") => {
    const dispatch = useDispatch();
    const ethStatusDispatcher = bindActionCreators(
        ethStatusActions,
        dispatch
    );

    let timer:NodeJS.Timeout | undefined = undefined
    const fetchEthStatus = (zkgid:string, protocolType:string) => {
        ethStatusDispatcher.loadEthStatus(zkgid, protocolType);
        timer = setInterval(async() => {
            await ethStatusDispatcher.loadEthStatus(zkgid, protocolType);
        }, 12000)
    }

    useEffect(() => {
        if ( action === FETCH_DATA) {
            fetchEthStatus(zkgid, protocolType);
        }

        return () => {clearTimeout(timer)}
    }, []);

    return {ethStatusData: useSelector((state) => getEthStatus(state))};
}

export default useEthStatus;