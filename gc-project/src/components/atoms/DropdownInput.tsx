"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import CheckboxInput from "./CheckboxInput";
import IconButton from "./IconButton";
import { formatDatasourceNames } from "@/utils/formatDatasourceNames";
import Button from "./Button";

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
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    const toggleOptionCheckbox = (optionValue: string) => {
      const newSelectedOption = selectedOption?.includes(optionValue)
        ? selectedOption.filter((v) => v != optionValue)
        : [...selectedOption, optionValue];
      setSetlectedOption(newSelectedOption);
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

    useEffect(() => {
      // handle clicking outside to close the dropdown
      function handleClickOutsideDropdown(event: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutsideDropdown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutsideDropdown);
      };
    }, []);

    return (
      <div className="relative w-full" ref={dropdownRef}>
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
            "h-full w-full justify-between px-2 py-3 text-[20px] transition-colors",
            selectedOption.length === 0 ? "text-[#141414a8]" : "text-black",
            className,
          )}
          icon={open ? "chevronUpIcon" : "chevronDownIcon"}
          aria-expanded={open}
        ></IconButton>
        {open && (
          <ul
            className="absolute z-10 mt-1 flex max-h-65 w-full max-w-2xl flex-col gap-2 overflow-y-auto scroll-auto rounded-md bg-[#0a0a0af2] p-4 text-[#b8b8b8] shadow-md"
            style={{ scrollbarColor: "#ffffff #ffffff" }}
          >
            <Button
              variant="justText"
              type="button"
              className={classNames(
                "flex w-full justify-end",
                selectedOption.length === 0
                  ? "pointer-events-none text-white no-underline! opacity-50"
                  : "cursor-pointer !text-[#b8b8b8]",
              )}
              onClick={() => setSetlectedOption([])}
            >
              Clear
            </Button>
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
    );
  },
);

DropdownInput.displayName = "DropdownInput";

export default DropdownInput;
