import type { ReactNode } from "react";

type SidebarButtonProps = {
  children: ReactNode;
  variant: "selected" | "unselected";
};

const SidebarButton = ({ children, variant }: SidebarButtonProps) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-brand-dark-blue";
    }

    if (variant === "selected") {
      return "bg-brand-primary/10 text-brand-primary";
    }
  };

  return (
    <a
      href="/home"
      className={`flex items-center gap-2 px-6 py-3 ${getVariantClasses()}`}
    >
      {children}
    </a>
  );
};

export default SidebarButton;
