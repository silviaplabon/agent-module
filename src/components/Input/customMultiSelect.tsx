/* eslint-disable react-hooks/exhaustive-deps */
import { AutoComplete, Select, Spin, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { DownOutlined } from "@ant-design/icons";
import CustomInputFieldContainer from "../Container/customInputFieldContainer.tsx";
import { FontFamily } from "@/utils/common.tsx";
import AntResult from "../AntResult.tsx";
import { type } from "os";

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
    defaultLov,
  } = props;

  const [searchText, setSearchText] = useState("");
  const [isLovLoading, setIsLovLoading] = useState(false);
  const [lov, setLov] = useState([]);
  const [filteredLov, setFilteredLov] = useState([]);
  const [isSearching, setIsSearching] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Select
        suffixIcon={<DownOutlined />}
        options={
          lov?.length > 0
            ? lov?.map((item) => ({
                label: item.label,
                value: item.value ?? item.label,
                data: item?.data,
              }))
            : defaultLov?.map((item) => ({
                label: item.label,
                value: item.value ?? item.label,
                data: item?.data,
              }))
        }
        mode="multiple"
        {...field}
        {...(!isWithController && { value: value })}
        style={{
          width: "100%",
          minWidth: minWidth ? minWidth : "150px",

          ...style,
          color: isFilterItem ? "#2b3a67" : "#222222",
        }}
        dropdownStyle={{
          width: isOpen ? "100%" : 300,
          ...dropdownStyle,
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
        value={(field?.value || []).map((item) => item.value)}
        addonAfter={addonAfter}
        addonBefore={addonBefore}
        autoComplete="nope"
        placeholder={placeholder}
        autoCorrect="off" // iOS
        autoCapitalize="off" // mobile
        spellCheck={false}
        className={`w-full  rounded-md text-xs customInputText ${
          isAddonElement ? "addonElementDropdown" : ""
        } ${isAddonAfter ? "addonElementAfterDropdown" : ""}`}
        onSelect={(val, option) => {
          const selectedItem = {
            ...option?.data,
            label: option.label,
            value: val,
          };

          const newValue = [
            ...(field.value || []).filter((i) => i.value !== val),
            selectedItem,
          ];
          field.onChange(newValue);
          if (setValue && codeKey)
            setValue(
              codeKey,
              newValue.map((i) => i.value)
            );
          if (clearErrors && codeKey) clearErrors([codeKey]);

          if (handleSelection) handleSelection(newValue);
        }}
        onDeselect={(val) => {
          const newValue = (field.value || []).filter((i) => i.value !== val);
          field.onChange(newValue);
          if (setValue && codeKey)
            setValue(
              codeKey,
              newValue.map((i) => i.value)
            );
          if (handleSelection) handleSelection(newValue);
        }}
        allowClear={isClearDisabled ? false : true}
        onOpenChange={async (open) => {
          if (open) {
            if (isCharacterLimitedSearch) {
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

const CustomMultiSelect = (props) => {
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
  } = props;

  return (
    <>
      <CustomInputFieldContainer
        title={labelName}
        isMandatory={isRequired}
        gridSize={gridSize}
        style={{}}
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
              <Typography
                style={{
                  height: "14px",
                  font: `normal normal normal 14px ${FontFamily}`,
                }}
              ></Typography>
            ))}
        </div>
      </CustomInputFieldContainer>
    </>
  );
};
export default React.memo(CustomMultiSelect);
