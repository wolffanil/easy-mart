import i18n from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const supportedLngs = ["en", "de"] as const;

i18n
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    supportedLngs,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
