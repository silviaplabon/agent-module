import axios from "axios";
import { CommonAPI } from "./common";

export const GetPropertiesLov = async (
  typeOfLov,
  searchText,
  pageNo,
  property,
  cancelTokenRef,
  needToAddPropertyName
) => {
  const queries = [];
  if (typeOfLov === "property" && searchText) {
    queries.push({
      attribute: "propertyName",
      operator: "CONTAINS",
      value: searchText,
    });
  } else if (typeOfLov == "tower" && property?.propertyId) {
    queries.push({
      attribute: "propertyId",
      operator: "=",
      value: property?.propertyId,
    });
    if (searchText) {
      queries.push({
        attribute: "towerName",
        operator: "CONTAINS",
        value: searchText,
      });
    }
  }

  if (cancelTokenRef?.current) {
    cancelTokenRef?.current?.cancel("Operation canceled due to new request.");
  }
  cancelTokenRef.current = axios.CancelToken.source();

  const resData = await CommonAPI.getPageData(
    `inventory/process/${typeOfLov}/q`,
    "POST",
    {
      pageNumber: pageNo,
      limit: 50,
      query: queries,
    },
    true,
    cancelTokenRef?.current
  );

  if (resData?.data && !resData?.errorMessage) {
    return {
      lov:
        resData.data?.map((item) => ({
          label:
            typeOfLov === "property"
              ? item?.propertyName
              : needToAddPropertyName
              ? `${item?.towerName} (${item?.propertyName})`
              : item?.towerName,
          value: typeOfLov === "property" ? item?.propertyId : item?.towerId,
          ...item,
        })) || [],
    };
  } else {
    return { lov: [] };
  }
};

export const GetUnitsLov = async (searchText, pageNo, cancelTokenRef) => {
  const queries = [];
  if (cancelTokenRef?.current) {
    cancelTokenRef?.current?.cancel("Operation canceled due to new request.");
  }
  cancelTokenRef.current = axios.CancelToken.source();
  if (searchText) {
    queries.push({
      attribute: "unitCode",
      operator: "CONTAINS",
      value: searchText,
    });
  }
  const resData = await CommonAPI.getPageData(
    "inventory/process/unit/q",
    "POST",
    {
      pageNumber: pageNo,
      limit: 50,
      query: queries,
    },
    true,
    cancelTokenRef?.current
  );
  if (resData?.data && !resData?.errorMessage) {
    return {
      lov: resData.data
        .filter((item) => item?.unitCode)
        .map((item) => ({
          label: `${item.unitCode}${
            item.propertyName ? ` (${item.propertyName})` : ""
          }`,
          value: item.unitId,
        })),
    };
  } else {
    return { lov: [] };
  }
};
