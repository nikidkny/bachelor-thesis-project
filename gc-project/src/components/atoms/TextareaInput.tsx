"use client";

import { forwardRef } from "react";

export type TextareaInputProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    error?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };

const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ error = false, onChange, ...props }, ref) => {
    return (
      <label htmlFor={props.id} className="h-full w-full">
        <textarea
          id={props.id}
          ref={ref}
          onChange={onChange}
          className="h-32 w-full resize-none rounded-sm border border-black py-4 pl-2 text-[20px] focus:outline-none"
          {...props}
        />
      </label>
    );
  },
);

TextareaInput.displayName = "TextareaInput";

export default TextareaInput;
