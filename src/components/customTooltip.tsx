/* eslint-disable react/prop-types */
import { FontFamily } from "@/utils/common";
import { Tooltip } from "antd";

const CustomTooltip = ({ title, children, placement }) => {
  return (
    <>
      {title && title !== "" ? (
        <Tooltip
          title={
            <div style={{ font: `normal normal 400 12px ${FontFamily}` }}>
              {title}
            </div>
          }
          color={"#ffffff"}
          placement={placement}
          key={title}
        >
          {children}
        </Tooltip>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default CustomTooltip;
