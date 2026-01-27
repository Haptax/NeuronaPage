import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';


export interface UseLanguageReturn {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  t: TFunction;
}

export const useLanguage = (): UseLanguageReturn => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return {
    currentLanguage: i18n.language,
    changeLanguage,
    t,
  };
};
