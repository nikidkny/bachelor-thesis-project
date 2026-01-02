"use client";

import { forwardRef } from "react";
import Button, { ButtonProps } from "./Button";
import Icon from "./Icon";
import { IconType } from "../icons";
import classNames from "classnames";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: IconType;
  label?: string;
  trailingIcon?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, label, trailingIcon = true, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={classNames(
          "flex  p-3 rounded-sm",
          {
            " justify-center": props.variant === "primary",
            "bg-black items-center text-white gap-3":props.variant === "filter" || props.variant === "primary",
            "justify-between": props.variant === "filter",

          },
          className,
        )}
        aria-label={label}
        {...props}
      >
        {!trailingIcon && <Icon id={icon} />}
        {label && <span className="">{label}</span>}
        {trailingIcon && <Icon id={icon} />}
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;

