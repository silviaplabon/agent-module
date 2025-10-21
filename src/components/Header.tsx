import {
  Menu,
  ChevronsRight,
  CircleChevronLeft,
  Sun,
  Moon,
} from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Menu as AntdMenu, Modal, Button } from "antd";
import { useLocation, useNavigate, useNavigationType } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { KeycloackContext } from "@/keycloak";

export function Header({ headerComponent }) {
  const { confirm } = Modal;
  const { search, pathname } = useLocation();
  const query = new URLSearchParams(search);
  const navigate = useNavigate();

  const { isMobile, state, openMobile, setOpenMobile, toggleSidebar } =
    useSidebar();

  const { themeData } = useContext(KeycloackContext);
  const breadCrumbReturn = () => {
    const pathParts = pathname?.split("/").filter(Boolean);
    const id = query.get("id")
      ? atob(decodeURIComponent(query.get("id")))
      : null;

    if (pathParts.length === 0) {
      return (
        <div className="text-lg">
          <span
            className="capitalize truncate inline-block"
            title={"Properties"}
            style={{ color: themeData === "dark" ? "#ffffff" : "#000000" }}
          >
            Properties
          </span>
        </div>
      );
    }
    return (
      <div className="flex  items-center gap-2 text-lg">
        {pathParts?.map((part, idx) => {
          const label =
            part === "details"
              ? "Lead Summary"
              : part === "unitImport"
              ? "Unit Import"
              : part === "uploadDoc"
              ? "Upload Documents"
              : part;
          return (
            <span
              key={idx}
              className="flex items-center gap-2" // constrain width
            >
              {/* text with ellipsis and hover-title */}
              <span
                className="capitalize truncate inline-block" // enable ellipsis
                title={label} // native tooltip
                style={{ color: themeData === "dark" ? "#ffffff" : "#000000" }}
              >
                {label}
              </span>

              {idx < pathParts.length - 1 && (
                <ChevronsRight className="w-5 h-5 text-gray-600" />
              )}
            </span>
          );
        })}
      </div>
    );
  };
  const SIDEBAR_WIDTH = "14rem";
  const SIDEBAR_WIDTH_MOBILE = "18rem";
  const SIDEBAR_WIDTH_ICON = "4.3rem";
  const contentWidth =
    state === "collapsed"
      ? `calc(100% - ${SIDEBAR_WIDTH_ICON})`
      : `calc(100% - ${SIDEBAR_WIDTH})`;

  return (
    <header
      className="h-16  px-4 md:px-6 lg:px-4 flex items-center justify-between fixed w-full z-10 border-b border-border"
      style={{ width: contentWidth, zIndex: 1000 }}
    >
      <div className="flex items-center gap-4 w-full justify-start">
        <SidebarTrigger className="md:hidden">
          <Menu className="w-5 h-5" />
        </SidebarTrigger>
        <SidebarTrigger className="hidden md:flex">
          <Menu className="w-5 h-5" />
        </SidebarTrigger>

        {pathname?.includes("details") ? (
          <Button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-[#000229] to-indigo-600 hover:from-[#000229] hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl text-[400px] p-2 h-auto"
          >
            <CircleChevronLeft size={30} className="" />
          </Button>
        ) : null}
        <h1 className="flex items-center text-2xl font-bold bg-gradient-to-r from-[#000229] to-indigo-800 bg-clip-text text-transparent capitalize">
          {breadCrumbReturn()}
        </h1>
        {headerComponent || ""}
      </div>

      <div className="flex items-center gap-4"></div>
    </header>
  );
}
