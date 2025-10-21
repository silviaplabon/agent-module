import { Empty, Skeleton, Table, Typography } from "antd";

import React, { forwardRef, useEffect, useState } from "react";
import { FontFamily } from "@/utils/common";
import "../../styles/antTableStyle.css";

const CustomTable = forwardRef(
  (
    {
      pageNumber,
      changePageFn,
      noOfPages,
      pageLimit,
      tableWidth,
      dataSource,
      pageLoader,
      columns,
      totalCount,
      tableHeight,
      isTabsExist,
      hidePagination,
      className,
      extraHeight = 0,
      children,
      tableIndex,
      withoutTableDesign,
      hideShadow = false,
      loadedColumnsCount = 17,
      style,
      onRow,
      rowClassName,
    },
    ref
  ) => {
    return (
      <div
        className={` ${!hideShadow ? "contentContainerCardDiv" : ""} tablediv ${
          pageLoader ? "loadingTableDiv" : ""
        } ${className} `}
        style={{ marginBottom: "1rem" }}
        key={tableIndex}
      >
        <div
          style={{
            padding: isTabsExist ? "7px" : "0px",
            margin: withoutTableDesign
              ? "0 0 5px 0"
              : children
              ? "5px 0rem 5px"
              : "0",
            boxShadow: "none",
            width: "100%",
          }}
          key={`${tableIndex}-divContainer`}
          className={`${!withoutTableDesign ? "antTableWithoutHeaderItem " : ""} ${dataSource?.length<1?'emptyTable':""}`}
        >
          {children}
          <Table
            size="medium"
            className={`tableCustom ${
              isTabsExist ? "tableWithTabs" : "tableWithoutTable"
            }`}
            key={tableIndex}
            pagination={
              hidePagination || pageLoader
                ? false
                : {
                    showTotal: () => (
                      <div style={{ position: "absolute", left: 10 }}>
                        <Typography
                          style={{
                            font: `normal normal normal 12.6px ${FontFamily}`,
                          }}
                          key={`${tableIndex}-TotalCount`}
                        >
                          Total count :{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {totalCount}
                          </span>
                        </Typography>
                      </div>
                    ),
                    style: {
                      borderRadius: "0px",

                      paddingRight: "0.5rem",
                    },
                    current: pageNumber,
                    pageSizeOptions: ["10", "15", "20"],
                    showSizeChanger: true,
                    responsive: true,
                    onChange: (num, lim) => {
                      changePageFn(num, lim);
                    },
                    total: noOfPages * pageLimit,
                    pageSize: pageLimit,
                  }
            }
            locale={{
              emptyText: pageLoader ? (
                <div
                  style={{
                    overflow: "hidden",
                    marginTop: "0.6rem",
                    width: "96%",
                  }}
                >
                  {Array.from({ length: loadedColumnsCount }).map(
                    (_, index) => (
                      <Skeleton.Input
                        active={pageLoader}
                        size={"small"}
                        key={index}
                        block={true}
                        style={{ marginTop: "0.5rem" }}
                      />
                    )
                  )}
                </div>
              ) : (
                <Empty />
              ),
            }}
            responsive
            scroll={{
              x: tableWidth || "max-content",
              y: tableHeight ? tableHeight : "64vh",
            }}
            rowKey={(record) => record.key}
            dataSource={pageLoader ? [] : dataSource}
            loading={pageLoader}
            columns={columns}
            bordered
            ellipsis={true}
            borderColor="#000000"
            onRow={onRow}
            rowClassName={rowClassName}
          />
        </div>
      </div>
    );
  }
);

export default React.memo(CustomTable);
