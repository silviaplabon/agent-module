import { Document, Font, Page, pdf, Text, View } from "@react-pdf/renderer";
import URBANISTREGULAR from "../assets/Urbanist-Regular.ttf";
import URBANISTBOLD from "../assets/Urbanist-SemiBold.ttf";
import { agreementSections, pdfFontFamily } from "@/utils/commonKeys";

// Utility to split text and mark quoted portions as bold
function splitAndMarkQuotes(text) {
  // Matches “quoted text” (U+201C and U+201D)
  const regex = /“([^”]+)”/g;
  let result = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    result.push({ text: `“${match[1]}”`, bold: true });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), bold: false });
  }
  return result;
}

// Recursive renderer for children, supports nested children and wraps naturally
const renderAgreementChildren = (children) =>
  children.map((child, idx) => (
    <View
      key={child.index || idx}
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 3,
        marginTop: 3,
      }}
      wrap={true}
    >
      {/* Index column */}
      <View style={{ width: 30 }}>
        {child.index && (
          <Text
            style={{
              fontFamily: pdfFontFamily.bold,
              fontSize: 10,
            }}
          >
            {child.index}
          </Text>
        )}
      </View>
      {/* Content column */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: pdfFontFamily.regular,
            fontSize: 10,
          }}
        >
          {splitAndMarkQuotes(child.text).map((part, i) => (
            <Text
              key={i}
              style={{
                fontFamily: part.bold
                  ? pdfFontFamily.bold
                  : pdfFontFamily.regular,
              }}
            >
              {part.text}
            </Text>
          ))}
        </Text>
        {/* Recursive rendering for nested children */}
        {child.children && child.children.length > 0 && (
          <View style={{ marginLeft: 20 }}>
            {renderAgreementChildren(child.children)}
          </View>
        )}
      </View>
    </View>
  ));

const AgreementPdf = () => {
  const loadFonts = async () => {
    Font.register({ family: "URBANISTREGULAR", src: URBANISTREGULAR });
    Font.register({ family: "URBANISTBOLD", src: URBANISTBOLD });
  };

  const DOWNLOAD_PDF = async () => {
    await loadFonts();
    const blob = await pdf(
      <Document title="Sales Offer">
        <Page size="A4" orientation="portrait" style={{ padding: 35 }}>
          {agreementSections.map((section) => (
            <View key={section.index} style={{ marginBottom: 10 }} wrap={true}>
              {section.index ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                    marginTop: 4,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: pdfFontFamily.bold,
                      fontSize: 11,
                      width: 30,
                    }}
                  >
                    {section.index}.
                  </Text>
                  <Text
                    style={{
                      fontFamily: pdfFontFamily.bold,
                      fontSize: 11,
                      flex: 1,
                    }}
                  >
                    {section.title}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    fontFamily: pdfFontFamily.bold,
                    fontSize: 11,
                    marginBottom: 4,
                    marginTop: 4,
                  }}
                >
                  {section.title}
                </Text>
              )}

              {renderAgreementChildren(section.children)}
            </View>
          ))}
        </Page>
      </Document>
    ).toBlob();

    // Download the PDF
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "agreement.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return <div onClick={() => DOWNLOAD_PDF()}>AgreementPdf Page</div>;
};

export default AgreementPdf;
