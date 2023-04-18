import {useDispatch, useSelector} from "react-redux";
import {getAutomation, getThreshold} from "../../redux/modules/entities/automation";
import {bindActionCreators} from "redux";
import {actions as automationActions} from "../../redux/modules/automation";
import useMounted from "../useMounted";

const useAutomation = (action) => {
    const dispatch = useDispatch();
    const automationDispatcher = bindActionCreators(
        automationActions,
        dispatch
    );
    const mounted = useMounted();

    return {
        automationGetter: useSelector((state) => getAutomation(state)),
        thresholdGetter: useSelector((state) => getThreshold(state)),
    }
}

export default useAutomation;