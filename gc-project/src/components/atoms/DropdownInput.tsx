"use client";

import { forwardRef } from "react";
import classNames from "classnames";

export type DropdownInputProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    name?: string;
    options: { label: string; value: string }[];
    placeholder?: string;
    required?: boolean;
  };
const DropdownInput = forwardRef<HTMLSelectElement, DropdownInputProps>(
  (
    {
      options,
      placeholder,
      name,
      onChange,
      value,
      required,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <label className="w-full">
        <select
          id={props.id}
          name={name}
          aria-label={name}
          ref={ref}
          value={value || ""}
          onChange={onChange}
          className={classNames(
            "placeholder:text-gray-500 h-full w-full cursor-pointer overflow-hidden rounded-sm border border-black py-4 pl-2 text-[20px] text-ellipsis focus:outline-none",

            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  },
);

DropdownInput.displayName = "DropdownInput";

export default DropdownInput;
