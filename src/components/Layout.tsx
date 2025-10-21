import { Outlet } from "react-router-dom";
import { Suspense, useContext } from "react";
// import { LightBackground, ThemeData } from "@/utils/common";
import { Spin } from "antd";
import WebsiteLoader from "./websiteLoader";
import { KeycloackContext } from "@/keycloak";

const Layout = () => {
  // const { themeData } = useContext(KeycloackContext);

  return (
    <>
      {/* <AppSidebar /> */}
      <main
        className="flex-1 flex flex-col h-screen w-full overflow-auto"
        style={
          {
            // backgroundColor:
            // themeData === "dark" ? ThemeData.primary : LightBackground,
            // color: themeData === "dark" ? "#fff" : "#000000",
          }
        }
      >
        <div className="flex-1 ">
          <Suspense
            fallback={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <WebsiteLoader></WebsiteLoader>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};

export default Layout;
