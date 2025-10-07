import { forwardRef } from "react";

import InputErrorMessage from "./InputErrorMessage";
import InputLabel from "./InputLabel";

type TimeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  errorMessage?: string;
};

const TimeSelect = forwardRef<HTMLSelectElement, TimeSelectProps>(
  (props, ref) => {
    return (
      <div className="flex flex-col gap-1 text-left">
        <InputLabel htmlFor="time">Horário</InputLabel>

        <select
          id="time"
          ref={ref}
          className="outline-brand-primary focus:border-brand-primary border-brand-border rounded-lg border border-solid px-4 py-3 placeholder:text-sm"
          {...props}
        >
          <option value="morning">Manhã</option>
          <option value="afternoon">Tarde</option>
          <option value="evening">Noite</option>
        </select>

        {props.errorMessage && (
          <InputErrorMessage>{props.errorMessage}</InputErrorMessage>
        )}
      </div>
    );
  }
);

export default TimeSelect;
