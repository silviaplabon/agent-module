import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

const variantClasses = {
  primary: "bg-primary hover:bg-secondary text-white",
  secondary: "bg-secondary hover:bg-gray-300 text-gray-900",
  danger: "bg-danger hover:bg-red-700 text-white",
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  ...props
}) => (
  <button
    className={`px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${variantClasses[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
