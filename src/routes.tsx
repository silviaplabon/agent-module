import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { KeycloackContext } from "./keycloak";

import AntResult from "./components/AntResult.tsx";
import WebsiteLoader from "./components/websiteLoader.tsx";
import Home from "./pages/home.tsx";

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
    <div className="overflow-hidden">
      {keycloackValue && authenticated && userType ? (
        <Routes>
          <Route path="/" element={<></>}>
            <Route index element={<Home />} />
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
