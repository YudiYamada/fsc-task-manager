type InputErrorMessageProps = {
  children: React.ReactNode;
};

const InputErrorMessage = ({ children }: InputErrorMessageProps) => {
  return <p className="text-left text-xs text-red-500">{children}</p>;
};

export default InputErrorMessage;
