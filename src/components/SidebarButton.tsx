import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { tv } from "tailwind-variants";

type SidebarButtonProps = {
  children: ReactNode;
  to: string;
};

const SidebarButton = ({ children, to }: SidebarButtonProps) => {
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
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? "selected" : "unselected" })
      }
    >
      {children}
    </NavLink>
  );
};

export default SidebarButton;
