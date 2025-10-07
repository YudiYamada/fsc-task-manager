import { tv } from "tailwind-variants";

type ButtonProps = {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "ghost" | "danger";
  onClick?: () => void;
  size?: "small" | "large";
  className?: string;
  disabled?: boolean;
};

const Button = ({
  children,
  color = "primary",
  onClick,
  size = "large",
  className,
  disabled,
}: ButtonProps) => {
  const button = tv({
    base: "flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1 text-xs transition hover:opacity-75",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
        ghost: "text-brand-dark-gray bg-transparent",
        danger: "bg-brand-danger text-brand-white",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 hover:opacity-50",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  });

  return (
    <button
      className={button({ color, size, className, disabled })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
