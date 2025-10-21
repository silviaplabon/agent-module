import { CONSTANTS } from "@/utils/common";
import { message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { LovAPI } from "./lov";
export const CommonAPI = {
  getPageData: async function (
    url: string,
    method: string,
    data?: unknown,
    ignoreToastMessage?: boolean,
    cancelToken?: unknown,
    baseUrl?: unknown,
    token?: unknown,
    returnRawResponse?: boolean
  ) {
    const output = { data: [], isRequestCancelled: false };
    const axiosReq = {
      url: baseUrl
        ? `${baseUrl}${url}`
        : `${import.meta.env.VITE_BASE_API_URL}/${url}`,
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      jsonColumn: "Property_Attributes",
      maxBodyLength: Infinity,
      cancelToken: cancelToken?.token,
      data:
        method === "POST" || method === "PUT" || method === "DELETE"
          ? data
          : undefined,
    };

    return await axios
      .request(axiosReq)
      .then((response) => {
        let errorMessage = "";
        if (returnRawResponse) {
          return response;
        } else {
          if (response?.data?.errorLines) {
            response?.data?.errorLines?.map((item) => {
              errorMessage = errorMessage
                ? `${errorMessage}, ${item?.message}`
                : `${item?.message}`;
            });
          }

          if (errorMessage) {
            message.error(errorMessage);
          }

          const res = {
            data: response?.data?.lines
              ? response?.data?.lines
              : response?.data?.line?.data
              ? response?.data?.line?.data
              : response?.data?.data
              ? response.data.data
              : response?.data
              ? response.data
              : [],
            stats: response?.data?.stats ? response.data.stats : [],
            summary: response?.data?.line?.summary
              ? response.data.line?.summary
              : [],
            errorMessage:
              response?.status === 204 ? response?.statusText : errorMessage,
            isError: response?.status === 204 ? true : false,
            totalResults: response?.data?.totalResults
              ? response.data.totalResults
              : response?.totalResults
              ? response?.totalResults
              : 0,
            message:
              typeof response?.data?.message === "string" &&
              typeof response?.data?.line === "string"
                ? `${response?.data?.line} - ${response?.data?.message}`
                : response?.data?.message
                ? response?.data?.message
                : "",
            noOfPages: response?.data?.noOfPages || 0,
          };

          return res;
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          output.isRequestCancelled = true;
          return output;
        } else {
          console.log(e, "e-----line90");
          let errorMessage = "";
          if (e?.response?.data?.violations) {
            e?.response?.data?.violations?.map((item) => {
              errorMessage = errorMessage
                ? `${errorMessage}, ${item?.message}`
                : `${item?.message}`;
            });
          } else if (e?.response?.data?.errorLines) {
            e?.response?.data?.errorLines?.map((item) => {
              errorMessage = errorMessage
                ? `${errorMessage}, ${item?.message}`
                : `${item?.message}`;
            });
          } else if (e?.response?.data?.error) {
            errorMessage = e?.response?.data?.error;
          }

          if (
            typeof e?.response?.data?.message === "string" &&
            typeof e?.response?.data?.line === "string"
          ) {
            errorMessage = `${e?.response?.data?.line} - ${e?.response?.data?.message}`;
          } else if (!errorMessage) {
            errorMessage = e?.response?.data
              ? typeof e?.response?.data === "string" &&
                e?.response?.data?.trim() !== ""
                ? e?.response?.data
                : ""
              : "";
          }
          const updatedErrorMessage = errorMessage
            ? errorMessage
            : e?.response?.data?.message
            ? e?.response?.data?.message
            : e?.message
            ? e.message
            : "Something Went Wrong";

          if (
            !ignoreToastMessage &&
            !updatedErrorMessage?.toLowerCase()?.includes("no content")
          ) {
            message.error(updatedErrorMessage);
          }
          return {
            data: [],
            errorMessage: updatedErrorMessage,
            isError: true,
            isRequestCancelled: false,
          };
        }
      });
  },

  generateSortTextAndCustomQuery: async (
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
    needToIgnoreSearchKeys = [],
    limit,
    pageNum
  ) => {
    try {
      const localData = localStorage.getItem(searchObjKey)
        ? JSON.parse(localStorage.getItem(searchObjKey))
        : {};
      let searchTemp = { ...localData };
      if (additionalSearchTemp) {
        searchTemp = { ...searchTemp, ...additionalSearchTemp };
      }
      const customQuery = additionalQueries;
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
                ? typeof searchTemp[record]["value"] === "string"
                  ? searchTemp[record]["value"]?.trim()
                  : searchTemp[record]["value"]
                : typeof searchTemp[record] === "string"
                ? searchTemp[record]?.trim()
                : searchTemp[record]
            ) {
              isQueryIncreased = true;
              customQuery.push({
                attribute: record,
                operator: "=",
                value:
                  typeof searchTemp[record] === "object"
                    ? typeof searchTemp[record]["value"] === "string"
                      ? searchTemp[record]["value"]?.trim()
                      : searchTemp[record]["value"]
                    : typeof searchTemp[record] === "string"
                    ? searchTemp[record]?.trim()
                    : searchTemp[record],
              });
            }
          } else {
            if (
              typeof searchTemp[record] === "object"
                ? searchTemp[record]["value"]
                  ? typeof searchTemp[record]["value"] === "string"
                    ? searchTemp[record]["value"]?.trim()
                    : searchTemp[record]["value"]
                  : ""
                : typeof searchTemp[record] === "string"
                ? searchTemp[record]?.trim()
                : searchTemp[record]
            ) {
              isQueryIncreased = true;
              customQuery.push({
                attribute: record,
                operator: "CONTAINS",
                value:
                  typeof searchTemp[record] === "object"
                    ? searchTemp[record]["value"]
                      ? searchTemp[record]["value"]?.trim()
                      : ""
                    : typeof searchTemp[record] === "string"
                    ? searchTemp[record]?.trim()
                    : searchTemp[record],
              });
            }
          }
          if (isQueryIncreased) {
            queryCount += 1;
          }
        }
      });

      localStorage.setItem(searchObjKey, JSON.stringify(searchTemp));
      let sortTemp = {};
      if (sortType) {
        const updatedSortType =
          sortObj[sortType] === "D"
            ? "A"
            : sortObj[sortType] === "A"
            ? ""
            : "D";
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
      const data = {
        limit: limit ? limit : 20,
        query: customQuery,
        sortText: sortText,
        pageNumber: pageNum ? pageNum : 0,
      };
      const filterDetails = { isFilterExist: false, filterCount: 0 };
      if (queryCount > 0) {
        filterDetails.isFilterExist = true;
        filterDetails.filterCount =
          queryCount > 0 ? queryCount - 1 : queryCount;
      }
      const output = {
        modifiedSortText: sortText,
        modifiedQueries: customQuery,
        queryCount: queryCount,
        data: data,
        filterDetails: filterDetails,
        sortTemp: sortTemp,
      };

      return output;
    } catch (e) {
      // console.log(e);
      // ToastMessage('error', e.message)
    }
  },
  saveLocalStorageKey: async (key, value, localStorageKey) => {
    if (localStorageKey) {
      const existing =
        localStorage.getItem(localStorageKey ? localStorageKey : "") || "{}";
      const localStorageItem = JSON.parse(existing);
      localStorageItem.key = value;

      localStorage.setItem(
        localStorageKey ? localStorageKey : CONSTANTS.INVENTORIESUNITS,
        JSON.stringify(localStorageItem)
      );
      return localStorageItem;
    } else {
      return "";
    }
  },
  savePropertyAndTower: async (property, tower, localStorageKey) => {
    const existing =
      localStorage.getItem(
        localStorageKey ? localStorageKey : CONSTANTS.INVENTORIESUNITS
      ) || "{}";
    const localStorageItem = JSON.parse(existing);
    const updatedLocalStorageItem = {};
    if (property !== "IGNORE") {
      if (property) {
        updatedLocalStorageItem.propertyId = property;
      }
    } else {
      updatedLocalStorageItem.propertyId = localStorageItem.propertyId;
    }
    if (tower !== "IGNORE") {
      if (tower) {
        updatedLocalStorageItem.towerId = tower;
      }
    } else {
      updatedLocalStorageItem.towerId = localStorageItem.towerId;
    }

    localStorage.setItem(
      localStorageKey ? localStorageKey : CONSTANTS.INVENTORIESUNITS,
      JSON.stringify(updatedLocalStorageItem)
    );
  },
  uploadFileInBulk: async (
    token,
    files,
    username,
    units,
    selectedDocCategory
  ) => {
    const formData = new FormData();

    formData.append("docCategory", selectedDocCategory);
    formData.append("isTemporary", false);
    formData.append("performedBy", username);
    formData.append("keyName", "UNIT_ID");
    formData.append("keyId", String(unit.unitId));

    files.forEach((file) => {
      formData.append("files", file.originFileObj, file.name);
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${
        import.meta.env.VITE_BASE_API_URL
      }/inventory/setup/document/upload`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    return await axios
      .request(config)
      .then((res) => {
        if (res?.data?.status === 200) {
          return { data: res?.data?.data, isUploaded: true };
        } else {
          return { data: res?.data?.data, isUploaded: false };
        }
      })
      .catch((err) => {
        return { data: {}, isUploaded: false, errorMessage: err?.message };
      });
  },

  uploadFile: async (
    token,
    files,
    username,
    unit,
    selectedDocCategory,
    knownAs
  ) => {
    const formData = new FormData();

    formData.append("docCategory", selectedDocCategory);
    formData.append("isTemporary", false);
    formData.append("performedBy", username);
    formData.append("keyName", "UNIT_ID");
    formData.append("keyId", String(unit.unitId));
    if (knownAs) {
      formData.append("knownAs", knownAs);
    }
    // if (selectedFile?.documentId) {
    //   formData.append("documentId", String(selectedFile.documentId));
    // }

    files.forEach((file) => {
      formData.append("files", file.originFileObj, file.name);
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${
        import.meta.env.VITE_BASE_API_URL
      }/inventory/setup/document/upload`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    return await axios
      .request(config)
      .then((res) => {
        if (res?.data?.lines?.length > 0) {
          return { data: res?.data?.lines, isUploaded: true };
        } else {
          message.error(res?.data?.message || "Something Went Wrong");
          return { data: res?.data?.data, isUploaded: false };
        }
      })
      .catch((err) => {
        console.log(err, "err");
        message.error(
          err.response?.data?.message
            ? err.response?.data?.message
            : err?.message
        );
        return { data: {}, isUploaded: false, errorMessage: err?.message };
      });
  },
  handleStaticLov: async (
    typeOfLov: string,
    searchUrl: string,
    cancelTokenRef
  ) => {
    if (cancelTokenRef?.current) {
      cancelTokenRef?.current?.cancel("Operation canceled due to new request.");
    }
    cancelTokenRef.current = axios.CancelToken.source();
    const resData = await LovAPI.getStaticLov(typeOfLov, searchUrl);

    return { lov: resData.data || [] };
  },
};
