import React from "react";

type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const InputLabel: React.FC<InputLabelProps> = (props) => {
  return (
    <label className="text-sm font-semibold text-[#35383E]" {...props}>
      {props.children}
    </label>
  );
};

export default InputLabel;
