import { Modal, Spin } from "antd";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React, { useEffect, useState } from "react";
import AntResult from "./AntResult.js";
import "../styles/antUpload.css";

const DocumentViewModal = ({
  isFileLoading,
  filePreviewDetails,
  isPdfViewMaximized,
  handleCancelModal,
  isFileModalOpened,
}) => {
  const [filePreviewUrl, setFilePreviewUrl] = useState();

  useEffect(() => {
    if (filePreviewDetails) {
      setFilePreviewUrl(filePreviewDetails?.documentUrl);
    }
  }, [filePreviewDetails]);

  return (
    <Modal
      open={isFileModalOpened} // ✅ updated from `visible` to `open` (AntD v5)
      onCancel={handleCancelModal}
      footer={null}
      width={600}
      title="Document Preview"
      className="maximizedPdfModal"
    >
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "85vh",
          minHeight: "70vh",
        }}
      >
        <div
          className="reactPdfContainer"
          style={{
            width: "100%",
            height: isFileLoading
              ? "50vh"
              : !filePreviewUrl
              ? "20vh"
              : isPdfViewMaximized
              ? "85vh"
              : "70vh",
          }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            {isFileLoading ? (
              <div className="loaderContainer" style={{ height: "50vh" }}>
                <Spin tip="Loading preview..." size="large" />
              </div>
            ) : filePreviewUrl ? (
              <DocViewer
                style={{ width: "100%", height: "100%" }}
                pluginRenderers={DocViewerRenderers}
                config={{
                  header: { disableHeader: true },
                  csvDelimiter: ",",
                  pdfZoom: {
                    defaultZoom: 0.85,
                    zoomJump: 0.2,
                  },
                  language: "en",
                  pdfVerticalScrollByDefault: true,
                  // ✅ removed custom noRenderer to avoid duplicate text
                }}
                documents={[
                  {
                    uri: filePreviewUrl,
                    fileName:
                      filePreviewDetails?.fileName ||
                      "Resignation Or Termination Letter",
                    fileType: filePreviewDetails?.fileType,
                  },
                ]}
              />
            ) : (
              <AntResult typeOfResult="datanotexist" imageHeight={50} />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(DocumentViewModal);
