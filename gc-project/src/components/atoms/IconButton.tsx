"use client";

import { forwardRef } from "react";
import Button, { ButtonProps } from "./Button";
import Icon from "./Icon";
import { IconType } from "../icons";
import classNames from "classnames";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: IconType;
  label?: string;
  iconWidth?: number;
  iconHeight?: number;
  trailingIcon?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, label, trailingIcon = true, iconWidth, iconHeight, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={classNames(
          "flex rounded-sm",
          {
            "justify-center p-3": props.variant === "primary",
            "items-center gap-3 bg-black p-3 text-white":
              props.variant === "filter" || props.variant === "primary",
            "justify-between p-3": props.variant === "filter",
            "items-center justify-between":
              props.variant === "dropdownInput",
              "p-3": props.variant === "burgerMenu",
          },
          className,
        )}
        aria-label={label}
        {...props}
      >
        {!trailingIcon && <Icon id={icon} width={iconWidth ? iconWidth : 5} height={iconHeight ? iconHeight : 5}/>}
        {label && <span className="">{label}</span>}
        {trailingIcon && <Icon id={icon} width={iconWidth ? iconWidth : 5} height={iconHeight ? iconHeight : 5}/>}
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;
