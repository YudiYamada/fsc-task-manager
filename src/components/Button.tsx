type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  onClick?: () => void;
  size?: "small" | "large";
  className?: string;
};

const Button = ({
  children,
  variant = "primary",
  onClick,
  size = "large",
  className,
}: ButtonProps) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }

    if (variant === "secondary") {
      return "bg-[#EEEEEE] text-[#35383E]";
    }

    if (variant === "ghost") {
      return "bg-transparent text-[#818181]";
    }
  };

  const getSizeClasses = () => {
    if (size === "small") {
      return "py-1 text-xs";
    }

    if (size === "large") {
      return "py-2 text-sm";
    }
  };

  return (
    <button
      className={`flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1 text-xs transition hover:opacity-70 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
