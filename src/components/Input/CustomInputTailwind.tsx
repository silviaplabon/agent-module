import { Checkbox, ConfigProvider, DatePicker, Input, Radio } from "antd";
import { Controller } from "react-hook-form";
import React from "react";
import { FontFamily } from "@/utils/common.js";
import dayjs from "dayjs";
import CustomInputTailwindFieldContainer from "../Container/customInputTailwindFieldContainer";
import { cn } from "@/utils/commonKeys";

const RenderCustomInput = (props) => {
  const {
    field,
    showTime,
    name,
    isEditable,
    typeOfInput = "text",
    placeholder = "",
    handleOnChange,
    addonBefore,
    dateFormat = "DD-MMM-YYYY",
    inputType,
    labelName = "",
    rows,
    maxLength,
    isFilterItem,
    setValue,
    handleSelection,
    lov,
    codeKey,
    isRangePicker = false,
    isWithController,
    value,
    popoverClassName,
    addonAfter,
    handleOnBlur,
    minRows,
    maxRows,
    prefix,
    clearErrors,
    isPrefixAdded,
    isNeedToDisable,
    style,
    children,
    addonBeforeType,
    errors,
    errorText,
  } = props;
  const { RangePicker } = DatePicker;
  return (
    <>
      {/* DATE PICKER */}

      {inputType === "Date" &&
        (isRangePicker ? (
          // <RangePicker
          //   className="w-full inputText customInputDateField createDateRangePicker"
          //   size="small"
          //   showTime={showTime}
          //   style={{
          //     height: 25,
          //     width: "100%",
          //     color: isFilterItem ? "#2b3a67" : "#222222",
          //     font: `normal normal normal 14px ${FontFamily}`,
          //   }}
          //   placement={"bottomRight"}

          //   format={dateFormat}
          //   allowClear={isFilterItem}
          //   dropdownAlign={{ overflow: { adjustX: false, adjustY: false } }}
          //   onChange={(newValue) => {
          //     if (typeof handleOnChange === "function") {
          //       handleOnChange(newValue, isFilterItem ? isFilterItem : false);
          //     }
          //   }}
          //   onClear={() => {
          //     if (!isWithController) {
          //       if (typeof handleOnChange === "function") {
          //         handleOnChange("", isFilterItem);
          //       }
          //     }
          //   }}
          //   getPopupContainer={(trigger) => {
          //     const popover = document.querySelector(`.${popoverClassName}`);

          //     if (popover && getComputedStyle(popover)?.display !== "none") {
          //       return popover;
          //     } else {
          //       return (
          //         trigger.closest(".ant-popover-content") || document?.body
          //       );
          //     }
          //   }}
          // />
          // <div className="flex items-center gap-2">
          //   <input
          //     type="date"

          //     className="block w-36 p-2.5 border border-gray-300 rounded-sm bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          //     placeholder="Start date"
          //   />
          //   <span className="text-gray-500">to</span>
          //   <input
          //     type="date"
          //     className="block w-36 p-2.5 border border-gray-300 rounded-sm bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          //     placeholder="End date"
          //   />
          // </div>
          <></>
        ) : (
          <input
            type="date"
            onChange={(e) => {
              const newValue = e.target.value;
              // Format date if needed (native input returns YYYY-MM-DD)
              if (isWithController) {
                if (name && typeof clearErrors === "function") {
                  clearErrors([name]);
                }
                if (newValue !== field.value) {
                  setValue(name, newValue);
                }
              }
              if (typeof handleOnChange === "function") {
                handleOnChange(newValue);
              }
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                typeof handleOnChange === "function" &&
                !isWithController
              ) {
                handleOnChange(e.target.value, isFilterItem);
              }
            }}
            min={isNeedToDisable ? undefined : undefined}
            max={
              isNeedToDisable
                ? new Date().toISOString().split("T")[0]
                : undefined
            }
            {...field}
            {...(!isWithController && { value })}
            className="block w-48 p-2.5 border border-gray-300  bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />
        ))}

      {/* CHECKBOX */}
      {inputType === "Checkbox" && (
        <div className="flex items-center gap-4">
          {lov?.map((item, index) => {
            const checkboxId = `checked-checkbox-${index}`;
            return (
              <div className="flex items-center" key={checkboxId}>
                <input
                  id={checkboxId}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={field.value === item.label}
                  onChange={(e) => {
                    if (e.target.checked && isWithController) {
                      setValue(name, item.label);
                    } else {
                      setValue(name, "");
                    }
                  }}
                  value={item.label}
                  {...(!isWithController && { value })}
                />
                <label
                  htmlFor={checkboxId}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {item?.label}
                </label>
              </div>
            );
          })}
        </div>
      )}
      {/* INPUT FIELD */}
      {inputType === "Text" || inputType === "Number" ? (
        <input
          type={inputType?.toLowerCase()}
          id={name}
          {...field}
          {...(!isWithController && {
            value: value ? value : inputType == "number" ? "0" : "",
          })}
          disabled={!isEditable}
          aria-disabled={!isEditable}
          className={
            errors && errors[name] && isWithController
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : `bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
      ${addonBeforeType === "Logo" ? " ps-10" : ""}
      ${addonBeforeType === "AreaLogo" ? " rounded-s-none" : ""}`
          }
          placeholder={placeholder}
          onChange={(e) => {
            const newValue = e.target.value;
            if (isWithController) {
              if (name) {
                clearErrors([name]);
              }
              if (newValue !== field.value) {
                setValue(name, newValue);
              }
            }
            if (typeof handleOnChange === "function") {
              handleOnChange(newValue, newValue === "" ? isFilterItem : false);
            }
          }}
          onBlur={() => {
            if (typeof handleOnBlur === "function") {
              handleOnBlur();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && typeof handleOnChange === "function") {
              handleOnChange(
                e.target.value,
                isFilterItem ? e.key === "Enter" && isFilterItem : false
              );
            }
          }}
          onClear={() => {
            if (typeof handleOnChange === "function") {
              handleOnChange("", isFilterItem);
            }
          }}
          allowClear={isFilterItem}
          required
        />
      ) : (
        <></>
      )}
      {/* RADIO */}
      {inputType === "Radio" && (
        <div className="flex items-center gap-6 w-full h-7">
          {lov
            ?.filter((item) => item.label)
            ?.map((item, index) => {
              const radioId = `${name || labelName}-radio-${index}`;
              return (
                <label
                  key={radioId}
                  htmlFor={radioId}
                  className={`flex items-center cursor-pointer text-sm font-normal ${
                    isFilterItem ? "text-[#2b3a67]" : "text-[#222222]"
                  } ${item.disabled ? "text-gray-400 dark:text-gray-500" : ""}`}
                  style={{ fontFamily: FontFamily }}
                >
                  <input
                    type="radio"
                    id={radioId}
                    name={name || labelName}
                    value={item.value}
                    checked={field.value === item.value}
                    readOnly={item.readonly}
                    disabled={item.disabled}
                    onChange={(e) => {
                      if (isWithController) {
                        if (name) setValue(name, e.target.value);
                        if (name && typeof clearErrors === "function")
                          clearErrors([name]);
                      }

                      const filteredCaseEntities = lov?.filter(
                        (lovData) => lovData.value === e.target.value
                      );

                      if (
                        filteredCaseEntities?.length > 0 &&
                        isWithController
                      ) {
                        setValue(codeKey, filteredCaseEntities[0].value);
                      }

                      if (typeof handleSelection === "function") {
                        handleSelection(
                          e.target.value,
                          filteredCaseEntities?.length > 0
                            ? filteredCaseEntities[0]
                            : {}
                        );
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    {...(!isWithController && { value })}
                  />
                  <span className="ml-2">{item.label}</span>
                </label>
              );
            })}
        </div>
      )}
      {inputType === "TextArea" && (
        <textarea
          id="message"
          onChange={(e) => {
            if (typeof handleOnChange === "function") {
              handleOnChange(e.target.value);
            }
            if (isWithController) {
              if (e.target.value?.length < maxLength) {
                setValue(name, e.target.value);
              } else {
                setValue(name, e.target.value);
              }
              if (name && typeof clearErrors === "function") {
                clearErrors([name]);
              }
            } else {
              if (typeof handleOnChange === "function") {
                handleOnChange(e.target.value);
              }
            }
          }}
          {...(!isWithController && { value: value })}
          placeholder="Write your thoughts here..."
          className={cn(
            "block p-2.5 w-full text-sm min-h-[80px] max-h-[200px] resize-y",
            errors && errors[name] && isWithController
              ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
              : "text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          )}
        ></textarea>
      )}

      {children}
    </>
  );
};
const CustomInputTailwind = (props) => {
  const {
    value,
    name,
    inputType,
    labelName = "",
    isRequired = false,
    control,
    errors,
    errorText,
    isWithController,
    popoverClassName,
    hideErrorMessageContainer = false,
    gridSize,
    titleStyle,
    logo,
    addonBeforeType,
  } = props;

  return (
    <>
      <CustomInputTailwindFieldContainer
        label={labelName}
        isMandatory={isRequired}
        logo={logo}
        addonBeforeType={addonBeforeType}
        errors={errors}
        {...props}
      >
        {isWithController ? (
          <Controller
            name={name}
            control={isWithController ? control : ""}
            defaultValue={null}
            rules={{
              validate: (value) => value !== `Select ${labelName}`,
              required: {
                value: isRequired,
                message: `${labelName} is required`,
              },
            }}
            render={({ field }) => (
              <RenderCustomInput
                field={field}
                isWithController={true}
                {...props}
              ></RenderCustomInput>
            )}
          />
        ) : (
          <RenderCustomInput
            value={value}
            isWithController={false}
            inputType={inputType}
            {...props}
          ></RenderCustomInput>
        )}
      </CustomInputTailwindFieldContainer>
    </>
  );
};

export default React.memo(CustomInputTailwind);
