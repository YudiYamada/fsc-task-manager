import type { InputHTMLAttributes } from "react";

import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
  ref?: React.Ref<HTMLInputElement>;
};

const Input = ({ label, errorMessage, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>

      <input
        type="text"
        className="outline-brand-primary focus:border-brand-primary border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  );
};

export default Input;
