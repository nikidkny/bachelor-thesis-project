"use client";

import classNames from "classnames";
import { forwardRef } from "react";

export type ButtonVariants = "primary" | "filter" |"burgerMenu"|"secondary"|"justText"|"dropdownInput";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  variant?: ButtonVariants;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant , ...props },
    ref,
  ) => {

    return (
      <button
        ref={ref}
        className={classNames("cursor-pointer focus-visible:outline",{
          "bg-black rounded-md text-white p-3 text-[16px]": variant === "primary",
          "": variant === "filter",
          "flex w-full items-center justify-between px-4": variant === "burgerMenu",
          "text-black": variant === "secondary",
          "text-black underline p-0": variant === "justText",
          "flex w-full border border-black ": variant === "dropdownInput",
          "pointer-events-none opacity-50": props.disabled,
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
