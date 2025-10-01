import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

type SidebarButtonProps = {
  children: ReactNode;
  color: "selected" | "unselected";
};

const SidebarButton = ({ children, color }: SidebarButtonProps) => {
  const sidebar = tv({
    base: "flex items-center gap-2 px-6 py-3",
    variants: {
      color: {
        selected: "bg-brand-primary/10 text-brand-primary",
        unselected: "text-brand-dark-blue",
      },
    },
  });

  return (
    <a href="/home" className={sidebar({ color })}>
      {children}
    </a>
  );
};

export default SidebarButton;
