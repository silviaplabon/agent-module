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
  return (
    <Col
      xs={24}
      md={gridSize?.inputGridSize}
      style={{
        marginTop: isVerticalItem && isFirstItem ? "11px" : "0px!important",
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
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Typography
            style={{
              font: `normal normal 700 14x ${FontFamily}`,
              color: "#000",
              fontSize: "14px",
              fontWeight: 600,
              marginTop: "0px",
              paddingTop: isVerticalItem ? "0px!important" : "",
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
          style={{ marginTop: "1px" }}
        >
          <Typography
            style={{
              font: `normal normal normal 12px ${FontFamily}`,
              color: "#000",
              fontSize: "14px",
              fontWeight: 400,
              marginTop: "0px",
              backgroundColor: "white",
              cursor: typeof handleOnClick === "function" ? "pointer" : "",
              ...valueStyle,
              minHeight: "27px",
              padding: "5px",
              borderRadius: "10px",
              ...titleStyle,
            }}
            className={isWithEllipsis ? "ellipsisItemText" : ""}
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
