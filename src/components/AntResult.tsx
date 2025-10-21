import { Button, Empty, Result } from "antd";
const AntResult = ({ typeOfResult, onClick, redirectTitle }) => {
  return (
    <>
      {typeOfResult === "unauthorized" ? (
        <div style={{ width: "100%", height: "100%" }}>
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
              <Button
                aria-label="retry"
                type="primary"
                style={{ color: "#fff" }}
                onClick={() => onClick()}
              >
                {redirectTitle}
              </Button>
            }
          />
        </div>
      ) : typeOfResult === "notEmployee" ? (
        <Result
          status="403"
          title=""
          subTitle="Sorry, you are not eligible to use this feature."
        />
      ) : typeOfResult === "pagenotexist" ? (
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              aria-label="retry"
              type="primary"
              style={{
                // backgroundColor: ThemeData.secondary,
                borderRadius: "20px",
              }}
              onClick={() => onClick()}
            >
              {/* {FaHomeIcon()} */}
              {redirectTitle}
            </Button>
          }
        />
      ) : typeOfResult === "wrong" ? (
        <Result
          status="500"
          title="500"
          subTitle="Sorry, something went wrong."
          extra={
            <Button aria-label="retry" type="primary" onClick={() => onClick()}>
              {redirectTitle}
            </Button>
          }
        />
      ) : (
        typeOfResult === "datanotexist" && (
          <div style={{ textAlign: "center" }}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              styles={{ image: { height: 100 } }}
            />
          </div>
        )
      )}
    </>
  );
};

export default AntResult;
