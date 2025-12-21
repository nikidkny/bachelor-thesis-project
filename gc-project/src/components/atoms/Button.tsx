"use client";

import classNames from "classnames";
import { forwardRef } from "react";

export type ButtonVariants = "primary" | "secondary" |"burgerMenu";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  variant?: ButtonVariants;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant , ...props },
    ref,
  ) => {
    // const baseButtonStyles =
    //   "";

    // const combinedClassName = `${baseButtonStyles} ${className}`;

    return (
      <button
        ref={ref}
        className={classNames("cursor-pointer",{
          "bg-black rounded-md text-white p-3 text-[16px]": variant === "primary",
          "": variant === "secondary",
          "": variant === "burgerMenu",
        }, className)}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
