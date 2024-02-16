import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-x-4 hover:opacity-75 transition "
    >
      <div className="rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
        <img src="/innoduel_logo.webp" alt="Logo" className="lg:w-20 w-14"/>
      </div>
      <div className={cn("hidden lg:block")}>
        <p className="text-lg font-semibold">Innoduel Dashboard</p>
        <p className="text-xs text-muted-foreground">Motto</p>
      </div>
    </Link>
  );
};
