interface CustomInputTailwindFieldContainerProps {
  label?: string;
  isMandatory?: boolean;
  children: React.ReactNode;
  logo?: React.ReactNode;
  addonBeforeType?: React.ReactNode;
  isWithController?: boolean;
  errors?: any;
  errorText?: string;
  labelName?: string;
  name?: string;
}

const CustomInputTailwindFieldContainer: React.FC<
  CustomInputTailwindFieldContainerProps
> = ({
  label,
  isMandatory = true,
  children,
  addonBeforeType,
  logo,
  errors,
  isWithController,
  errorText,
  labelName,
  name,
}) => {
  return (
    <div>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {isMandatory && <span className="text-red-500"> *</span>}
      </label>
      {addonBeforeType === "Logo" ? (
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {logo}
          </div>
          {children}
        </div>
      ) : addonBeforeType === "AreaLogo" ? (
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            {logo}
          </span>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
      {errors && errors[name] && isWithController ? (
        <p className="mt-1 text-sm text-red-600 dark:text-red-500">
          {errorText ? errorText : `${labelName} is required`}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};
export default CustomInputTailwindFieldContainer;
