import { ThemeData } from "@/utils/common";
import { Typography } from "antd";
import dayjs from "dayjs";
import { ExternalLinkIcon } from "lucide-react";

export const DateItem = ({ icon, date, label }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginLeft: "-3px",
    }}
  >
    <div style={{ marginTop: "0.3rem", marginRight: "0.3rem" }}>{icon}</div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography style={{ height: "15px", fontWeight: 500 }}>
        {date ? dayjs(date, "DD-MM-YYYY").format("DD-MMM-YYYY") : ""}
      </Typography>
      {label && (
        <Typography
          style={{ color: "gray", fontWeight: 400, fontSize: "11px" }}
        >
          {label}
        </Typography>
      )}
    </div>
  </div>
);

export const StatusBadge = ({ status, fontFamily, isBackground }) => (
  <div
    className="customButton"
    style={{
      padding: "5px 10px",
      display: "flex",
      alignItems: "center",
      color: "#000000",
    }}
  >
    <Typography
      style={{
        font: `normal normal 500 13px ${fontFamily}`,
        color: "#000000",
      }}
    >
      {status}
    </Typography>
  </div>
);

export const RangeValue = ({ label, min, max, unit }) => (
  <div className="flex">
    <Typography style={{ fontWeight: 500, fontSize: "13px" }}>
      <span style={{ color: "gray" }}>{label}: </span>
      {min?.toLocaleString() || "?"} - {max?.toLocaleString() || "?"}
    </Typography>
    {unit && (
      <Typography style={{ marginLeft: "0.5rem", fontSize: "13px" }}>
        {unit}
      </Typography>
    )}
  </div>
);

export const CardMapOrBuildingItem = ({
  icon,
  value1,
  value2,
  handleOnClick,
  isLink,
}) => (
  <div style={{ display: "flex" }}>
    <div style={{}}>
      <div className="flex">
        <Typography
          style={{
            fontWeight: 500,
            fontSize: "13px",
          }}
        >
          {value1}
        </Typography>
        {icon}
      </div>
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          // padding: "5px 0px",
        }}
      >
        <Typography
          style={{
            marginRight: "0.5rem",
            fontWeight: isLink ? 500 : 400,
            lineHeight: 1,
            color: !isLink ? "gray" : "",
            fontSize: "11px",
          }}
        >
          {value2}
        </Typography>
        {isLink && (
          <div style={{ cursor: "pointer" }}>
            <ExternalLinkIcon
              onClick={handleOnClick}
              className="w-4 h-4"
              color="blue"
            />
          </div>
        )}
      </div>
    </div>
  </div>
);
