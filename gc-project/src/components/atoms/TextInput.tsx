"use client";
import { forwardRef, useRef } from "react";
import classNames from "classnames";
import { IconType } from "../icons";
import Icon from "./Icon";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  type?: "text" | "email";
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  trailingIcon?: IconType;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      name,
      type,
      value,
      placeholder,
      autoComplete,
      minLength,
      maxLength,
      error = false,
      onChange,
      trailingIcon,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <label htmlFor={props.id} className="h-full w-full">
        <input
          id={props.id}
          ref={ref}
          name={name}
          type={type || "text"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          className={classNames(
            "h-full w-full rounded-sm border border-black py-4 pl-2 text-[20px] focus:outline-none placeholder:text-[#141414a8]",
            className,
          )}
          {...props}
        />
        {trailingIcon && <Icon id={trailingIcon} />}
      </label>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
