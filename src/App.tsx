// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { SidebarProvider } from "@/components/ui/sidebar";
import { KeycloackContextProvider } from "./keycloak";
import { Suspense, useEffect, useState } from "react";
import AppRoutes from "./routes";
// import "../src/styles/antInputStyle.css";
// import "../src/styles/antStyle.css";
// import "../src/styles/customInputStyle.css";
// import "../src/styles/transferlist.css";
import WebsiteLoader from "./components/websiteLoader";
// import "./App.css";
import Home from "./pages/home";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!window.location.pathname.includes(import.meta.env.VITE_INVENTORY_URL))
      window.location.replace(import.meta.env.VITE_INVENTORY_URL);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <KeycloackContextProvider>
      {/* <PropertiesContextProvider>
        <QueryClientProvider client={queryClient}> */}
      {/* <TooltipProvider>
        <Toaster />
        <Sonner /> */}
      {loading ? (
        <WebsiteLoader></WebsiteLoader>
      ) : (
        // <BrowserRouter basename={import.meta.env.VITE_INVENTORY_URL}>
        //   {/* <SidebarProvider> */}
        //   <AppRoutes />
        //   {/* </SidebarProvider> */}
        // </BrowserRouter>
        <Home />
      )}
      {/* </TooltipProvider> */}
      {/* </QueryClientProvider>
      </PropertiesContextProvider> */}
    </KeycloackContextProvider>
  );
};

export default App;
