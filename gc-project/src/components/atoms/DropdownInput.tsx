"use client";

import { forwardRef, useState } from "react";
import classNames from "classnames";
import CheckboxInput from "./CheckboxInput";
import IconButton from "./IconButton";
import { formatDatasourceNames } from "@/utils/formatDatasourceNames";

export type DropdownInputProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    name: string;
    options: { label: string; value: string }[];
    placeholder?: string;
    selectedOption: string[];
    setSetlectedOption: (options: string[]) => void;
    // onChange?: (value: string[]) => void;
    required: boolean;
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
      selectedOption,
      setSetlectedOption,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const toggleOptionCheckbox = (optionValue: string) => {
      const newSelectedOption = selectedOption?.includes(optionValue)
        ? selectedOption.filter((v) => v != optionValue)
        : [...selectedOption, optionValue];
      setSetlectedOption(newSelectedOption);

      // onChange(newSelectedOption);
    };

    function onKeyDown(
      event: React.KeyboardEvent<HTMLDivElement>,
      optionValue: string,
    ) {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        toggleOptionCheckbox(optionValue);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    return (
      <div className="relative w-full">
        <IconButton
          label={
            selectedOption.length === 0
              ? placeholder
              : selectedOption.length === 1
                ? formatDatasourceNames(selectedOption[0])
                : `${placeholder} (${selectedOption.length})`
          }
          variant="dropdownInput"
          type="button"
          onClick={() => setOpen(!open)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          className={classNames(
            "justify-between transition-colors text-[20px]",
            selectedOption.length === 0 ? "text-[#141414a8]" : "text-black",
            className,
          )}
          icon={open ? "chevronUpIcon" : "chevronDownIcon"}
        ></IconButton>
        {open && (
          <ul className="absolute z-10 max-h-60 w-full max-w-2xl overflow-y-auto bg-white p-4 shadow-md">
            {options.map((option) => (
              <li key={option.value}>
                <CheckboxInput
                  label={option.label}
                  name={name}
                  required={required}
                  checked={selectedOption.includes(option.value)}
                  onChange={() => toggleOptionCheckbox(option.value)}
                  onKeyDown={(event) => onKeyDown(event, option.value)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      // <label className="w-full">
      //   <select
      //     id={props.id}
      //     name={name}
      //     aria-label={name}
      //     ref={ref}
      //     value={value || ""}
      //     onChange={onChange}
      //     className={classNames(
      //       "placeholder:text-gray-500 h-full w-full cursor-pointer overflow-hidden rounded-sm border border-black py-4 pl-2 text-[20px] text-ellipsis focus:outline-none",

      //       className,
      //     )}
      //     {...props}
      //   >
      //     {placeholder && (
      //       <option value="" hidden>
      //         {placeholder}
      //       </option>
      //     )}
      //     {options.map((option) => (
      //       <option key={option.value} value={option.value}>
      //         {option.label}
      //       </option>
      //     ))}
      //   </select>
      // </label>
    );
  },
);

DropdownInput.displayName = "DropdownInput";

export default DropdownInput;
