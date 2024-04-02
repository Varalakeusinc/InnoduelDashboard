import { useTranslation } from "react-i18next";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function LanguageSwitcher() {
	const { t, i18n } = useTranslation();
	const changeLanguage = (value: string) => {
		i18n.changeLanguage(value);
	};
	return (
		<div data-test-id="languageSwitcher">
			<Select defaultValue={i18n.language} onValueChange={changeLanguage}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select language" />
				</SelectTrigger>
				<SelectContent>
					<div data-test-id="localization-english">
						<SelectItem value="en">{t("english")}</SelectItem>
					</div>

					<div data-test-id="localization-finnish">
						<SelectItem value="fi">{t("finnish")}</SelectItem>
					</div>
				</SelectContent>
			</Select>
		</div>
	);
}
