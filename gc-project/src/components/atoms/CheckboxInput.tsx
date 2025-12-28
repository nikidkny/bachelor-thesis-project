import { forwardRef } from "react";

type CheckboxInputProps = {
  label?: string;
  name?: string;
  required?: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ label, name, required, checked, onChange, ...props }, ref) => {
    return <div></div>;
  },
);

CheckboxInput.displayName = "CheckboxInput";

export default CheckboxInput;
