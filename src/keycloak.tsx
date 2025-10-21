/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";

// KEYCLOACK
import Keycloak from "keycloak-js";
import { Activity, Mail, Phone, Repeat, Telescope, Users } from "lucide-react";

const KeycloackContext = createContext({});

const keycloak = new Keycloak({
  realm: import.meta.env.VITE_REALM,
  url: import.meta.env.VITE_KEYCLOAK_BASE_URL,
  clientId: import.meta.env.VITE_INVENTORY_CLIENT_ID,
});

const KeycloackContextProvider = (props) => {
  const [keycloackValue, setKeycloackValue] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [roleName, setRoleName] = useState(null);
  const [roles, setRoles] = useState(null);
  const [realmRoles, setrealmRoles] = useState([]);
  const [activeGroup, setactiveGroup] = useState([]);
  const [headers, setheaders] = useState({});
  const groups = [
    "jad:crm:sales-admin",
    "jad:crm:property-consultant",
    "jad:crm:inv-read-only",
  ];
  const [userType, setUserType] = useState("");
  const [themeData, setThemeData] = useState("light");
  const compactFormatter = useMemo(() => {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    });
  }, []);
  const getInteractionIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "call":
        return <Phone className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "face2face":
        return <Users className="w-4 h-4" />;
      case "follow-up":
        return <Repeat className="w-4 h-4" />;
      case "site visit":
        return <Telescope className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };
  const getInitials = (fullName: string) => {
    const parts = fullName?.trim().split(/\s+/).filter(Boolean);
    if (!parts || parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const setKeycloack = () => {
    keycloak
      .init({
        onLoad: "login-required",
      })
      .then(async (authenticated) => {
        setInterval(() => {
          keycloak
            .updateToken(70)
            .then((refreshed) => {
              // if (refreshed) {
              //   console.log("Token refreshed");
              // } else {
              //   console.log("Token not refreshed, or not needed");
              // }
            })
            .catch((error) => {
              console.error("Error refreshing token:", error);
            });
        }, 60000);

        setKeycloackValue(keycloak);
        setAuthenticated(authenticated);
        setLoggedIn(!!keycloak?.token);
        setheaders({
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "application/json",
        });
        setUsername(keycloak?.idTokenParsed?.preferred_username);

        setrealmRoles(keycloak?.realmAccess?.roles);
        if (keycloak?.realmAccess?.roles?.length > 0) {
          const temparr = [];
          groups.map((rec) => {
            if (keycloak.realmAccess.roles.includes(rec)) {
              temparr.push(rec);
            }
          });
          setactiveGroup(temparr);
        }
        const roles = (keycloak.realmAccess.roles || []).map((r) =>
          r.toLowerCase()
        );

        if (roles.includes("jad:crm:sales-admin")) {
          setUserType("Admin");
        } else if (roles.includes("jad:crm:inv-read-only")) {
          setUserType("VIEWER");
        } else {
          setUserType("Unauthorized");
        }
        setRoleName(
          keycloak?.tokenParsed?.resource_access[
            import.meta.env.VITE_TR_CLIENT_ID
          ]?.roles?.[0]
        );
        setRoles(
          keycloak?.tokenParsed?.resource_access[
            import.meta.env.VITE_TR_CLIENT_ID
          ]?.roles
        );
      })
      .catch((error) => {
        setUserType("Unauthorized");
        console.log("keycloack error=>", error);
      });
  };
  function isTokenExpired() {
    const { token } = keycloak;
    const { exp } = keycloak.tokenParsed;
    return !token || exp * 1000 < new Date().getTime();
  }
  const handleTokenRefresh = async () => {
    try {
      await keycloak.updateToken(5); // 5 seconds grace period
      // You can now use the updated token to make API calls
      // const updatedToken = keycloak.token;
      setLoggedIn(!!keycloak.token);
      return keycloak.token;
    } catch (error) {
      console.log("Token refresh error:", error);
    }
  };
  const getToken = () => {
    return new Promise((resolve, reject) => {
      if (isTokenExpired()) {
        const updatedToken = handleTokenRefresh();
        resolve(updatedToken);
      } else resolve(keycloak.token);
    });
  };
  const logout = () => {
    const encodedURL = window.location.href.includes("localhost:8082")
      ? `http://localhost:8082${import.meta.env.VITE_INVENTORY_URL}`
      : encodeURIComponent(
          import.meta.env.NODE_ENV === "production"
            ? `${import.meta.env.VITE_BASE_URL}${
                import.meta.env.VITE_INVENTORY_URL
              }`
            : `${import.meta.env.VITE_BASE_URL}${
                import.meta.env.VITE_INVENTORY_URL
              }`
        );
    const url =
      `${import.meta.env.VITE_KEYCLOAK_BASE_URL}realms/${
        import.meta.env.VITE_REALM
      }/protocol/openid-connect/logout?client_id=${
        import.meta.env.VITE_INVENTORY_CLIENT_ID
      }&post_logout_redirect_uri=` +
      encodedURL +
      "&id_token_hint=" +
      keycloak.idToken;

    try {
      localStorage.removeItem("inventoriesUnits");
      localStorage.removeItem("UnitPropertyinventoriesUnits");
      localStorage.removeItem("UnitTowerinventoriesUnits");
      localStorage.removeItem("ReleaseUnits");
      localStorage.removeItem("towers");
      window.location.href = url;
      setKeycloack();
      localStorage.clear();
      setAuthenticated(false);
      setUsername(null);
      setLoggedIn(null);
      setRoleName(null);
      setrealmRoles([]);
      setRoles(null);
      localStorage.removeItem("TRPerformerSearchObj");
      localStorage.clear();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  useEffect(() => {
    setKeycloack();
  }, []);

  return (
    <KeycloackContext.Provider
      value={{
        keycloackValue,
        authenticated,
        username,
        loggedIn,
        roleName,
        activeGroup,
        logout,
        getToken,
        roles,
        realmRoles,
        headers,
        compactFormatter,
        getInitials,
        userType,
        setUserType,
        themeData,
        setThemeData,
        getInteractionIcon,
      }}
    >
      {props["children"]}
    </KeycloackContext.Provider>
  );
};

export { KeycloackContextProvider, KeycloackContext };
export const useKeycloackContext = () => useContext(KeycloackContext);
