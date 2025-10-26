import { FontFamily } from "@/utils/common";
import React from "react";

const CustomInputFieldContainer = ({
  title,
  isMandatory = true,
  children,
  gridSize = {
    childrenGridSize: 24,
    inputGridSize: 12,
    titleGridSize: 24,
    lgTitleGridSize: 24,
    lgInputGridSize: 12,
  },
}) => {
  return (
    <div
      className={`w-full ${!title ? "flex items-center" : ""} pl-0 mb-0 pt-0`}
    >
      <div className="w-full flex flex-col md:flex-row">
        {title && (
          <div className="flex items-center mr-2 mb-2 h-3">
            <span className="mr-1 -ml-1">
              {isMandatory && <span className="text-red-500"> *</span>}
            </span>
            <span
              className="text-[14px] font-semibold"
              style={{ fontFamily: FontFamily }}
            >
              {title}
            </span>
          </div>
        )}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default React.memo(CustomInputFieldContainer);
