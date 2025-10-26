import { FontFamily } from "@/utils/common";
import { Col, Row, Typography } from "antd";
import React from "react";

const CustomLabelAndValueContainer = ({
  title,
  value,
  gridSize = {
    childrenGridSize: 5,
    inputGridSize: 8,
    titleGridSize: 6,
    lgTitleGridSize: 6,
    lgInputGridSize: 18,
  },
  isVerticalItem,
  isFirstItem,

  identifier,
  isWithEllipsis,

  valueStyle,
  handleOnClick,
  style,
  titleStyle,
}) => {
  const containerClass = `${isVerticalItem && isFirstItem ? "mt-3" : "mt-0"}`;

  return (
    <Col
      xs={24}
      md={gridSize?.inputGridSize}
      className={containerClass}
      style={{
        paddingTop: isVerticalItem ? "0rem" : "0.1rem",
        ...style,
      }}
      key={identifier || title}
    >
      <Row gutter={[5, 2]}>
        <Col
          xs={
            isVerticalItem
              ? 24
              : gridSize?.titleGridSize
              ? gridSize?.titleGridSize
              : 10
          }
          md={
            isVerticalItem
              ? 24
              : gridSize?.titleGridSize
              ? gridSize?.titleGridSize
              : 8
          }
          className="flex items-start"
        >
          <Typography
            className={`text-black text-[14px] font-semibold mt-0 ${
              isVerticalItem ? "pt-0" : ""
            }`}
            style={{
              fontFamily: FontFamily,
              fontSize: "14px",
              fontWeight: 600,
              marginTop: "0px",
              paddingTop: isVerticalItem ? "0px!important" : "",
              ...titleStyle,
            }}
          >
            {title}
          </Typography>
        </Col>
        <Col
          xs={
            isVerticalItem
              ? 24
              : gridSize?.titleGridSize
              ? 24 - gridSize?.titleGridSize
              : 14
          }
          md={
            isVerticalItem
              ? 24
              : gridSize?.titleGridSize
              ? 24 - gridSize?.titleGridSize
              : 16
          }
          className="mt-[1px]"
        >
          <Typography
            className={`text-black text-[14px] font-normal bg-white cursor-auto min-h-[27px] p-[5px] rounded-[10px] ${
              isWithEllipsis ? "ellipsisItemText" : ""
            }`}
            style={{
              fontFamily: FontFamily,
              fontSize: "14px",
              fontWeight: 400,
              marginTop: "0px",
              backgroundColor: "white",
              cursor: typeof handleOnClick === "function" ? "pointer" : "",
              ...valueStyle,
            }}
            onClick={() => {
              if (typeof handleOnClick === "function") {
                handleOnClick();
              }
            }}
            title={typeof value != "object" ? value : "-"}
          >
            {value || "-"}
          </Typography>
        </Col>
      </Row>
    </Col>
  );
};
export default React.memo(CustomLabelAndValueContainer);
