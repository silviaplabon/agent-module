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
  address: {
    name: "address",
    labelName: "Address",
    inputType: "TextArea",
    placeholder: "Address",
    isRequired: true,
  },
  notes: {
    name: "notes",
    labelName: "Notes",
    inputType: "TextArea",
    placeholder: "Notes",
    isRequired: false,
  },
  isAgreed: {
    name: "isAgreed",
    labelName: "Is Agreed?",
    inputType: "Radio",
    placeholder: "",
    lov: [
      { label: "Agree", value: "Agree" },
      { label: "Disagree", value: "Disagree" },
    ],
    isRequired: true,
  },
};
