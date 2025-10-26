import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface DropdownProps {
  title?: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
  width?: number | string;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options = [],
  value,
  onChange,
  width = 70,
}) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const widthStyle = typeof width === "number" ? { width } : undefined;
  const widthClass = typeof width === "string" ? width : "";

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);

  return (
    <>
      <div ref={buttonRef} className="inline-block">
        <div
          onClick={() => setOpen((v) => !v)}
          className={`cursor-pointer  focus:outline-none font-medium text-sm py-1 text-center px-2 bg-white dark:bg-gray-700 ${widthClass}`}
          style={widthStyle}
        >
          {title || value}
          {!open ? (
            <ChevronDownIcon className="w-4 h-4 ms-2 inline" />
          ) : (
            <ChevronUpIcon className="w-4 h-4 ms-2 inline" />
          )}
        </div>
      </div>

      {open &&
        createPortal(
          <ul
            className="absolute bg-white border border-gray-200 rounded shadow-lg z-[99999]"
            style={{
              top: coords.top,
              left: coords.left,
              width: coords.width,
              position: "absolute",
            }}
            onMouseLeave={() => setOpen(false)}
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  className={`w-full text-left px-2 py-1 text-sm hover:bg-blue-100 ${
                    value === opt ? "bg-blue-50 font-semibold" : ""
                  }`}
                  onClick={() => {
                    onChange?.(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
};

export default Dropdown;
