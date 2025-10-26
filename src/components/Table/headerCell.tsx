import AutoCompleteComponent from "../Input/customAutoComplete";
import CustomAutoComplete from "../Input/customAutoComplete";
import CustomInputTailwind from "../Input/CustomInputTailwind";

const HeaderCell = ({
  isFilterItemsVisible,
  maxWidth,
  typeOfFilter,
  name,
  filterObj,
  getLovData,
  handleFilter,
}) => {
  return (
    <>
      {isFilterItemsVisible && (
        <div
          style={{
            width: "100%",
            maxWidth: maxWidth ? maxWidth : "200px",
            marginTop: "0",
          }}
        >
          {typeOfFilter === "Text" || typeOfFilter === "Number" ? (
            <CustomInputTailwind
              inputType={"Text"}
              isWithController={false}
              typeOfInput={typeOfFilter === "Number" ? "number" : "text"}
              name={name}
              isRequired={false}
              isFilterItem={true}
              isEditable={true}
              value={
                filterObj
                  ? filterObj[`${name}`]
                    ? filterObj[`${name}`]
                    : ""
                  : ""
              }
              placeholderText=""
              handleOnChange={(value, isEntered) => {
                if (typeof handleFilter === "function") {
                  handleFilter(typeOfFilter, name, value, isEntered);
                }
              }}
              hideErrorMessageContainer={true}
            ></CustomInputTailwind>
          ) : typeOfFilter === "Date" ? (
            // <CustomInputTailwind
            //   labelName=""
            //   name="value"
            //   errorText={"Policy Start Date must have some values"}
            //   dateFormat="DD-MM-YYYY"
            //   isRequired={false}
            //   isRangePicker={true}
            //   gridSize={GridSize}
            //   inputType={"Date"}
            //   allowClear={true}
            //   value={
            //     filterObj
            //       ? filterObj[`${name}`]
            //         ? filterObj[`${name}`]?.length > 1
            //           ? [
            //               dayjs(filterObj[`${name}`][0]),
            //               dayjs(filterObj[`${name}`][1]),
            //             ]
            //           : null
            //         : null
            //       : null
            //   }
            //   hideErrorMessageContainer={true}
            //   handleOnChange={(value, isEntered) => {
            //     if (typeof handleFilter === "function") {
            //       handleFilter(typeOfFilter, name, value, isEntered);
            //     }
            //   }}
            //   isFilterItem={true}
            // ></CustomInput>
            <></>
          ) : (
            typeOfFilter === "SelectDropdown" && (
              <CustomAutoComplete
                isCharacterLimitedSearch={false}
                getLovData={() => {
                  if (typeof getLovData === "function") {
                    return getLovData(name);
                  } else {
                    return [];
                  }
                }}
                // minWidth={minWidth}
                // maxWidth={maxWidth}
                handleSelection={(value, val2) => {
                  if (typeof handleFilter === "function") {
                    handleFilter(typeOfFilter, name, val2, true);
                  }
                }}
                isWithController={false}
                handleOnSearch=""
                value={
                  filterObj
                    ? filterObj[`${name}`]
                      ? filterObj[`${name}`]["label"]
                      : ""
                    : ""
                }
                isFilterItem={true}
                name={name}
              ></CustomAutoComplete>
            )
          )}
        </div>
      )}
      {!isFilterItemsVisible && (
        <div style={{ height: "25px", marginTop: "0.2rem" }}></div>
      )}
    </>
  );
};
export default HeaderCell;
