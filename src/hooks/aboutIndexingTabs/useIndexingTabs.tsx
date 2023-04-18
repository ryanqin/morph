import { useContext} from "react";
import IndexingTabsContext from "../../contexts/IndexingTabsContext";

const useIndexingTabs = () => useContext(IndexingTabsContext);

export default useIndexingTabs;
