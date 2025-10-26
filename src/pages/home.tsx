import Dropdown from "@/components/dropdown";
import CustomInputTailwind from "@/components/Input/CustomInputTailwind";
import Modal from "@/components/Modal";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import HeaderCell from "@/components/Table/headerCell";
import HeaderColumn from "@/components/Table/headerColumn";

import Button from "@/components/ui/button";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { inputFieldCommonParams } from "@/utils/common";
import { DemoKey } from "@/utils/commonInputKeys";
import { Card } from "antd";
import {
  BlocksIcon,
  CheckCircle2Icon,
  CheckSquareIcon,
  Edit2Icon,
  EyeIcon,
  Trash2Icon,
  WarehouseIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AgreementPdf from "./agreementPdf";

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleCancel = () => setOpen(false);
  const handleRefresh = () => {};
  const [filterObj, setFilterObj] = useState({
    filterDetails: {
      isFilterExist: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data, getValues());
    reset();
  };
  const {
    formState: { errors },
    handleSubmit,
    control,
    clearErrors,
    setValue,
    trigger,
    getValues,
    reset,
  } = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  const buildInputProps = (keyName) => ({
    control,
    errors,
    clearErrors,
    setValue,
    ...inputFieldCommonParams,
    ...DemoKey[keyName],
  });

  const data = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+971-50-123-4567",
      status: "Active",
      propertiesSold: 8,
      registrationDate: "1/15/2024",
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      email: "sarah.ahmed@example.com",
      phone: "+971-55-234-5678",
      status: "Registered",
      propertiesSold: 0,
      registrationDate: "2/20/2024",
    },
    {
      id: 3,
      name: "Mohammed Ali",
      email: "mohammed.ali@example.com",
      phone: "+971-52-345-6789",
      status: "Active",
      propertiesSold: 18,
      registrationDate: "11/10/2023",
    },
    {
      id: 4,
      name: "Fatima Hassan",
      email: "fatima.hassan@example.com",
      phone: "+971-56-456-7890",
      status: "Active",
      propertiesSold: 6,
      registrationDate: "3/10/2024",
    },
    {
      id: 5,
      name: "Ahmed Khalil",
      email: "ahmed.khalil@example.com",
      phone: "+971-50-567-8901",
      status: "Terminated",
      propertiesSold: 2,
      registrationDate: "4/5/2024",
    },
  ];
  const handleFilter = (typeOfFilter, name, value, isEntered) => {
    setFilterObj((prev) => ({
      ...prev,
      [name]: value,
      filterDetails: {
        ...prev.filterDetails,
        isFilterExist: true,
      },
    }));

    if (isEntered) {
      // setPageDetails((prev) => ({ ...prev, pageNumber: 1 }));
      // fetchReqDetails(name, value, pageDetails?.pageLimit, 0);
    }
  };

  const getLovData = async (name, value) => {
    // if (name === "unitClassification") {
    //   const data = await handleLov("UNIT_CLASSIFICATION", "");
    //   return data;
    // } else if (name === "unitStatus") {
    //   const data = await handleLov("UNIT_STATUS", "");
    //   return data;
    // } else if (name === "unitView") {
    //   const data = await handleLov("UNIT_VIEW", "");
    //   return data;
    // }

    if (name === "name") {
      return {
        lov: [
          { value: "John Smith", label: "John Smith" },
          { value: "Sarah Ahmed", label: "Sarah Ahmed" },
          { value: "Mohammed Ali", label: "Mohammed Ali" },
          { value: "Fatima Hassan", label: "Fatima Hassan" },
          { value: "Ahmed Khalil", label: "Ahmed Khalil" },
        ],
      };
    }
    return { lov: [] };
  };

  const getHeaderColumn = (
    title: string,
    name: string,
    typeOfFilter?: string,
    minMaxWidth?: [number, number]
  ) => (
    <HeaderCell
      title={title}
      name={name}
      filterObj={filterObj}
      getLovData={getLovData}
      handleFilter={handleFilter}
      typeOfFilter={typeOfFilter}
      isFilterItemsVisible={true}
      minWidth={minMaxWidth ? minMaxWidth[0] : undefined}
      maxWidth={minMaxWidth ? minMaxWidth[1] : undefined}
    />
  );

  const columns = [
    {
      title: getHeaderColumn("ID", "id", "Text"),
      dataIndex: "id",
      width: 50,
    },
    {
      title: getHeaderColumn("Name", "name", "SelectDropdown"),
      dataIndex: "name",
      width: 140,
    },
    {
      title: getHeaderColumn("Email", "email", "Text"),
      dataIndex: "email",
      width: 160,
    },
    {
      title: getHeaderColumn("Phone", "phone", "Text"),
      dataIndex: "phone",
      width: 100,
    },
    {
      title: getHeaderColumn("Status", "status", "Text"),
      dataIndex: "status",
      width: 120,
    },
    {
      title: getHeaderColumn("Properties Sold", "propertiesSold", "Number"),
      dataIndex: "propertiesSold",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 120,
      isHidden: false,
      render: (_value, row) => (
        <div className="flex gap-2">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => alert(`Edit ${row.name}`)}
          >
            <Edit2Icon className="w-5 h-5 "></Edit2Icon>
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => alert(`Edit ${row.name}`)}
          >
            <EyeIcon className="w-5 h-5 "></EyeIcon>
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => alert(`Edit ${row.name}`)}
          >
            <WarehouseIcon className="w-5 h-5 "></WarehouseIcon>
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => alert(`Edit ${row.name}`)}
          >
            <CheckCircle2Icon
              className="w-5 h-5 text-green-500"
              enableBackground="green"
            ></CheckCircle2Icon>
          </button>
          <button
            className="text-blue-600 hover:underline"
            onClick={() => alert(`Edit ${row.name}`)}
          >
            <Trash2Icon className="w-5 h-5 " color="red"></Trash2Icon>
          </button>
        </div>
      ),
    },
  ];

  const [page, setPage] = React.useState(1);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-10"
      style={{ border: "1px solid red" }}
    >
      <AgreementPdf></AgreementPdf>
      <form
        className="w-full  p-4 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <CustomInputTailwind {...buildInputProps("name")} />
          <CustomInputTailwind {...buildInputProps("email")} />
          <CustomInputTailwind {...buildInputProps("phone")} />
          <CustomInputTailwind {...buildInputProps("address")} />
          <CustomInputTailwind {...buildInputProps("notes")} />
          <CustomInputTailwind {...buildInputProps("isAgreed")} />
        </div>

        <Modal
          open={open}
          setOpen={setOpen}
          handleCancel={handleCancel}
          handleRefresh={handleRefresh}
          modalTitle="Demo Modal"
        ></Modal>
        <div className="flex gap-4 my-6">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <Table columns={columns} data={data} />

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6"></div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            {/* <Button type="submit" className="w-full">
              Login
            </Button> */}
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </CardFooter>
        </Card>
        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
