import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { KeycloackContext } from "./keycloak";

import AntResult from "./components/AntResult.tsx";
import WebsiteLoader from "./components/websiteLoader.tsx";
import Home from "./pages/home.tsx";
import LayoutAntd from "./components/LayoutAntd.tsx";

const AppRoutes = () => {
  const { keycloackValue, authenticated, userType } =
    useContext(KeycloackContext);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (keycloackValue) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [keycloackValue, authenticated]);

  return (
    <div className="overflow-hidden" >
      {keycloackValue && authenticated && userType ? (
        <Routes>
          <Route path="/" element={<LayoutAntd />}>
            <Route index element={<LayoutAntd/>} />

            {/* <Route path="setup/attribute" element={<AttributeSetup />} /> */}
            {/* <Route path="setup/bank" element={<BankSetup />} /> */}
          </Route>
          {/* <Route path="*" element={<NOTFOUND />} /> */}
        </Routes>
      ) : !loader && keycloackValue && !authenticated ? (
        <Routes>
          <Route
            path=""
            element={
              !loader &&
              !keycloackValue && (
                <AntResult
                  typeOfResult="unauthorized"
                  redirectTitle="Reload"
                  onClick={() => window.location.reload()}
                />
              )
            }
          />
        </Routes>
      ) : (
        <WebsiteLoader></WebsiteLoader>
      )}
    </div>
  );
};

export default AppRoutes;
