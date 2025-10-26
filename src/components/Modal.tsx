import React, { useRef, useEffect, useState } from "react";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleCancel?: () => void;
  handleRefresh?: () => void;
  modalTitle?: string;
};

const Modal: React.FC<ModalProps> = ({
  open,
  setOpen,
  handleCancel,
  handleRefresh,
  modalTitle,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
          <div
            ref={modalRef}
            className="relative p-4 w-full max-w-md max-h-full"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {modalTitle || "MODAL TITLE"}
                </h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 flex justify-between gap-4">
                <button
                  className="text-red-700 bg-red-100 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-red-900 dark:text-white dark:hover:bg-red-800 dark:focus:ring-red-800"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="text-white inline-flex justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setOpen(false)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
