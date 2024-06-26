import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const initI18n = () => {
	const selectedLanguage = localStorage.getItem('selectedLanguage');
    const defaultLanguage = 'en';

	return i18n
		.use(Backend)
		.use(LanguageDetector)
		.use(initReactI18next) // passes i18n down to react-i18next
		.init({
			// the translations
			// (tip move them in a JSON file and import them,
			// or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
			lng: selectedLanguage || defaultLanguage, // if you're using a language detector, do not define the lng option
			fallbackLng: "en",
			interpolation: {
				escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
			},
			debug: true,
			react: {
				useSuspense: false,
			},
		});
};

export default i18n;
