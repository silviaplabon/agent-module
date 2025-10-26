import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Controller } from "react-hook-form";

interface OptionType {
  label: string;
  value: string;
  [key: string]: any;
}

interface AutoCompleteComponentProps {
  options?: OptionType[];
  getLovData?: (
    name?: string,
    value?: string
  ) => Promise<{ lov: OptionType[] }>;
  handleSelection?: (value: string, option: OptionType) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  minWidth?: string | number;
  className?: string;
  field?: any;
  clearErrors?: (fields: string[]) => void;
  codeKey?: string;
  setValue?: (name: string, value: string) => void;
  dropdownStyle?: React.CSSProperties;
  errors?: any;
  isWithController?: boolean;
}

const AutoCompleteComponent: React.FC<AutoCompleteComponentProps> = ({
  options = [],
  getLovData,
  handleSelection,
  value = "",
  placeholder,
  disabled,

  minWidth,
  className,
  field,
  clearErrors,
  codeKey,
  setValue,
  dropdownStyle,
  errors,
  isWithController,
}) => {
  const [searchText, setSearchText] = useState(value || field?.value || "");
  const [isLovLoading, setIsLovLoading] = useState(false);
  const [lov, setLov] = useState<OptionType[]>(options);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const blurTimeout = useRef<NodeJS.Timeout | null>(null);

  // ✅ Initial load — fetch LOV on mount
  useEffect(() => {
    const fetchInitialLov = async () => {
      if (getLovData) {
        setIsLovLoading(true);
        try {
          const data = await getLovData(codeKey, "");
          setLov(data.lov);
        } catch (e) {
          console.error("Failed to fetch LOV:", e);
        } finally {
          setIsLovLoading(false);
        }
      }
    };
    fetchInitialLov();
  }, [getLovData, codeKey]);

  // ✅ Sync search text with both value and field.value
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setSearchText(value);
    } else if (field?.value) {
      setSearchText(field.value);
    }
  }, [value, field?.value]);

  // ✅ Sync local LOV with props
  useEffect(() => {
    if (options?.length > 0) {
      setLov(options);
    }
  }, [options]);

  // ✅ Calculate dropdown position
  useEffect(() => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  }, [open]);

  const handleSelect = (opt: OptionType) => {
    setSearchText(opt.label);
    setOpen(false);

    if (field?.onChange) field.onChange(opt.label);
    if (setValue && codeKey) setValue(codeKey, opt.value);
    if (clearErrors && codeKey) clearErrors([codeKey]);
    if (handleSelection) handleSelection(opt.value, opt);
  };

  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    setOpen(true);
  };

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => setOpen(false), 150);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);
    if (field?.onChange) field.onChange(val);
    if (getLovData) {
      setIsLovLoading(true);
      try {
        const data = await getLovData(codeKey, val);
        setLov(data.lov);
      } catch (e) {
        console.error("Error fetching LOV:", e);
      } finally {
        setIsLovLoading(false);
      }
    }
  };

  return (
    <>
      <div ref={buttonRef} className="relative w-full">
        <input
          type="text"
          className={`block w-full p-2.5 text-sm ${
            errors && errors[name] && isWithController
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          }`}
          value={searchText}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onClick={() => setOpen(true)}
          onBlur={handleBlur}
          autoComplete="off"
          style={typeof minWidth === "number" ? { width: minWidth } : undefined}
        />

        <span className="absolute right-2 top-2">
          {open ? (
            <ChevronUpIcon className="w-4 h-4 inline" />
          ) : (
            <ChevronDownIcon className="w-4 h-4 inline" />
          )}
        </span>
      </div>

      {open &&
        createPortal(
          <ul
            className="absolute bg-white border border-gray-200 rounded shadow-lg z-[99999]"
            style={{
              top: coords.top,
              left: coords.left,
              width: coords.width,
              position: "absolute",
              maxHeight: 200,
              overflowY: "auto",
              ...dropdownStyle,
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {isLovLoading ? (
              <li className="px-3 py-2 text-gray-500 text-sm">Loading...</li>
            ) : lov?.length > 0 ? (
              lov.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 hover:bg-blue-100 text-gray-700"
                    onMouseDown={() => handleSelect(opt)}
                  >
                    {opt.label}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500 text-sm">
                No results found
              </li>
            )}
          </ul>,
          document.body
        )}
    </>
  );
};

interface CustomAutoCompleteProps {
  labelName?: string;
  name: string;
  control?: any;
  isRequired?: boolean;
  errors?: any;
  errorText?: string;
  placeholder?: string;
  options?: OptionType[];
  value?: string;
  [key: string]: any;
}

const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({
  labelName,
  name,
  control,
  isRequired,
  errors,
  errorText,
  placeholder,
  options,
  value,
  ...rest
}) => {
  const error = errors && errors[name];

  return (
    <div className="mb-4 w-full">
      {labelName && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {labelName}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {control ? (
        <Controller
          name={name}
          control={control}
          rules={{
            required: isRequired ? `${labelName} is required` : false,
          }}
          render={({ field }) => (
            <AutoCompleteComponent
              {...rest}
              field={field}
              value={value || field.value}
              options={options}
              error={!!error}
              placeholder={placeholder}
            />
          )}
        />
      ) : (
        <AutoCompleteComponent
          {...rest}
          value={value}
          options={options}
          placeholder={placeholder}
          error={!!error}
        />
      )}

      {error && (
        <span className="text-xs text-red-500 mt-1">
          {errorText || `${labelName} is required`}
        </span>
      )}
    </div>
  );
};

export default React.memo(CustomAutoComplete);
