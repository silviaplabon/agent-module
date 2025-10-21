import { FontFamily } from "@/utils/common";
import { Col, Row, Typography } from "antd";
import React from "react";
const CustomInputFieldContainer = ({
  title,
  isMandatory = true,
  children,
  style,
  colStyle,
  titleStyle,
  gridSize = {
    childrenGridSize: 24,
    inputGridSize: 12,
    titleGridSize: 24,
    lgTitleGridSize: 24,
    lgInputGridSize: 12,
  },
}) => {
  return (
    <>
      <Col
        xs={24}
        md={gridSize?.inputGridSize}
        style={{
          paddingTop: "0px!important",
          marginBottom: "0px!important",
          display: !title ? "flex" : "",
          alignItems: !title ? "center" : "",
          paddingLeft: "0px",
          ...colStyle,
        }}
      >
        <Row>
          {" "}
          <Col xs={gridSize?.titleGridSize}>
            {title && (
              <Typography
                style={{
                  marginRight: "0.5rem",
                  font: `normal normal 600 14px ${FontFamily}`,
                  fontSize: "14px",
                  marginBottom: "10px",
                  height: "0.8rem",
                  fontWeight: 600,
                  ...style,
                  ...titleStyle,
                }}
                className="labelText"
              >
                <span style={{ marginRight: "0.3rem", marginLeft: "-0.2rem" }}>
                  {" "}
                  {isMandatory && <span style={{ color: "red" }}> *</span>}
                </span>
                {title}
              </Typography>
            )}
          </Col>
          <Col
            xs={
              gridSize?.childrenGridSize
                ? gridSize?.childrenGridSize
                : 24 - gridSize?.titleGridSize
            }
          >
            {children}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default React.memo(CustomInputFieldContainer);
