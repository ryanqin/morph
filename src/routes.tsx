import React, { lazy, Suspense } from "react";
import LoadingScreen from "./utils/LoadingScreen";


const Loadable = (Component:any) => (props:any) =>
    (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    );


const MainLayout =  Loadable(lazy(() => import("./layout")));
const MorphHome = Loadable(lazy(()=>import("./pages/Morph")));


const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <MorphHome />,
            }
        ]
    }
]

export default routes;
