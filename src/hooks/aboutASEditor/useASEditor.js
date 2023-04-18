import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {
    actions,getAsEditorCurrentTab
} from "../../redux/modules/asEditor";
import {getAsEditor} from "../../redux/modules/entities/asEditor";


const useASEditor = (action) => {
    const dispatch = useDispatch();

    const asEditorDispatcher = bindActionCreators(
        actions,
        dispatch
    );

    return {
        asEditorTabSwitcher: async (tab) => await asEditorDispatcher.asEditorTabSwitch(tab),
        asEditorCodeUpdater:  async (value, tab) => await asEditorDispatcher.asEditorCodeUpdate(value, tab),
        asEditorCurrentTabGetter: useSelector((state) => getAsEditorCurrentTab(state)),
        asEditorGetter:useSelector((state) => getAsEditor(state))
    }
}

export default useASEditor;