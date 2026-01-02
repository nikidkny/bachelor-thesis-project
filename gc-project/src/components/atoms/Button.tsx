"use client";

import classNames from "classnames";
import { forwardRef } from "react";

export type ButtonVariants = "primary" | "filter" |"burgerMenu"|"secondary"|"justText";

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
        className={classNames("cursor-pointer focus-visible:outline",{
          "bg-black rounded-md text-white p-3 text-[16px]": variant === "primary",
          "": variant === "filter",
          "w-full items-center justify-between px-4": variant === "burgerMenu",
          "text-black": variant === "secondary",
          "text-black underline p-0": variant === "justText",
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
