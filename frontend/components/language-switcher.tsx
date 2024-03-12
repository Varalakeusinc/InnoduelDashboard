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
        <>
            <Select defaultValue={i18n.language} onValueChange={changeLanguage}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">{t("english")}</SelectItem>
                    <SelectItem value="fi">{t("finnish")}</SelectItem>
                </SelectContent>
            </Select>
        </>
    );
}
