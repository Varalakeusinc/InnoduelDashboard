import { Home, LogInIcon } from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const user = {
    username: "test",
  }
  const routes = [
    {
      label: "Home",
      href: `/`,
      icon: Home,
    },
    {
      label: "Authentication",
      href: `/authentication`,
      icon: LogInIcon,
    },
  ];

  if (!user?.username) return (
    <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
            <NavItemSkeleton key={i} />
        ))}
    </ul>
  );

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={false}
        />
      ))}
    </ul>
  );
};
