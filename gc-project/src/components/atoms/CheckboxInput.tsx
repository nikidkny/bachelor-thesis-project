import React, { forwardRef } from "react";
import Icon from "./Icon";
import classNames from "classnames";

type CheckboxInputProps = {
  label?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
};

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  (
    { label, name, required, disabled, checked, onChange,onKeyDown, className, ...props },
    ref,
  ) => {
    const handleClick = () => {
      if (disabled) return;
      if (onChange) {
        onChange(!checked);
      }
    };
    return (
      <div className={classNames("", className)}>
        <div className="relative flex cursor-pointer items-center gap-2 [&:has(input:focus-visible)]:ring-2 ">
          <input
            id={name}
            name={name}
            ref={ref}
            type="checkbox"
            disabled={disabled}
            checked={checked}
            onKeyDown={onKeyDown}
            onChange={() => {}}
            {...props}
            className="absolute h-0 w-0 opacity-0"
          />
          <div
            className={classNames(
              "flex h-5 w-5 items-center justify-center rounded-sm border p-0.5 transition-colors"
            )}
            onClick={handleClick}
          >
            {checked && (
              <Icon id="checkmarkIcon" className="h-3 w-3 text-black" />
            )}
          </div>

          <label
            htmlFor={name}
            onClick={handleClick}
            className={classNames("cursor-pointer ")}
          >
            {label}
          </label>
        </div>
      </div>
    );
  },
);

CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
