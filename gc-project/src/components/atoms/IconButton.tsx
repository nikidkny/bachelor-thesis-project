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
          "flex items-center",
          { "w-full justify-between py-4": props.variant === "burgerMenu" ,
            "justify-center gap-3": props.variant !== "burgerMenu",
            "bg-black p-3 rounded-sm text-white": !label
          },
          className,
        )}
        aria-label={label}
        {...props}
      >
        {!trailingIcon && <Icon id={icon} />}
        {label && <span className="ml-2">{label}</span>}
        {trailingIcon && <Icon id={icon} />}
      </Button>
    );
  },
);

IconButton.displayName = "IconButton";

export default IconButton;

