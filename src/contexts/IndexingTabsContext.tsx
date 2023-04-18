import {createContext, ReactNode, useEffect, useMemo, useState} from "react";

export const TABS = {
    OVERVIEW: "OVERVIEW",
    ZKGRAPH: "ZKGRAPH",
    BOUNTY: "BOUNTY",
    AUTOMATION: "AUTOMATION"
}

const tabs = [
    { label: "Overview", value: TABS.OVERVIEW, name: TABS.OVERVIEW, index: 0},
    { label: "ZkGraph", value: TABS.ZKGRAPH, name: TABS.ZKGRAPH, index: 1},
    { label: "Bounty", value: TABS.BOUNTY, name: TABS.BOUNTY, index: 2},
    { label: "Automation", value: TABS.AUTOMATION, name: TABS.AUTOMATION, index: 3}
];

const IndexingTabsContext = createContext({
    tabs,
    currentTab: TABS.OVERVIEW,
    setCurrentTab: () => {},
});

type IndexingTabsProviderProps = {
    children: ReactNode | undefined
}

export const IndexingTabsProvider = (props: IndexingTabsProviderProps) => {
    const { children } = props;
    const [currentTab, setCurrentTab] = useState(TABS.OVERVIEW);
    const value = useMemo(
        () => ({ tabs, currentTab, setCurrentTab }),
        [currentTab]
    );
    useEffect(() => {
        setCurrentTab(TABS.OVERVIEW);
    }, []);

    return (
        // @ts-ignore
        <IndexingTabsContext.Provider value={value}>
            {children}
        </IndexingTabsContext.Provider>
    );
};

export default IndexingTabsContext;
