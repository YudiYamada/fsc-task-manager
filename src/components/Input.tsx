import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = ({ label, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <label className="text-sm font-semibold text-[#35383E]" htmlFor={rest.id}>
        {label}
      </label>
      <input
        type="text"
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm focus:border-[#00ADB5]"
        {...rest}
      />
    </div>
  );
};

export default Input;
