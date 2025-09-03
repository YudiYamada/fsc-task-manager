import type { ReactNode } from "react";

type SidebarButtonProps = {
  children: ReactNode;
  variant: "selected" | "unselected";
};

const SidebarButton = ({ children, variant }: SidebarButtonProps) => {
  const getVariantClasses = () => {
    if (variant === "unselected") {
      return "text-[#35383E]";
    }

    if (variant === "selected") {
      return "bg-[#E6F7F8] text-[#00ADB5]";
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
