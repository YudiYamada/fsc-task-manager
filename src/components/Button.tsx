type ButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "ghost";
  onclick?: () => void;
};

const Button = ({ children, variant = "primary", onclick }: ButtonProps) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }

    if (variant === "ghost") {
      return "bg-transparent text-[#818181]";
    }
  };

  return (
    <button
      className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-xs transition hover:opacity-70 ${getVariantClasses()}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
};

export default Button;
