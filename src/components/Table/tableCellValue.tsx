import { FormatDate } from "@/utils/common";
import React from "react";

const TableCellValue = ({
  isLink,
  index,
  value,
  onClick,
  formatType,
  style,
  isNavigateLink,
  overwriteTitle,
  customClassName
}) => {
  const formattedValue = value
    ? formatType?.includes("Date")
      ? FormatDate(value, formatType)
      : value
    : "-";

  return (
    <div
      className={`ellipsisItemText ${
        isLink ? "customTableLink" : "customTableText"
      } ${isNavigateLink ? "customTableNavigateLink" : ""} ${customClassName}`}
      onClick={isLink ? onClick : undefined}
      key={index}
      title={overwriteTitle? overwriteTitle : formattedValue}
      style={{ ...style, textDecoration: isNavigateLink ? "underline" : "" }}
    >
      {formattedValue}
    </div>
  );
};

export default React.memo(TableCellValue);
