import { KeycloackContext } from "@/keycloak";
import { Card, Col, Row } from "antd";
import { useContext } from "react";

const CardLoader = ({ isLoading }) => {
  const { themeData } = useContext(KeycloackContext);
  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Row gutter={[10, 20]} style={{ padding: "0px" }}>
        <Col xs={12}>
          <Card loading={isLoading} className="themeBackgroundColor "></Card>
        </Col>
        <Col xs={12}>
          <Card loading={isLoading} className="themeBackgroundColor "></Card>
        </Col>

        <Col xs={12}>
          <Card loading={isLoading} className="themeBackgroundColor "></Card>
        </Col>

        <Col xs={12}>
          <Card loading={isLoading} className="themeBackgroundColor "></Card>
        </Col>
      </Row>
    </div>
  );
};
export default CardLoader;
