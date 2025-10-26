import { MenuProps, message } from "antd";
import dayjs from "dayjs";
import {
  BadgePercent,
  Home,
  Kanban,
  Settings,
  ShieldAlert,
  SquareStack,
  Users,
} from "lucide-react";
import inizovaImage from "../assets/react.svg";
import jadGlobalImage from "../assets/react.svg";
import { Link } from "react-router-dom";
//Changing Company URL
export const SelectedCompanyIndex = 1;

export const CONSTANTS = {
  INVENTORIESUNITS: "inventoriesUnits",
  TOWERS: "towers",
};
export const ThemeData = {
  primary: "#394551",
  secondary: "#000000",
};
export const LightBackground = "#fcfcfc";
export const borderColor = "#b7b7b7";
export const borderWidth = 0.9;
export const headerWidth = 33.333333;
export const childrenWidth = 16.666667;

export const UnitBulkUploadExcelHeaderKeys = {
  "Unit Number": "unitNumber",
  "Property Name": "propertyName",
  "Tower Name": "towerName",
  Floor: "floorNumber",
  Prototype: "unitPrototype",
  "Unit Type": "unitType",
  View: "unitView",
  "Internal Area\nsq.ft.": "internalArea",
  "Balcony\nsq.ft.": "balconyArea",
  "Total Area sq.ft.": "sellableArea",
  Parking: "parking",
  "Price per sq.ft.": "psf",
  "Sales Value": "basePrice",
  "Space Type": "spaceType",
  Category: "unitCategory",
};
export const ReversedUnitBulkUploadExcelHeaderKeys = Object.fromEntries(
  Object.entries(UnitBulkUploadExcelHeaderKeys).map(([key, value]) => [
    value?.trim(),
    key?.trim(),
  ])
);

export const SalesOfferPdfKeys = {
  headers: [
    { text: "Project", key: "projectName", width: `${headerWidth - 2}%` },
    {
      text: "Unit Number",
      key: "unitNumber",
      width: `${headerWidth + 4}%`,
    },
    {
      text: "Estimated Completion Date",
      key: "estCompDate",
      width: `${headerWidth - 2}%`,
    },
  ],

  headerChildren: [
    { text: "Property", key: "spaceType", width: `${(headerWidth - 2) / 2}%` },
    {
      text: "Type",
      key: "unitType",
      width: `${(headerWidth - 2) / 2}%`,
    },
    {
      text: "Property Status",
      key: "constructionStatus",
      width: `${(headerWidth + 4) / 2}%`,
    },
    {
      text: "Total Area (SQ. FT.)",
      key: "sellableArea",
      width: `${(headerWidth + 4) / 2}%`,
    },
    {
      text: "Selling Price",
      key: "sellingPrice",
      width: `${headerWidth - 2}%`,
    },
  ],
  prePaymentColumns: [
    { text: "Payment Schedule", key: "", width: "25%" },
    { text: "Purchase Price:", key: "", width: "40%" },
    { text: "", key: "sellingPrice", width: "35%" },
  ],

  paymentColumns: [
    { text: "Installment", key: "installment", width: "20%" },
    { text: "%", key: "payPercent", width: "5%" },
    { text: "Due Terms", key: "paymentDescription", width: "28%" },
    { text: "Due Date", key: "dueDate", width: "12%" },
    { text: "Amount Payable", key: "payAmount", width: "17%" },
    { text: "Account", key: "paymentAccount", width: "18%" },
  ],
};
// {
//   "accountId": "01K3RWVPQW061PV75XXHKTAWWY",
//   "accountNumber": "001582116499101",
//   "bankName": "Dubai Islamic Bank",
//   "bankBranch": "Dubai",
//   "city": "Dubai",
//   "countryCode": "AE",
//   "countryName": "United Arab Emirates",
//   "bankAttributes": {
//     "address": "Dubai, UAE",
//     "currency": "UAE Dirham",
//     "swiftCode": "DUIBAEAD",
//     "ibanNumber": "AE900240097524407138001",
//     "accountName": "JAD GLOBAL REAL ESTATE DEVELOPMENT L L C"
//   },
//   "updatedAt": "04-10-2025",
//   "updatedBy": "silvia@mail.com"
// }
export const BankKeysTitle = {
  amount: "Amount To Deposit",
  accountName: "Account Name",
  bankName: "Bank Name",
  accountNumber: "Account Number",
  ibanNumber: "IBAN Number",
  swiftCode: "Swift Code",
  currency: "Currency",
  address: "Address",
};
export const MimeTypes = {
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/msword": "doc",
  "text/plain": "txt",
  "text/csv": "csv",
  "image/jpeg": "jpg",
  "image/png": "png",
};
export const UOMLabel = {
  Y: "Years",
  M: "Months",
  D: "Days",
  // { value: "Date", label: "Date" },
};
export const pdfFontFamily = {
  bold: "URBANISTBOLD",
  regular: "URBANISTREGULAR",
};

export const FontFamily =
  'Montserrat, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji"';

export const CompaniesLogoList = [inizovaImage, jadGlobalImage];
export const inputFieldCommonParams = {
  isRequired: true,
  isModalField: true,
  isWithController: true,
  isEditable: true,
  hideErrorMessageContainer: true,
};

export const gridSize = {
  childrenGridSize: 24,
  inputGridSize: 12,
  titleGridSize: 24,
  lgTitleGridSize: 24,
  lgInputGridSize: 12,
};

export const StatusColors = (stat: string) => {
  let color = "bg-gradient-to-r from-indigo-800 to-blue-600";
  switch (stat) {
    case "New":
      color = "bg-gradient-to-r from-indigo-800 to-blue-600";
      break;
    case "List":
      color = "bg-gradient-to-r from-[#000229] to-indigo-500";
      break;
    case "Assigned":
      color = "bg-gradient-to-r from-green-500 to-teal-500";
      break;
    case "Board":
      color = "bg-gradient-to-r from-green-500 to-teal-500";
      break;
    case "Converted":
      color = "bg-gradient-to-r from-yellow-500 to-orange-500";
      break;
    case "Duplicate":
      color = "bg-gradient-to-r from-yellow-500 to-orange-500";
      break;
    case "Not A Lead":
      color = "bg-gradient-to-r from-purple-500 to-pink-500";
      break;
    case "Error":
      color = "bg-gradient-to-r from-red-500 to-pink-500";
      break;
    case "Errors":
      color = "bg-gradient-to-r from-red-500 to-pink-500";
      break;
    case "Won":
      color = "bg-green-400 text-green-400-foreground";
      break;
    case "Lost":
      color = "bg-destructive text-destructive-foreground";
      break;
  }
  return color;
};

export const FormatDate = (date, includeHM) => {
  return date
    ? includeHM === "Date"
      ? dayjs(date, "DD-MM-YYYY")?.format("DD-MMM-YYYY")
      : dayjs(date, "DD-MM-YYYY hh:mm")?.format("DD-MMM-YYYY hh:mm A")
    : "-";
};
export const TabsData = [
  { key: "board", value: "Board", icon: <Kanban className="w-5 h-5" /> },
  {
    key: "duplicate",
    value: "Duplicate",
    icon: <SquareStack className="w-5 h-5" />,
  },
  {
    key: "errors",
    value: "Errors",
    icon: <ShieldAlert className="w-5 h-5" />,
  },
];
export const StatusOrder = [
  "New",
  "Assigned",
  "Converted",
  "Not A Lead",
  "Merged",
  "Error",
];

export const eventGroupLabel = {
  D: "Down Payment",
  I: "Installment",
  O: "Others",
};
export const PropertyTypeLov = [
  { label: "Residential", value: "RESIDENTIAL" },
  { label: "Commercial", value: "COMMERCIAL" },
  { value: "Mixed", label: "MIXED" },
];
export const SpaceTypeLov = [
  { label: "RESIDENTIAL", value: "RESIDENTIAL" },
  { label: "COMMERCIAL", value: "COMMERCIAL" },
];
export const PaymentLines = [];

export const items: MenuProps["items"] = [
  {
    key: "2",
    label: (
      <Link to={"/leads"} className="flex items-center gap-3">
        <Users
          className={`transition-transform duration-300 group-hover:scale-110 `}
        />
        <span
          className="font-base"
          style={{ font: `normal normal 500 14px ${FontFamily}` }}
        >
          {"Leads"}
        </span>
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link to={"/inventories"} className="flex items-center gap-3">
        <Kanban
          className={` transition-transform duration-300 group-hover:scale-110 `}
        />
        <span
          className="font-base"
          style={{ font: `normal normal 500 14px ${FontFamily}` }}
        >
          {"Inventories"}
        </span>
      </Link>
    ),
  },
  {
    key: "4",
    label: (
      <Link to={"/bookings"} className="flex items-center gap-3">
        <BadgePercent
          className={` transition-transform duration-300 group-hover:scale-110 `}
        />
        <span
          className="font-base"
          style={{ font: `normal normal 500 14px ${FontFamily}` }}
        >
          {"Bookings"}
        </span>
      </Link>
    ),
  },
  {
    key: "5",
    label: (
      <Link to={"/setup"} className="flex items-center gap-3">
        <Settings
          className={` transition-transform duration-300 group-hover:scale-110 `}
        />
        <span
          className="font-base"
          style={{ font: `normal normal 500 14px ${FontFamily}` }}
        >
          {"Setup"}
        </span>
      </Link>
    ),
  },
];
export const FloorLabel = { N: "Normal", P: "Podium", M: "Basement" };

export const TabsDataInventories = [
  { key: "board", value: "Board", icon: <Kanban className="w-5 h-5" /> },
  {
    key: "list",
    value: "List",
    icon: <SquareStack className="w-5 h-5" />,
  },
];

export const PaymentLinkingKeys = {
  propertyId: {
    name: "propertyName",
    codeKey: "propertyId",
    labelName: "Property",
    inputType: "Text",
    placeholder: "property",
    isRequired: false,
  },
  towerId: {
    name: "towerName",
    codeKey: "towerId",
    labelName: "Tower",
    inputType: "Text",
    placeholder: "Tower",
    isRequired: false,
  },
  unitId: {
    name: "unitName",
    codeKey: "unitId",
    labelName: "Unit",
    inputType: "Text",
    placeholder: "Unit",
    isRequired: false,
  },
};
export const DemoKey = {
  name: {
    name: "userName",
    labelName: "Full Name",
    inputType: "Text",
    placeholder: "Full Name",
    isRequired: true,
  },
  email: {
    name: "email",
    labelName: "Email",
    inputType: "Text",
    placeholder: "Full Name",
    logo: (
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 16"
      >
        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
      </svg>
    ),
    addonBeforeType: "AreaLogo",
    isRequired: true,
  },
  phone: {
    name: "phone",
    labelName: "Phone",
    inputType: "Number",
    placeholder: "Phone",
    isRequired: true,
  },
};

export const AttributeKeys = {
  key: {
    name: "jsonKey",
    labelName: "Key",
    inputType: "Text",
    placeholder: "",
    isRequired: true,
  },
  dataType: {
    name: "dataType",
    codeKey: "dataType",
    labelName: "Data Type",
    placeholder: "",
    isRequired: true,
    lov: [
      { value: "TEXT", label: "TEXT" },
      { value: "NUMBER", label: "NUMBER" },
    ],
  },
  prompt: {
    name: "prompt",
    labelName: "Prompt",
    inputType: "Text",
    placeholder: "",
    isRequired: true,
  },
  remarks: {
    name: "remarks",
    labelName: "Remarks",
    inputType: "TextArea",
    placeholder: "",
    isRequired: true,
  },
};

export const BankKeys = {
  bankName: {
    name: "bankName",
    labelName: "Bank Name",
    inputType: "Text",
    placeholder: "",
    isRequired: true,
  },
  knownAs: {
    name: "knownAs",
    labelName: "Known As",
    inputType: "Text",
    placeholder: "",
    isRequired: true,
  },
  branchName: {
    name: "bankBranch",
    labelName: "Branch Name",
    inputType: "Text",
    placeholder: "",
    isRequired: true,
  },
  accountNumber: {
    name: "accountNumber",
    labelName: "Account Number",
    inputType: "Text",
    placeholder: "",
    isRequired: true,
  },
  city: {
    name: "city",
    labelName: "City",
    inputType: "Text",
    placeholder: "",
    isRequired: true,
  },
  country: {
    labelName: "Country",
    name: "countryName",
    codeKey: "countryCode",
    isCharacterLimitedSearch: true,
    isRequired: true,
  },
};

export const PropertiesFilterKeys = {
  propertyNameFilter: {
    name: "PropertyNameFilter",
    codeKey: "propertyIdFilter",
    placeholder: "Select Property",
    isRequired: false,
    inputType: "Text",
    // labelName: "Property",
  },
};
export const UnitsLayoutFilterKeys = {
  unitId: {
    name: "unitFilter",
    codeKey: "unitIdFilter",
    placeholder: "Select Unit",
    isRequired: true,
    inputType: "Text",
    labelName: "Select Unit",
  },
};

export const UnitsFilterKeys = {
  propertyNameFilter: {
    name: "PropertyNameFilter",
    codeKey: "propertyIdFilter",
    placeholder: "Select Property",
    isRequired: false,
  },
  towerNameFilter: {
    name: "towerNameFilter",
    codeKey: "towerIdFilter",
    placeholder: "Select Tower",
    isRequired: false,
    inputType: "Text",
  },
  unitCodeFilter: {
    name: "unitCodeFilter",
    codeKey: "unitCodeFilter",
    placeholder: "Unit Code",
    isRequired: false,
    inputType: "Text",
  },
};
export const ReleaseManagementKeys = {
  statusChangeRemarks: {
    name: "statusChangeRemarks",
    placeholder: "Status Remarks",
    isRequired: false,
    inputType: "TextArea",
    labelName: "Change Remarks",
  },
  fromUnitStatusId: {
    name: "unitStatus",
    codeKey: "unitStatus",
    placeholder: "Select From Status",
    isRequired: false,
    fromStatus: "From Status",
    labelName: "From Status",
    inputType: "Text",
  },
  toUnitStatusId: {
    name: "toUnitStatus",
    codeKey: "toUnitStatus",
    placeholder: "Select To Status",
    isRequired: false,
    labelName: "To Status",
    inputType: "Text",
  },
  assignedTo: {
    labelName: "Assigned To",
    name: "assignedTo",
    codeKey: "assignedTo",
  },

  assignedToEmail: {
    labelName: "Assigned To Email",
    name: "assignedToLabel",
    placeholder: "Select Email",
    codeKey: "assignedToEmail",
  },

  endDate: {
    labelName: "End Date",
    name: "endDate",
    placeholder: "End Date",
    inputType: "Date",
  },
  restrictRemarks: {
    name: "restrictRemarks",
    placeholder: "Restrict Remarks",
    isRequired: false,
    inputType: "TextArea",
    labelName: "Restrict Remarks",
  },
  restrictReasonId: {
    labelName: "Restrict Reason",
    name: "restrictReason",
    placeholder: "Select Reason",
    codeKey: "restrictReason",
  },
};

export const TowerFilterKeys = {
  propertyName: {
    name: "propertyName",
    labelName: "",
    inputType: "Text",
    placeholder: "property name",
    isRequired: false,
  },
  towerNameFilter: {
    name: "towerNameFilter",
    labelName: "",
    inputType: "Text",
    placeholder: "tower name",
    isRequired: false,
  },
};

export const TowerKeys = {
  towerCode: {
    name: "towerCode",
    labelName: "Tower Code",
    inputType: "Text",
    placeholder: "e.g. AB",
    isRequired: true,
  },
  completedPercentInt: {
    name: "completedPercentInt",
    labelName: "Internal Completion(%)",
    inputType: "Text",
    typeOfInput: "number",
    placeholder: "",
    isRequired: false,
  },

  completedPercentExt: {
    name: "completedPercentExt",
    labelName: "External Completion(%)",
    inputType: "Text",
    typeOfInput: "number",
    placeholder: "",
    isRequired: false,
  },
  propertyName: {
    name: "PropertyName",
    codeKey: "propertyId",
    placeholder: "Select Property",
    isRequired: false,
  },

  towerName: {
    name: "towerName",
    labelName: "Tower Name",
    inputType: "Text",
    placeholder: "e.g. Central Park Residences",
    isRequired: true,
  },
  transactionType: {
    name: "transactionType",
    codeKey: "transactionType",
    labelName: "Transaction Type",
    placeholder: "",
    isRequired: false,
    lov: [
      { value: "SELL", label: "SELL" },
      { value: "LEASE", label: "LEASE" },
      { value: "MIXED", label: "MIXED" },
    ],
  },

  spaceType: {
    labelName: "Space Type",
    name: "spaceType",
    codeKey: "spaceType",
    isRequired: false,
  },

  anticipatedCompletionDate: {
    name: "anCompDate",
    labelName: "ECD",
    inputType: "Date",
    placeholder: "DD-MMM-YYYY",
    isRequired: false,
  },
  permitDate: {
    name: "permitDate",
    labelName: "Permit Date",
    inputType: "Date",
    placeholder: "DD-MMM-YYYY",
    isRequired: false,
  },
  launchDate: {
    name: "launchDate",
    labelName: "Launch Date",
    inputType: "Date",
    placeholder: "DD-MMM-YYYY",
    isRequired: false,
  },
  corporateBank: {
    labelName: "Corporate Bank",
    name: "corporateBank",
    codeKey: "corpBankAccId",
    isRequired: false,
  },
  escrowBank: {
    labelName: "Escrow Bank",
    name: "escrowBank",
    codeKey: "escrowBankAccId",
    isRequired: false,
  },
  sellarLegalEntity: {
    name: "legalEntitySeller",
    labelName: "Seller Legal Entity",
    inputType: "Text",
    placeholder: "seller company name",
    isRequired: false,
  },
};
export const LovSetupFilterKeys = {
  lovType: {
    name: "lovType",
    labelName: "LOV Type",
    codeKey: "lovType",
    placeholder: "Select LOV Type",
    isRequired: false,
  },
};

export const PaymentHeaderKeys = {
  planName: {
    name: "planName",
    labelName: "Plan Name",
    inputType: "Text",
    placeholder: "e.g. Plan",
    isRequired: true,
  },
  startDate: {
    name: "startDate",
    labelName: "Start Date",
    inputType: "Date",
    placeholder: "e.g. Start Date",
    isRequired: true,
  },
  endDate: {
    name: "endDate",
    labelName: "End Date",
    inputType: "Date",
    placeholder: "e.g. End Date",
    isRequired: false,
  },
  isActive: {
    name: "isActive",
    labelName: "Is Active?",
    inputType: "Radio",
    placeholder: "e.g. ",
    isRequired: false,
    lov: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  },
};
export const PaymentPlanKeys = {
  seqNo: {
    name: "seqNo",
    labelName: "Seq#",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "e.g. 00",
    isRequired: true,
  },
  eventName: {
    name: "eventName",
    labelName: "Event",
    inputType: "Text",
    placeholder: "e.g. Event",
    isRequired: true,
  },
  eventSeq: {
    name: "eventSeq",
    labelName: "Event Seq.",
    inputType: "Text",
    placeholder: "e.g. 00",
  },
  paymentFor: {
    name: "paymentFor",
    labelName: (
      <>
        Payment For{" "}
        <span style={{ color: "gray" }}>(Auto-filled from Event Group)</span>
      </>
    ),
    inputType: "Text",
    placeholder: "e.g. 00",
  },
  eventType: {
    name: "eventGroup",
    labelName: "Event Group",
    inputType: "Radio",
    placeholder: "e.g. Select",
    isRequired: true,
    lov: [
      { value: "D", label: "Down Payment" },
      { value: "I", label: "Installment" },
      { value: "O", label: "Others" },
    ],
  },
  paymentAccount: {
    name: "paymentAccount",
    labelName: "Pay to Account",
    inputType: "Radio",
    placeholder: "e.g. Select",
    isRequired: true,
    lov: [
      { value: "E", label: "Escrow" },
      { value: "C", label: "Corporate" },
    ],
  },

  postHandover: {
    name: "postHandover",
    labelName: "Post Handover",
    inputType: "Radio",
    placeholder: "e.g. Select",
    isRequired: false,
    lov: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  },
  uom: {
    name: "eventUomLabel",
    labelName: "UOM",
    codeKey: "eventUom",
    placeholder: "e.g. Select",
    isRequired: false,
    lov: [
      { value: "Y", label: "Years" },
      { value: "M", label: "Months" },
      { value: "D", label: "Days" },
      // { value: "Date", label: "Date" },
    ],
  },
  lineDescription: {
    name: "lineDescription",
    labelName: "Line Description",
    inputType: "TextArea",
    minRows: 3,
    maxRows: 4,
    placeholder: "Description",
    isRequired: false,
  },
  note: {
    name: "note",
    labelName: "Note",
    inputType: "TextArea",
    minRows: 3,
    maxRows: 4,
    placeholder: "Note",
    isRequired: false,
  },
  eventPeriod: {
    name: "eventPeriod",
    labelName: "Duration",
    inputType: "Text",
    placeholder: "",
    typeOfInput: "Number",
    isRequired: false,
  },
  paymentAmount: {
    name: "payAmount",
    labelName: "Amount",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "0.00",
    isRequired: false,
  },
  eventDay: {
    name: "eventDate",
    labelName: "On or Before Date",
    inputType: "Date",
    placeholder: "",
    isRequired: false,
  },
  paymentPercentage: {
    name: "payPercent",
    labelName: "Percentage",
    typeOfInput: "Number",
    inputType: "Text",
    placeholder: "0.00",
    isRequired: false,
  },
};
export const PropertiesKeys = {
  propertyCode: {
    name: "code",
    labelName: "Code",
    inputType: "Text",
    placeholder: "e.g. AB",
    isRequired: true,
  },
  propertyName: {
    name: "propertyName",
    labelName: "Property Name",
    inputType: "Text",
    placeholder: "e.g. Central Park Residences",
    isRequired: true,
  },
  propertyStatus: {
    name: "propertyStatus",
    labelName: "Property Status",
    inputType: "Text",
    placeholder: "e.g. Planned",
    isRequired: true,
  },
  communityName: {
    name: "communityName",
    labelName: "Community Name",
    inputType: "Text",
    placeholder: "community",
    isRequired: false,
  },
  transactionType: {
    name: "transactionType",
    codeKey: "transactionType",
    labelName: "Transaction Type",
    placeholder: "",
    isRequired: false,
    lov: [
      { value: "SELL", label: "SELL" },
      { value: "LEASE", label: "LEASE" },
      { value: "MIXED", label: "MIXED" },
    ],
  },
  propertyNameAutoCom: {
    name: "propertyName",
    codeKey: "propertyNameCode",
    labelName: "Select Property",
    placeholder: "e.g. Central Park Residences",
    isRequired: false,
  },
  propertyType: {
    labelName: "Space Type",
    name: "spaceType",
    codeKey: "spaceType",
    isRequired: false,
  },
  propertyDescription: {
    labelName: "Description",
    name: "propertyDescription",
    inputType: "TextArea",
    minRows: 4,
    maxRows: 5,
    isRequired: false,
  },
  address: {
    name: "propertyLocation",
    labelName: "Property Location",
    inputType: "Text",
    placeholder: "location",
    isRequired: false,
  },
  city: {
    name: "city",
    labelName: "City",
    inputType: "Text",
    placeholder: "city",
    isRequired: true,
  },
  country: {
    labelName: "Country",
    name: "countryName",
    codeKey: "propertyCountry",
    isCharacterLimitedSearch: true,
    isRequired: true,
  },
  state: {
    name: "district",
    labelName: "Discrict",
    inputType: "Text",
    placeholder: "district",
    isRequired: false,
  },

  totalValue: {
    name: "totalValue",
    labelName: "Total Value",
    inputType: "Text",
    placeholder: "Total Value",
    isRequired: false,
  },
  minUnitArea: {
    name: "minUnitArea",
    labelName: "Min Area",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "Min. Unit Area",
    isRequired: false,
  },

  maxUnitArea: {
    name: "maxUnitArea",
    labelName: "Max Area",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "Max. Unit Area",
    isRequired: false,
  },
  minUnitPrice: {
    name: "minUnitPrice",
    labelName: "Min Price",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "Min. Unit Price",
    isRequired: false,
  },
  maxUnitPrice: {
    name: "maxUnitPrice",
    labelName: "Max Price",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "Max. Unit Price",
    isRequired: false,
  },
  currencyCode: {
    labelName: "Selling Currency",
    name: "sellingCurrency",
    codeKey: "sellingCurrency",
    isCharacterLimitedSearch: false,
    isClearDisabled: true,
    isRequired: true,
  },
  sellarLegalEntity: {
    name: "legalEntitySeller",
    labelName: "Seller Legal Entity",
    inputType: "Text",
    placeholder: "seller company name",
    isRequired: true,
  },
  buyerLegalEntity: {
    name: "legalEntityDeveloper",
    labelName: "Developer Legal Entity",
    inputType: "Text",
    placeholder: "Developer company name",
    isRequired: false,
  },
  anticipatedCompletionDate: {
    name: "anCompDate",
    labelName: "ECD",
    inputType: "Date",
    placeholder: "DD-MMM-YYYY",
    isRequired: false,
  },
  permitDate: {
    name: "permitDate",
    labelName: "Permit Date",
    inputType: "Date",
    placeholder: "DD-MMM-YYYY",
    isRequired: false,
  },
  launchDate: {
    name: "launchDate",
    labelName: "Launch Date",
    inputType: "Date",
    placeholder: "DD-MMM-YYYY",
    isRequired: false,
  },
  corporateBank: {
    labelName: "Corporate Bank",
    name: "corporateBank",
    codeKey: "corpBankAccountId",
    isRequired: false,
  },
  uomCode: {
    labelName: "UOM Code",
    name: "uomCode",
    codeKey: "uomCode",
    isRequired: false,
    lov: [
      { label: "SFT", value: "SFT" },
      { label: "SQM", value: "SQM" },
      { label: "SQT", value: "SQT" },
    ],
  },
  escrowBank: {
    labelName: "Escrow Bank",
    name: "escrowBank",
    codeKey: "escrowBankAccountId",
    isRequired: false,
  },
  parcelDetails: {
    labelName: "Parcel Details",
    name: "parcelDetails",
    codeKey: "parcelDetailsCode",
    isRequired: false,
    lov: [
      { label: "Parcel A", value: "Parcel A" },
      { label: "Parcel B", value: "Parcel B" },
    ],
  },
  registrationPercent: {
    labelName: "Registration(%)",
    name: "registrationPercent",
    inputType: "Text",
    typeOfInput: "Number",
    codeKey: "registrationPercent",
    isRequired: false,
  },
  buildingName: {
    name: "buildingName",
    labelName: "Building Name",
    inputType: "Text",
    placeholder: "",
    isRequired: false,
  },
  buildingNameAutoCom: {
    name: "buildingName",
    codeKey: "buildingNameCode",
    labelName: "Choose Building",
    placeholder: "",
    isRequired: false,
    lov: [{ value: "Building 1", label: "Building 1" }],
  },
  numberOfFloors: {
    name: "numberOfFloors",
    labelName: "Number Of Floors",
    inputType: "Text",
    placeholder: "",
    isRequired: false,
  },
  unitPerFloor: {
    name: "unitPerFloor",
    labelName: "Unit As Per Floor",
    inputType: "Text",
    placeholder: "",
    isRequired: false,
  },
  clusterName: {
    name: "clusterName",
    labelName: "Cluster Name",
    inputType: "Text",
    placeholder: "",
    isRequired: false,
  },
  clusterDescription: {
    name: "clusterDescription",
    labelName: "Cluster Description",
    placeholder: "",
    inputType: "TextArea",
    minRows: 4,
    maxRows: 5,
    isRequired: false,
  },
  completedPercentInt: {
    name: "completedPercentInt",
    labelName: "Internal Completion(%)",
    inputType: "Text",
    typeOfInput: "number",
    placeholder: "",
    isRequired: false,
  },

  completedPercentExt: {
    name: "completedPercentExt",
    labelName: "External Completion(%)",
    inputType: "Text",
    typeOfInput: "number",
    placeholder: "",
    isRequired: false,
  },
};

export const UnitKeys = {
  completedPercentInt: {
    name: "completedPercentInt",
    labelName: "Internal Completion(%)",
    inputType: "Text",
    typeOfInput: "number",
    placeholder: "",
    isRequired: false,
  },

  completedPercentExt: {
    name: "completedPercentExt",
    labelName: "External Completion(%)",
    inputType: "Text",
    typeOfInput: "number",
    placeholder: "",
    isRequired: false,
  },
  marketingName: {
    name: "marketingName",
    labelName: "Marketing Name",
    inputType: "Text",
    placeholder: "e.g. UNIT Name",
    isRequired: false,
  },

  unitNumber: {
    name: "unitNumber",
    labelName: "Unit Number",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "e.g. 000",
    isRequired: true,
  },

  unitStatus: {
    name: "unitStatus",
    labelName: "Status",
    inputType: "Text",
    placeholder: "e.g. 000",
  },

  unitCode: {
    name: "unitCode",
    labelName: "Code",
    inputType: "Text",
    placeholder: "e.g. GH/6/616",
    isRequired: false,
  },
  unitTypeCode: {
    name: "unitTypeCode",
    labelName: "Type Code",
    inputType: "Text",
    placeholder: "e.g. 2BR-A",
    isRequired: false,
  },
  unitCategory: {
    labelName: "Category",
    name: "unitCategory",
    codeKey: "unitCategory",
    isCharacterLimitedSearch: false,
    isClearDisabled: false,
    isRequired: false,
    placeholder: "Select Category",
  },
  unitPrototype: {
    labelName: "Prototype",
    name: "unitPrototype",
    codeKey: "unitPrototype",
    isCharacterLimitedSearch: false,
    isRequired: false,
    placeholder: "Select Prototype",
  },
  unitClassification: {
    labelName: "Classification",
    name: "unitClassification",
    codeKey: "unitClassification",
    isCharacterLimitedSearch: false,
    isClearDisabled: true,
    isRequired: false,
    placeholder: "Select Classification",
  },

  sellableArea: {
    name: "sellableArea",
    labelName: "Area",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "e.g. 00",
    isRequired: true,
  },
  basePrice: {
    name: "basePrice",
    labelName: "Price",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "e.g. 00",
    isRequired: true,
  },

  spaceType: {
    labelName: "Space Type",
    name: "spaceType",
    codeKey: "spaceType",
    isRequired: false,
    placeholder: "Select Space Type",
  },
  currencyCode: {
    labelName: "Selling Currency",
    name: "sellingCurrency",
    codeKey: "sellingCurrency",
    isCharacterLimitedSearch: false,
    isClearDisabled: true,
    isRequired: false,
    placeholder: "Select Currency",
  },

  viewTypeId: {
    labelName: "View",
    name: "unitView",
    codeKey: "unitView",
    isCharacterLimitedSearch: false,
    isClearDisabled: true,
    isRequired: false,
    placeholder: "Select Unit View",
  },

  floorTypeCode: {
    labelName: "Floor Type",
    name: "floorType",
    codeKey: "floorType",
    isRequired: false,
    placeholder: "Select Floor Type",
  },
  floorNumber: {
    name: "floorNumber",
    labelName: "Floor Number",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "e.g. 5",
    isRequired: false,
  },
  floorCode: {
    name: "floorCode",
    labelName: "Floor Code",
    inputType: "Text",
    placeholder: "e.g. N/007",
    isRequired: false,
  },

  freeParking: {
    name: "freeParking",
    labelName: "Parking",
    inputType: "Text",
    typeOfInput: "Number",
    placeholder: "e.g. 1",
    isRequired: false,
  },

  uomCode: {
    labelName: "UOM Code",
    name: "uomCode",
    codeKey: "uomCode",
    isRequired: false,
    lov: [
      { label: "SFT", value: "SFT" },
      { label: "SQM", value: "SQM" },
      { label: "SQT", value: "SQT" },
    ],
    placeholder: "Select UOM Code",
  },

  anticipatedCompletionDate: {
    name: "anCompDate",
    labelName: "ECD",
    inputType: "Date",
    placeholder: "DD-MMM-YYYY",
    isRequired: false,
  },
  actualCompletionDate: {
    name: "actCompDate",
    labelName: "Actual Completion Date",
    inputType: "Date",
    placeholder: "DD-MMM-YYYY",
    isRequired: false,
  },
  endDate: {
    name: "endDate",
    labelName: "End Date",
    inputType: "Date",
    placeholder: "DD-MMM-YYYY",
    isRequired: false,
  },
  isAccessible: {
    name: "isAccessible",
    labelName: "Is Accessible ?",
    inputType: "Radio",
    placeholder: "",
    isRequired: false,
    lov: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  },
  isFurnished: {
    name: "isFurnished",
    labelName: "Is Furnished?",
    inputType: "Radio",
    placeholder: "",
    isRequired: false,
    lov: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  },
  isShellAndCore: {
    name: "isShellAndCore",
    labelName: "Is Shell And Core ?",
    inputType: "Radio",
    placeholder: "",
    isRequired: false,
    lov: [
      { value: true, label: "Yes" },
      { value: false, label: "No" },
    ],
  },
};

export const PropertyStaticImages = [
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
];

export const ExcelKeys = {
  Unit: { name: "Unit", key: "unit" },
  Floor: { name: "Floor", key: "floor" },
  View: { name: "View", key: "view" },
  Prototype: { name: "Prototype", key: "prototype" },
  "Carpet Area": { name: "Carpet Area", key: "carpetArea" },
  "Balcony Area": { name: "Balcony Area", key: "balconyArea" },
  "Terrace Area": { name: "Terrace Area", key: "terraceArea" },
  Parking: { name: "Parking", key: "parking" },
  "Base Price": { name: "Base Price", key: "basePrice" },
  Classification: { name: "Classification", key: "classification" },
};

export const TitleFromKeys = Object.values(ExcelKeys).reduce(
  (acc, { key }, idx) => {
    const columnTitle = Object.keys(ExcelKeys)[idx];
    acc[key] = columnTitle;
    return acc;
  },
  {} as Record<string, string>
);

export const generateSortTextAndCustomQuery = (
  searchObjKey,
  type,
  txt,
  additionalQueries = [],
  sortType,
  sortObj = {},
  additionalSearchTemp,
  defaultSortText,
  equalOperatorsArray,
  betweenOperatorsArray,
  needToIgnoreSearchKeys,
  limit,
  pageNum,
  needToIgnoreFilterArrayCount
) => {
  try {
    const localData = localStorage.getItem(searchObjKey)
      ? JSON.parse(localStorage.getItem(searchObjKey))
      : {};
    let searchTemp = { ...localData };
    if (additionalSearchTemp) {
      searchTemp = { ...searchTemp, ...additionalSearchTemp };
    }
    let customQuery = additionalQueries;
    if (type) {
      searchTemp[type] = txt ? txt : "";
    }
    let queryCount = 0;
    Object.keys(searchTemp)?.forEach((record) => {
      let isQueryIncreased = false;
      if (searchTemp[record] && !needToIgnoreSearchKeys?.includes(record)) {
        if (betweenOperatorsArray?.includes(record)) {
          if (searchTemp[record][0] && searchTemp[record][1]) {
            customQuery.push({
              attribute: record,
              operator: "BETWEEN",
              value: dayjs(searchTemp[record][0])?.format("DD-MM-YYYY"),
              toValue: dayjs(searchTemp[record][1])?.format("DD-MM-YYYY"),
            });
            isQueryIncreased = true;
          }
        } else if (equalOperatorsArray?.includes(record)) {
          if (
            typeof searchTemp[record] === "object"
              ? searchTemp[record]["value"]
                ? String(searchTemp[record]["value"])?.trim()
                : ""
              : searchTemp[record]
              ? String(searchTemp[record])?.trim()
              : searchTemp[record]
          ) {
            isQueryIncreased = true;
            customQuery.push({
              attribute: record,
              operator: "=",
              value:
                typeof searchTemp[record] === "object"
                  ? searchTemp[record]["value"]
                    ? String(searchTemp[record]["value"])?.trim()
                    : ""
                  : searchTemp[record]
                  ? String(searchTemp[record])?.trim()
                  : searchTemp[record],
            });
          }
        } else {
          if (
            typeof searchTemp[record] === "object"
              ? searchTemp[record]["value"]
                ? String(searchTemp[record]["value"])?.trim()
                : ""
              : searchTemp[record]
              ? String(searchTemp[record])?.trim()
              : searchTemp[record]
          ) {
            isQueryIncreased = true;
            customQuery.push({
              attribute: record,
              operator: "CONTAINS",
              value:
                typeof searchTemp[record] === "object"
                  ? searchTemp[record]["value"]
                    ? String(searchTemp[record]["value"])?.trim()
                    : ""
                  : searchTemp[record]
                  ? String(searchTemp[record])?.trim()
                  : searchTemp[record],
            });
          }
        }
        if (
          isQueryIncreased &&
          !needToIgnoreFilterArrayCount?.includes(record)
        ) {
          queryCount += 1;
        }
      }
    });

    localStorage.setItem(searchObjKey, JSON.stringify(searchTemp));
    let sortTemp = {};
    if (sortType) {
      let updatedSortType =
        sortObj[sortType] === "D" ? "A" : sortObj[sortType] === "A" ? "" : "D";
      if (sortTemp[sortType]) {
        delete sortTemp[sortType];
      }
      sortTemp[sortType] = updatedSortType;
    } else {
      sortTemp = sortObj;
    }

    let sortText = "";
    Object.keys(sortTemp)?.forEach((record) => {
      if (sortTemp[record]) {
        sortText = sortText
          ? `${sortText},${record}~${sortTemp[record]}`
          : `${record}~${sortTemp[record]}`;
      }
    });
    if (!sortText) {
      sortText = defaultSortText;
    }

    sortText = sortText?.endsWith(",") ? sortText?.slice(0, -1) : sortText;
    let data = JSON.stringify({
      limit: limit ? limit : 20,
      query: customQuery,

      sortText: sortText,
      pageNumber: pageNum ? pageNum : 0,
    });
    const filterDetails = { isFilterExist: false, filterCount: 0 };
    if (queryCount > 0) {
      filterDetails.isFilterExist = true;
      filterDetails.filterCount = queryCount > 0 ? queryCount - 1 : queryCount;
    }

    return {
      modifiedSortText: sortText,
      modifiedQueries: customQuery,
      queryCount: queryCount,
      data: data,
      filterDetails: filterDetails,
      sortTemp: sortTemp,
    };
  } catch (e) {
    message.error(e.message);
  }
};

export const ExcelUnitAttachmentKeys = {
  "Unit ID": { name: "Unit ID", key: "unitId" },
  File: { name: "File", key: "fileName" },
};

export const TitleFromUnitAttachmentKeys = Object.values(
  ExcelUnitAttachmentKeys
).reduce((acc, { key }, idx) => {
  const columnTitle = Object.keys(ExcelUnitAttachmentKeys)[idx];
  acc[key] = columnTitle;
  return acc;
}, {} as Record<string, string>);

export const ExcelBaseFileBase64 =
  "UEsDBBQACAgIACmTTlsAAAAAAAAAAAAAAAAaAAAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHOtUkFqwzAQvOcVYu+17KSEUiznEgq5pukDhLy2TGxJaDdt8vuqTWgcCKEHn8TMameGYcvVcejFJ0bqvFNQZDkIdMbXnWsVfOzenl5gVc3KLfaa0xeyXSCRdhwpsMzhVUoyFgdNmQ/o0qTxcdCcYGxl0GavW5TzPF/KONaA6kZTbGoFcVMXIHangP/R9k3TGVx7cxjQ8R0LyWkXk6COLbKCX3gmiyyJgbyfYT5lBuJTj3QNccaP7BdT2n/5uCeLyNcEf1QK9/M87OJ50i6sjli/c0zHNa5kTF/CzEp5c3LVN1BLBwi+0DoZ4AAAAKkCAABQSwMEFAAICAgAKZNOWwAAAAAAAAAAAAAAAA8AAAB4bC93b3JrYm9vay54bWyNU9uOmzAQfe9XIL8TILcmUcgqJUG7Um/abHefDQzBjbGRPbm16r93MKHdqn3oQ2LPxWfOmRmWd5daeicwVmgVs2gQMg9Urguh9jH78pT6M+ZZ5KrgUiuI2RUsu1u9WZ61OWRaHzx6r2zMKsRmEQQ2r6DmdqAbUBQptak5kmn2gW0M8MJWAFjLYBiG06DmQrEOYWH+B0OXpchho/NjDQo7EAOSI7G3lWgsWy1LIeG5E+TxpvnIa6KdcJmzYPWL9mfjZTw/HJuUsmNWcmmBhFb6/Cn7CjmSIi4l8wqOEM3DcZ/yB4RGyqQy5GwdzwLO9ne8NR3ivTbim1bI5S43WsqYoTneqhFRFPm/Iru2UU88s73z8iJUoc8xoxFdX93P7voiCqxogNPRbNz77kHsK4zZLJoPmYc8e2wbFbNJSM9KYSy6Ig6Fk5ITUL3WIkHBK0VuZv3pKddQ9zJqqdL5UFBltydIoZOwIpPE2CwEBcxDMXKIPQzJzan/AsFQfqKPiihELScD5QddEMSa0G7xXv7N3IBEThwHYRhGLSxc8L1Fd942SWq6/7VNUmQGuv1xq8S8oxEx+/52Opwms+nQH66jkR9F24n/bjSe+Ok2TalxySaZpz9orRzqgn5JR9+ioW/kEcrdlUZ7idn2koNcO04BpXX/jlrQr8TqJ1BLBwiL2Aut+gEAAG8DAABQSwMEFAAICAgAKZNOWwAAAAAAAAAAAAAAABMAAAB4bC90aGVtZS90aGVtZTEueG1s3ZVNj5swEIbv/RWW710TkhAShayqplEPlXrYbe8TY8Ab2yDbu9v8+xrD8hGyalVVqrZwwGM/83rGM8D29ocU6Ilpw0uV4NlNgBFTtEy5yhP87f7wPsbIWFApiFKxBJ+Zwbe7d1vY2IJJhpy7MhtIcGFttSHEUDcN5qasmHJrWaklWGfqnKQanp2sFCQMgohI4Aq3/vp3/Mss45TtS/oombKNiGYCrAvdFLwyGCmQLsavHkT3dYB49xLqJ8FqP1NPUKHvqI9/6OHZ9DSrH0bnx49CoycQCQ78hcluSzpA2CmX+avlWiA9hVM9FsaLWacXNnpTjsX13el5ACh1WUz3ni2jIA5bdgA1wyva69VsPuYH+vOp/jo6hosRP+/5xTTHbM3S5Yhf9PxywkMQHtfzEb/s+WjCLxisQjbiPVQIrk5TOlrFcdTSHZKV4vNVfB1FwSpt8Z4ig85p/JV9rY8kPJT64ABfXNekCtlzxTKgjvugOQiMKm5pcQDJxdkdGEa0AG2YdYddbw0bBgOfPXuA74/oDpT5tSc1f+ZJLgKXXL3RLPrAybBQvmxyaHAh7uxZsC/GJ2lKwdODm/SGx7q2qAo3xF6xW2mskdM/VyDTtIQaW+g5wdF8WR8dVO7L5WrrhrJKE2xUjhGI3P0PqNW+mStt7B5M0YTgd2oqJLlluv0+qbepTC4Ph2UZo/aVmd50a43I1dW/D5NrkR3zw//Zv5eJkdFrSyb/9JeZ3U9QSwcIugenwi0CAADSCAAAUEsDBBQACAgIACmTTlsAAAAAAAAAAAAAAAANAAAAeGwvc3R5bGVzLnhtbO1aW2/bNhR+368QlLdhiWjLVqzNdtqp07CXrmhTYMA6BLRF20QlUqDoxu6vHynqLjEXJ46dwgkaiefw8Hz8eHhTz/hqE4XGN8QSTMnE7F0A00BkTgNMlhPz87V/PjKNhEMSwJASNDG3KDGvpj+NE74N0acVQtwQLZBkYq44j3+1rGS+QhFMLmiMiNAsKIsgF0W2tJKYIRgk0igKrT4AjhVBTMzpmKwjP+KJMadrwiemXYgM9fgrENicgWmo5jwaCCh/IoIYDE2rs/KwXvmNpppTr3Zz/rNx9svZGbgA4Ob8ty/1otR+Ob+6Sl/f3JzLNq0M+3S8oKTswqWpBNNx8t34BkPhqyerz2lImcEFR8JbKiEwQqrG25jTxHgPGaO3UrOAEQ63StdPjVeQJYJx1V7qXfloeAKNdhlWNFUbBMdqfi9NHgzxjOFdGJopBWdrJHVdPtlyNjH97OfZHNfJuat31zhCIgjQrfGRRpA0nVWbTh8y8HAY1uaOFEzHMeQcMeKLgpG9X29j4ZGImayaSevdU3vJ4LbXHz7cIKEhDiSKpdfq5yyTZSwDYNtAxUKlucJR+hAdnFEWiCUq7+LQzEVGgOGSEhh+jifmAoYJMgvRO3pLcuF0HKIFF24YXq7kk9NYoqGc00i85DYSiGp5Nw9GuiyKAFvhdORSd02h8J2LIhTgdWS+GJQX836Efb8DSi5SQJrSLlTZi4jNOQrDT9Lgn0URoH0ggGwW7c2LpAWxx8rAzl5VS1kBxnG49alsJF2klOD3tEpN9DbESxKhRsUPjHI05+lenoqnY5hXNFaU4e+iabmMLLO9U279HM+lSHXeNDja8I+UQ9WKwHTLYHwthAXxmASpY6FLVgyTr9fUx4Va0BQXMIyQzr+iIAe5woEwrdS0NosGU6DkqbcrTxnOJlFVcZWpPHReD5j+CYwGzM5z6wTmBOYE5gTmBGYXMNlFej9wNAecHM0hTjhtBga9YzorDAZHhaZ/TGjcA4OxqlcGdYGo3B169q53h82iDb0K6InYX9tFokbb4HG0PXltuvPyJa+ox07Y/uLsx7quZh+aFWnDkrR+lbTeg6Ps+W74zSDjNH46WYb8gI/J8m+FtvfDsjcXAsQew5/y8tL0OY+grzc8Zv4OFH8PILB/CAI7VrwjZXBwP4P2K1j/DjN/d99x93tE2W3DfQiHL3GqGxxBvD3X+WSvMeecCNzPpD0ReKSr3j5us/tZ9qzsw0DlvxiLjwSOWZEaMnlgYr6XaSxhhbbZGoccE1Wy2gYejSJYPdtUDGytgfEv+K8wcmpGTqfRmjFE5tvC5rJmM7jLpuZrVLO77LL7gJg8eBYmbs1EpTCUZE7Hwab87jIw03KesKHPymlnerSTQao5Dq4HAHDa6SZ5fkgzmaKVJOH73qX3hz5JIkW9F+gg/dkFepbzIcZakC8nxcXQdd3X1YeSfnBXjsr+oJc5SDtD9/1L/x7o8m+SeRZPuYxtUOBlRdGS101nU1OibWt0NgDIf90aqdP50SHQ2Uh5t6acnW2bkRa11HVpRlqbkdZGyrs1HpC/Oj/dNmKWuZqeurbtdPY0jXGvE4Gn481xBG2a1nTYpIXOj/T0OK71o62PEH0c6MdnpI14/cjpoxcAXU/1XEtNN2/lBG+NtvPO80fdNq6rGwVd7JRbUFMjY6rbxrblqHZHoufpZrCnXV1cV6eRsdgdo46jNp02O/K3e3x0s8S2XbdbU2Yxtm10Gjkb9RodAolBp7HTM5vVWL+tfF23yozt6f9QSwcI7B3rkjIFAAD2LQAAUEsDBBQACAgIACmTTlsAAAAAAAAAAAAAAAAYAAAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1svdtbc9pIFgfw9/0ULFuVmqnaAbq5Z2xPJboCukzFmZmqfVNQY1QREpGEL/n027qAxfmjrHfX1kNs8dOhL6fbjTpFX/32uAs79yJJgzi67rLeoNsR0Tr2g+juuvvHZ/2XWbeTZl7ke2Ecievuk0i7v9387eohTr6mWyGyjiwgSq+72yzbv+/30/VW7Ly0F+9FJO9s4mTnZfJlctdP94nw/OJNu7DPB4NJf+cFUbcs4X3ykjLizSZYCzVeH3YiyspCEhF6mWx+ug326bG0R/9F5fmJ9yC7emxPrYlqeedUHhtBebtgncRpvMl663hXNQ17Oe/Pz/r5mPD/rSQ2ll29D/KR4sfCduuX9HLnJV8P+19k2XuZqS9BGGRPRYe7N1dF+b8nnU0QZiKxY18O8sYLUyHv7b07cSuyP/bF/exz/LuE4+3+zVW/evPNlR/I8chb1knE5rr7gb13h4M8pIj4MxAPae26k27jB1028BB66bG8Ao0k8K0gElKz5FDhp/hBiUNTJkPO0/qNfwmZtSMkwd1WNtESm+xUZOZ9uRWhWGfCr7/PPWShrOT2afclDk8F+GLjHcIsb4KsLk6Ofi9bfN2N8nyGssh4n1ehiDDM+9ntrPPYhSx/Mup2vsfx7nbthTJLbDCovXaKt1PN82l5T/GhSEt1N//T+hLHX3PKyx3ko1T0Is/v3sv/DKtWdDue1HtRtkaf11+Xb+2k34oRkfdOA5YXXL8+Do1eTBk51lUmZBb+Cvxse92d9WbD8Xw4HZ+yJMfEFHnGZaOHPblIfJdjcZQq+3GZZkvci1DGF82pmyy/7F3/rPqbK5nStPiZJzf09mk+fFWh60OaxbuqXeUAbQPfF9HFaos6d96jbKX8HUTF7zR7KgZIproshk164zw9r1sjr2rkl2scjF6/ymFV5fBSlaw3nb5+laOqytGFKqdy2rx+jeOqxvGlTg56w/nrVzmpqpxcHkr+BnmdVlVOL1U57fHXr3FW1Ti7VOOsN569fpXzqsr5pSrlsvIGfyJscFwIBpcq5T3+0qWgspfVelp+Lq0/cnl9g/FkxwWIXVyBeG/+Bn8p7LgEsYY1aPAG04gdFyF2aRWSE0lm/fUrPa5D7OJCxF/8kfJfzaPJcHYa1kur0exNlty82lOO5fXz2PL60itblD9klB/f5VO0l3k3V0n80EmKVpYNKD/pn3suL4esN4TGlNE/eKooWgjdlL3Pq8sfztLis1C+OZV6fzO46t/nDawiPmIEO49QMIKfR6gYMTyP0DBidB6hY8T4PMLAiMl5hFlGjGoR0/OIBUbMziOWGDE/j1hdyBhJqlWGjOshJKt2GTKph5C0OmXItB5C8upeCHlObF9OutPM4z+YefLze/TaM48XLeP1lpEB/ViGlIthMdPq74nK0eEktWoZM6/HkLlWRuSfbc9Vk5mi10upQshUMapiWD2GVGVWMfUWj/moNybDtLgQx4aD3oxMreWFuMl43BuRybPCJJAIC1MpN7skl/bFZrHBbEgCnSqwngrSdBfHuzZ0ZzNx+KOZWGykXncmDquWHafZRwoKBZWCRkGnYFAwKSwoLCmsKFgUbAoOBbcGZ1kftZz1Ec06BYWCSkGjoFMwKJgUFhSWFFYULAo2BYeCO2rI+rjlrI9p1ikoFFQKGgWdgkHBpLCgsKSwomBRsCk4FNxxQ9YnLWd9QrNOQaGgUtAo6BQMCiaFBYUlhRUFi4JNwaHgThqyPm0561OadQoKBZWCRkGnYFAwKSwoLCmsKFgUbAoOBXfakPVZy1mf0axTUCioFDQKOgWDgklhQWFJYUXBomBTcCi4s4asz1vO+pxmnYJCQaWgUdApGBRMCgsKSworChYFm4JDwZ03ZD1/pm817cV/kJ3lHUQBUUE0EB3EADFBFiBLkBWIBWKDOCBuXc5H4Uf/ifEmo8BgFKgoICqIBqKDGCAmyAJkCbICsUBsEAfErcv5KPxwQ/8Wo8BhFKgoICqIBqKDGCAmyAJkCbICsUBsEAfErcv5KLS9mWWwmwVRQFQQDUQHMUBMkAXIEmQFYoHYIA6Iy5r2tqztzS2D3S2IAqKCaCA6iAFigixAliArEAvEBnFAXNa012Vtb3YZ7HZBFBAVRAPRQQwQE2QBsgRZgVggNogD4rKmvS9re/PLYPcLooCoIBqIDmKAmCALkCXICsQCsUEcEJc17YVZ25thBrthEAVEBdFAdBADxARZgCxBViAWiA3igLisaW/M2t4cM9gdgyggKogGooMYICbIAmQJsgKxQGwQB8RlTXtl1vZmmcFuGUQBUUE0EB3EADFBFiBLkBWIBWKDOCAua9o787b3zhz2ziAKiAqigeggBogJsgBZgqxALBAbxAFxedPembe9d+awdwZRQFQQDUQHMUBMkAXIEmQFYoHYIA6Iy5v2zrztvTOHvTOIAqKCaCA6iAFigixAliArEAvEBnFAXN60d+Zt75150/6Rt71/5E17KN72Hoo37SN42/sI3vQszdt+luZNz5O87edJ3vRMxdt+puJNzxXDtp8rhvDZ2q99z24dR36QnxLwwrI9WRDdHU8AKCwvZfPpEIpO9rQX113/sA+DtZeJP73wINJuZ58EcRJkT3kFHe9LfC8+3IukOPORnwv6dvDCOnyJM9mX4nIvkrWIsuI68aKvxUUmHqV0O/7j5niOoV82oPiS4IW2/ocuqPy9wTsrTjsiHveJSPPjJ/U+DN+gD3kON+XBlZt/yDb9/frdt0Oc/Zqf1xB+eX3VP0Y8d/cFzR29QXN5Q3M/iVQk9/9ng8dv0OBhrcEfHPWnW+3DJ8X8qWj7P4ufP5e/3oXZr+/u5L+iB+XPny91pGmiyX5EmbsvDo51tsLLT7ylp7/Iu+dzSFRuRXb67qzMxPc4yrxQkR0TSe2btjIFmfzbghv98lSV7SV3gaw4LE4rDXrT6vxSdZ3F++JqXEtg8WpbHILKX40ZmzE24MMJ54ORfM8mjrPLt/qnk1yHfWfvyXG4Db6L8lv3tbNKxQmv6rvBrHp5OuMjh08W4SZF7X78EH3eisiVvZSrVxLIThZH8K67+zjJEi/IZMNDb/31Q+T/tQ2y06Gxjp94tfNZaxGGSrzLz/Kl+RGr6Cyp6j7Il9jBczafZR3vg3x0ii92l1nRiwR0/GCzkRmPMj1I0ueqTuz6vnb/vCLfXMW+X54tk5Oldi0vyxJLPl3XK5MvTwchb/4NUEsHCBhJESNvCQAATDkAAFBLAwQUAAgICAApk05bAAAAAAAAAAAAAAAAFAAAAHhsL3NoYXJlZFN0cmluZ3MueG1slZTLbsIwEEX3/QrLldhBEhZtVZIgoNAiVQhBYD9NBrDqR7An0Px9TdXHrjJLj8/1vZoZOR1+KMlOaJ0wOuNJL+YMdWkqofcZ3xSz7gNnjkBXII3GjLfo+DC/SZ0j5qXaZfxAVD9GkSsPqMD1TI3a3+yMVUD+aPeRqy1C5Q6IpGTUj+O7SIHQnJWm0ZTxfsJZo8WxwclvIU+dyNMvk0dXQ+m9/SsO7Ql5vrTexVLLFqAwjShPowv9j6IwZ7Th+EYLYotGvaEN4mfSmDDSRydDbX1FjiKU3go8B4FzTWg1SDbyg+ncJvHAHXs76gWJxyBLo9trZYWhb0N2hWoJ9t3vYmBrRYnML8Y1BmuQ6NgWZBPW4/WlED6SCRDujW2D4OQ+Yc9gK9TsBcX+QC5MNl51R/2w9NRUwoR10xjJOqDqwU+mU+h6rabr+dN0UcxHr0H8qAZLCjX90ZH/YPJPUEsHCNHVRwBcAQAAngQAAFBLAwQUAAgICAApk05bAAAAAAAAAAAAAAAACwAAAF9yZWxzLy5yZWxzrZLBTsMwDIbve4oq9zXdQAihprtMSLshNB7AJG4btYmjxIPy9kQTEgyNssOOcX5//mKl3kxuLN4wJkteiVVZiQK9JmN9p8TL/nF5LzbNon7GEThHUm9DKnKPT0r0zOFByqR7dJBKCujzTUvRAedj7GQAPUCHcl1VdzL+ZIjmhFnsjBJxZ1ai2H8EvIRNbWs1bkkfHHo+M+JXIpMhdshKTKN8pzi8Eg1lhgp53mV9ucvf75QOGQwwSE0RlyHm7sgW07eOIf2Uy+mYmBO6ueZycGL0Bs28EoQwZ3R7TSN9SEzunxUdM19Ki1qe/MvmE1BLBwiFmjSa7gAAAM4CAABQSwMEFAAICAgAKZNOWwAAAAAAAAAAAAAAABEAAABkb2NQcm9wcy9jb3JlLnhtbI1Sy07DMBC88xWR74mTtLTIaoIEVZEQSEgtAnEz9hIMjm3Zbkv/HjttwqsHbrs7s7PP2flHK5MNWCe0qlCR5SgBxTQXqqnQ/WqRnqHEeao4lVpBhXbg0Hl9MmOGMG3hzmoD1gtwSRBSjjBToVfvDcHYsVdoqcsCQwXwRduW+uDaBhvK3mkDuMzzCW7BU049xVEwNYMiOkhyNkiatZWdAGcYJLSgvMNFVuAvrgfbuqMJHfKN2Qq/M3CU2oMD+8OJgbjdbrPtqKOG/gv8eHuz7EZNhYqrYoDq2aERwixQDzwJAmRfrkceRpfz1QLVZV6epkWe5tNVfkbKnBSTpxn+lR8F97a29TXlyZXUz1Qmc9iA1CYuIuYMlEjn4JgVxofL1h34IxB8SVWzDmeoQaX3y44yhOKBJXX+NrzCiwB+sQsaR2J9n+0h9o9Bi/GqLEk5JuX026C9QFfZwkbEj6yLcVd18GPbbv38BszvZxqcYHvhJezDvfnnTetPUEsHCFOXh+B5AQAA8gIAAFBLAwQUAAgICAApk05bAAAAAAAAAAAAAAAAEAAAAGRvY1Byb3BzL2FwcC54bWydkE1vwjAMhu/7FVXEtUlbdYyhNGjTtBPSdujQblWWupApX0pSVP79AmjAGZ9sv9Zj+6WrSatsDz5IaxpU4gJlYITtpdk26Kt9zxcoC5GbnitroEEHCGjFHuintw58lBCyRDChQbsY3ZKQIHagecBJNkkZrNc8ptJviR0GKeDNilGDiaQqijmBKYLpoc/dBYjOxOU+3gvtrTjeFzbtwSUeoy1op3gERsk1bW3kqpUaWP1cJuFS0hfnlBQ8Jk/YWv54+DgtIVWNK/yEq9lamnHqvhfzbl5nNxNd+uIXRCR1VcxeR6n6vKLkFndkb852s/IRFylOA/89Sq7Osj9QSwcIOwPWr/wAAACeAQAAUEsDBBQACAgIACmTTlsAAAAAAAAAAAAAAAATAAAAZG9jUHJvcHMvY3VzdG9tLnhtbJ3QvW6DMBAA4L1PYXknPkxIAAERGJC6dUi7IzAJEraR7dCgqu9eo/5k73Ly6ezPd5ee7mJCC9dmVDLD/g4w4rJT/SgvGX49N16EkbGt7NtJSZ7hlRt8yp/SF61mru3IDXKCNBm+WjsnhJjuykVrdq4sXWVQWrTWpfpC1DCMHa9UdxNcWkIBDqS7GauEN/9x+NtLFvtfslfd1p15O6+z8/L0B1/RIOzYZ/ijCllVhRB6tI6Z54NfenEQHz2IAGhJWRMX9SdG83aZYiRb4SZnSlr3x4Y+905dbDLN78bqHO7gDIDgEAQUqoIyVh9h3xRNU5fFPozAxTo+puTxJiW/XbnjY5n5F1BLBwigaHFrBQEAAJEBAABQSwMEFAAICAgAKZNOWwAAAAAAAAAAAAAAABMAAABbQ29udGVudF9UeXBlc10ueG1svVXJTsMwEL33KyJfUeKWA0IobQ8sR6hEOSNjTxLTeJHtlvbvGSdQldKFKhWXWPHMW2YysfPxUtXJApyXRg/JIOuTBDQ3QupySF6mD+k1GY96+XRlwSeYq/2QVCHYG0o9r0AxnxkLGiOFcYoFfHUltYzPWAn0st+/otzoADqkIXKQUX4HBZvXIblf4nari3CS3LZ5UWpImLW15CxgmMYo3YlzUPsDwIUWW+7SL2cZIpscX0nrL/YrWF1uCUgVK4v7uxHvFnZDmgBinrDdTgpIJsyFR6YwgS5r+hqLoR/Gzd6MmWVoKTtzeXuENyVPUzNFITkIw+cKIZm3DpjwFUBA882aKSb1Ef2AYwTtc9DZQ0NzRNCHVQ3+3OU2pH9odQPwtFm61/vTxJr/WAcq5kA8B4e/+dkbscl9yEc78P8x5Oh04oz1eBQ5OL3cb72ITi0SgQvy8LdeKyJ15/5CPFwEiFO1+dwHozrLtzS/xXs5ba6F0SdQSwcIKJkGmHMBAABFBgAAUEsBAhQAFAAICAgAKZNOW77QOhngAAAAqQIAABoAAAAAAAAAAAAAAAAAAAAAAHhsL19yZWxzL3dvcmtib29rLnhtbC5yZWxzUEsBAhQAFAAICAgAKZNOW4vYC636AQAAbwMAAA8AAAAAAAAAAAAAAAAAKAEAAHhsL3dvcmtib29rLnhtbFBLAQIUABQACAgIACmTTlu6B6fCLQIAANIIAAATAAAAAAAAAAAAAAAAAF8DAAB4bC90aGVtZS90aGVtZTEueG1sUEsBAhQAFAAICAgAKZNOW+wd65IyBQAA9i0AAA0AAAAAAAAAAAAAAAAAzQUAAHhsL3N0eWxlcy54bWxQSwECFAAUAAgICAApk05bGEkRI28JAABMOQAAGAAAAAAAAAAAAAAAAAA6CwAAeGwvd29ya3NoZWV0cy9zaGVldDEueG1sUEsBAhQAFAAICAgAKZNOW9HVRwBcAQAAngQAABQAAAAAAAAAAAAAAAAA7xQAAHhsL3NoYXJlZFN0cmluZ3MueG1sUEsBAhQAFAAICAgAKZNOW4WaNJruAAAAzgIAAAsAAAAAAAAAAAAAAAAAjRYAAF9yZWxzLy5yZWxzUEsBAhQAFAAICAgAKZNOW1OXh+B5AQAA8gIAABEAAAAAAAAAAAAAAAAAtBcAAGRvY1Byb3BzL2NvcmUueG1sUEsBAhQAFAAICAgAKZNOWzsD1q/8AAAAngEAABAAAAAAAAAAAAAAAAAAbBkAAGRvY1Byb3BzL2FwcC54bWxQSwECFAAUAAgICAApk05boGhxawUBAACRAQAAEwAAAAAAAAAAAAAAAACmGgAAZG9jUHJvcHMvY3VzdG9tLnhtbFBLAQIUABQACAgIACmTTlsomQaYcwEAAEUGAAATAAAAAAAAAAAAAAAAAOwbAABbQ29udGVudF9UeXBlc10ueG1sUEsFBgAAAAALAAsAwQIAAKAdAAAAAA==";
