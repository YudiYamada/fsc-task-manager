import React from "react";

type InputLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

const InputLabel: React.FC<InputLabelProps> = (props) => {
  return (
    <label className="text-brand-dark-blue text-sm font-semibold" {...props}>
      {props.children}
    </label>
  );
};

export default InputLabel;
