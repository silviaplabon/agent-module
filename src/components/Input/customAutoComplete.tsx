/* eslint-disable react-hooks/exhaustive-deps */
import { AutoComplete, Spin, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { DownOutlined } from "@ant-design/icons";
import CustomInputFieldContainer from "../Container/customInputFieldContainer.tsx";
import { FontFamily } from "@/utils/common.tsx";
import AntResult from "../AntResult.tsx";

const AutoCompleteComponent = (props) => {
  const {
    isCharacterLimitedSearch = false,
    getLovData,
    handleSelection,
    handleOnSearch,
    value,
    isWithController,
    setValue,
    codeKey,
    minWidth,
    field,
    fontFamily,
    isFilterItem,
    labelName,
    placeholder,
    addonAfter,
    addonBefore,
    style,
    disabled,
    clearErrors,
    defaultValue = "",
    isClearDisabled = false,
    dropdownStyle,
    handleOpenChange,
    getValues,
    lovLabelKey,
    isAddonElement,
    isAddonAfter,
    className,
  } = props;

  const [searchText, setSearchText] = useState("");
  const [isLovLoading, setIsLovLoading] = useState(false);
  const [lov, setLov] = useState([]);
  const [filteredLov, setFilteredLov] = useState([]);
  const [isSearching, setIsSearching] = useState("");

  const handleSelectChange = (val1, val2: unknown) => {
    if (isWithController) {
      setValue(`${codeKey}`, val1 || defaultValue);
    }
  };

  return (
    <>
      <AutoComplete
        suffixIcon={<DownOutlined />}
        options={
          lov?.length < 1
            ? !isLovLoading && isCharacterLimitedSearch && !searchText
              ? [
                  {
                    label: `Please enter more characters to search...`,
                    value: "",
                    disabled: true,
                  },
                ]
              : []
            : lov
        }
        {...field}
        {...(!isWithController && { value: isSearching ? searchText : value })}
        dropdownStyle={{ ...dropdownStyle }}
        style={{
          width: "100%",
          minWidth: minWidth ? minWidth : "150px",
          height: 30,
          color: isFilterItem ? "#2b3a67" : "#222222",
          ...style,
        }}
        disabled={disabled}
        notFoundContent={
          isLovLoading ? (
            <div className="spinContainer ">
              <Spin size="small" />
            </div>
          ) : (
            <AntResult
              typeOfResult="datanotexist"
              onClick={undefined}
              redirectTitle={undefined}
            />
          )
        }
        autoComplete="nope"
        placeholder={placeholder}
        autoCorrect="off" // iOS
        autoCapitalize="off" // mobile
        spellCheck={false}
        className={`w-full  text-xs customInputText ${
          isAddonElement ? "addonElementDropdown" : ""
        } ${isAddonAfter ? "addonElementAfterDropdown" : ""} ${className}`}
        onSelect={(val1, val2) => {
          if (val2?.isOnclick) {
            val2?.onClick();
          } else {
            setSearchText(val2?.label);
            setIsSearching(false);
            if (isWithController) {
              if (labelName == "Code") {
                field.onChange(val2?.data?.phoneCode);
              } else {
                field.onChange(val2.label);
              }
              if (codeKey && typeof clearErrors === "function") {
                clearErrors([codeKey]);
              }
            }
            handleSelectChange(val1, val2);
            if (typeof handleSelection === "function") {
              handleSelection(val1, val2);
            }
          }
        }}
        allowClear={isClearDisabled ? false : true}
        onClear={() => {
          if (!isClearDisabled) {
            if (isWithController) {
              field.onChange();
              handleSelectChange(codeKey === "currencyCode" ? "AED" : "", "");
            }
            if (typeof handleSelection === "function") {
              handleSelection(
                codeKey === "currencyCode" ? "AED" : "",
                "",
                true
              );
            }
          }
        }}
        onBlur={() => {
          if (
            searchText &&
            lov?.filter(
              (item) =>
                item?.label === searchText ||
                item?.data?.[lovLabelKey] === searchText
            ).length === 0
          ) {
            if (typeof setValue === "function") {
              setValue(codeKey, "");
              setSearchText("");
            }
            if (isWithController) {
              field.onChange("");
            }
          }

          if (
            typeof handleOnSearch === "function" &&
            searchText === "" &&
            isSearching
          ) {
            handleOnSearch("");
          }
        }}
        onOpenChange={async (open) => {
          if (open) {
            if (!isCharacterLimitedSearch) {
              setIsLovLoading(true);
              const data = await getLovData();
              setIsLovLoading(false);
              setLov(data?.lov ? data.lov : []);
              setFilteredLov(data?.lov ? data.lov : []);
            } else if (isCharacterLimitedSearch) {
              setIsSearching(true);
              setSearchText(value);
              setIsLovLoading(true);

              const data = await getLovData(
                isSearching ? searchText : !isSearching ? value : ""
              );
              if (!data?.isCancelledApi) {
                setIsLovLoading(false);
              }
              setLov(data.lov);
            } else {
              const data = await getLovData("", true);
              setIsLovLoading(false);
              setLov(data?.lov ? data.lov : []);
            }
          }
        }}
        onSearch={async (text) => {
          if (typeof setValue === "function" && isCharacterLimitedSearch) {
            // setValue(codeKey, text);
            // setValue(name, text);
            // setValue(codeKey, "");
          }

          setSearchText(text);
          if (typeof handleOnSearch === "function") {
            handleOnSearch(text);
          }
          if (isCharacterLimitedSearch) {
            setIsSearching(true);

            setIsLovLoading(true);
            const data = await getLovData(text);
            if (!data?.isCancelledApi) {
              setIsLovLoading(false);
            }
            setLov(data.lov);
          } else {
            setIsSearching(true);
            const temp = lov?.filter((item) =>
              item?.label?.toLowerCase().includes(text?.toLowerCase())
            );
            setFilteredLov(temp);
          }
        }}
      />
    </>
  );
};

const CustomAutoComplete = (props) => {
  const {
    isWithController,
    labelName,
    name,
    control,
    isRequired,
    errors,
    errorText,
    gridSize,
    hideErrorMessageContainer,
    placeholder,
    value,
    colStyle,
  } = props;

  return (
    <>
      <CustomInputFieldContainer
        title={labelName}
        isMandatory={isRequired}
        gridSize={gridSize}
        style={{}}
        colStyle={colStyle}
      >
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          className={
            errors && errors[name] ? "errorInputText" : "validInputContainer"
          }
        >
          {isWithController ? (
            <Controller
              name={name}
              control={isWithController ? control : ""}
              defaultValue={!isWithController ? value : ""}
              rules={{
                validate: (value) => value !== `Select ${labelName}`,
                required: {
                  value: isRequired,
                  message: `${labelName} is required`,
                },
              }}
              render={({ field }) => (
                <AutoCompleteComponent
                  field={field}
                  fontFamily={FontFamily}
                  isWithController={true}
                  {...props}
                ></AutoCompleteComponent>
              )}
            />
          ) : (
            <AutoCompleteComponent {...props}></AutoCompleteComponent>
          )}
          {!hideErrorMessageContainer &&
            (errors && errors[name] && isWithController ? (
              <Typography
                style={{
                  height: "14px",
                  font: `normal normal normal 14px ${FontFamily}`,
                  marginBottom: "0.5rem",
                  color: "red",
                }}
              >
                {errorText ? errorText : `${labelName} is required`}
              </Typography>
            ) : (
              <></>
            ))}
        </div>
      </CustomInputFieldContainer>
    </>
  );
};
export default React.memo(CustomAutoComplete);
