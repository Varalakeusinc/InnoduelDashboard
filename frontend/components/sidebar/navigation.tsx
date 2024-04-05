import { Home, AreaChartIcon } from "lucide-react";
import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
	const user = {
		username: "test",
	};
	const routes = [
		{
			label: "Home",
			href: `/`,
			icon: Home,
			dataTestId: "navigation-home",
		},
		{
			label: "Arenas",
			href: `/arenas`,
			icon: AreaChartIcon,
			dataTestId: "navigation-arenas",
		},
		{
			label: "Compare",
			href: `/compare`,
			icon: AreaChartIcon,
			dataTestId: "navigation-compare",
		},
	];

	const isActive = (path : string) => window.location.pathname === path;

	if (!user?.username)
		return (
			<ul className="space-y-2">
				{[...Array(4)].map((_, i) => (
					<NavItemSkeleton key={i} />
				))}
			</ul>
		);

	return (
		<ul className="space-y-2 px-2 pt-4 lg:pt-0">
			{routes.map((route) => (
				<div key={route.href} data-test-id={route.dataTestId}>
					<NavItem
						label={route.label}
						icon={route.icon}
						href={route.href}
						isActive={isActive(route.href)}
					/>
				</div>
			))}
		</ul>
	);
};
