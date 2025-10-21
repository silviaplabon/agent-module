import { Button } from "antd";
import "../styles/customButtonStyle.css";
import { ThemeData } from "@/utils/common";

const CustomButton = ({
  key,
  icon,
  title,
  handleOnClick,
  style,
  isDisabled,
  isBackground,
  isLoading,
  iconRight,
}) => {
  return (
    <Button
      key={key}
      loading={isLoading}
      onClick={handleOnClick}
      className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 ring-primary dark:ring-white hover:border-primary dark:hover:border-white hover:ring-1 hover:text-primary dark:hover:text-white dark:hover:bg-transparent text-gray-600 dark:text-gray-100 h-8 rounded-xl  text-sm button-press-feedback"
      // className={
      style={{
        color: !isBackground ? "#000000" : "#ffffff",
        backgroundColor: isBackground ? ThemeData.primary : "",
        borderRadius: "0.2rem",
        ...style,
        padding: "0px 0.75rem",
        border: "1px solid #dbdbdb",
      }}
      disabled={isDisabled}
      //   !isBackground
      //     ? "customButton !mt-0  group px-3 py-2 text-sm font-medium duration-200 flex items-center gap-2 min-w-[40px]  text-xs"
      //     : "customButton !mt-0  group px-3 py-2 text-sm font-medium   duration-200  flex items-center gap-2 min-w-[40px] text-white text-xs"
      // }
    >
      <span className="flex items-center gap-2">
        {icon}
        {title}
        {iconRight}
      </span>
    </Button>
  );
};
export default CustomButton;
