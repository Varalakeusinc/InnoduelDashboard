import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppSelector } from "@/store/hooks";
import { selectIsLoggedIn, selectUser } from "@/store/userSlice";
import CompanySelector from "../companySelector/CompanySelector";
import LanguageSwitcher from "../language-switcher";
import { useTranslation } from 'react-i18next';

export function UserNav() {
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	const currentUser = useAppSelector(selectUser);
	const { t } = useTranslation();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="primary"
					className="relative h-12 w-12 rounded-full"
				>
					<Avatar className="h-12 w-12">
						<AvatarImage src="/avatars/01.png" alt="@shadcn" />
						<AvatarFallback>
							{isLoggedIn ? currentUser?.username : ""}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">
							{isLoggedIn
								? currentUser?.username
								: "Please log in"}
						</p>
						<p className="text-xs leading-none text-muted-foreground">
							{isLoggedIn ? currentUser?.email : ""}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer">
						<CompanySelector />
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">
						<LanguageSwitcher />
					</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">{t("profile")}</DropdownMenuItem>
					<DropdownMenuItem className="cursor-pointer">{t("settings")}</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>{t("log_out")}</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
