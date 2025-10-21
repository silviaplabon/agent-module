/* eslint-disable no-unused-vars */
import axios from "axios";

export const LovAPI = {
  getLov: async function (
    // token,
    url,
    labelKey,
    valueKey,
    cancelToken,
    labelOptionKey,
    sortByMeaning,
    oneOtherLabel,
    descriptionKey,
    lovOtherUrl
  ) {
    // || import.meta.env.VITE_BASE_API_URL;
    const output = { data: [], isRequestCancelled: false };
    const axiosReq = {
      url: !lovOtherUrl
        ? `${import.meta.env.VITE_BASE_API_URL}/admin/lookup/${url}`
        : `${import.meta.env.VITE_BASE_API_URL}/${url}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
      cancelToken: cancelToken?.token,
    };

    return await axios
      .request(axiosReq)
      .then((response: any) => {
        const data = Array?.isArray(response?.data?.lines)
          ? response.data.lines
          : Array.isArray(response?.data)
          ? response.data
          : [];

        const final = data?.map((item, index) => {
          let label = oneOtherLabel
            ? `${item[oneOtherLabel]} - ${item[labelKey]}`
            : item[labelKey]
            ? item[labelKey]
            : labelOptionKey
            ? item[labelOptionKey]
            : "";
          if (descriptionKey && item[descriptionKey]) {
            label += ` - ${item[descriptionKey]}`;
          }
          return {
            label: label,
            value: String(item[valueKey]),
            key: `${item[valueKey]}-${index}`,
            data: item,
          };
        });

        return {
          data:
            final?.length > 0
              ? sortByMeaning
                ? final.sort((a, b) =>
                    a?.data?.meaning?.localeCompare(b?.data?.meaning)
                  )
                : final
              : [],
          isError: false,
          errorMessage: "",
          hasNextPage: response?.data?.hasNextPage || false,
          totalPages: response?.data?.totalPages || 0,
          noOfPages: response?.data?.noOfPages || 0,
        };
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          output.isRequestCancelled = true;
          return output;
        } else {
          return {
            data: [],
            isError: true,
            errorMessage: e?.response?.data || e?.message,
            isRequestCancelled: false,
            hasNextPage: false,
            totalPages: 0,
            noOfPages: 0,
          };
        }
      });
  },
  getStaticLov: async function (listName, cancelToken) {
    const output = { data: [], isRequestCancelled: false };
    const axiosReq = {
      url: `${
        import.meta.env.VITE_BASE_API_URL
      }/inventory/setup/static/list?listName=${listName}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      maxBodyLength: Infinity,
      cancelToken: cancelToken?.token,
    };
    return await axios
      .request(axiosReq)
      .then((response: any) => {
        const data = Array?.isArray(response?.data?.lines)
          ? response.data.lines
          : Array.isArray(response?.data)
          ? response.data
          : [];

        const final = data?.map((item, index) => {
          return {
            label: item,
            value: item,
            key: `${item}-${index}`,
            data: { label: item, value: item },
          };
        });

        return {
          data: final,
          isError: false,
          errorMessage: "",
          hasNextPage: response?.data?.hasNextPage || false,
          totalPages: response?.data?.totalPages || 0,
          noOfPages: response?.data?.noOfPages || 0,
        };
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          output.isRequestCancelled = true;
          return output;
        } else {
          return {
            data: [],
            isError: true,
            errorMessage: e?.response?.data || e?.message,
            isRequestCancelled: false,
            hasNextPage: false,
            totalPages: 0,
            noOfPages: 0,
          };
        }
      });
  },
};
