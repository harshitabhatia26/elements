import { useDispatch, useValue } from '@elements/store';
import { useInputTranslation } from '@elements/translation-input';
import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react';

type T = (id: string, params?: Record<string, any>) => string;

type TValue = string | ((params?: any) => string);

type SetLocale = (locale: string) => void;

type TranslationContextType = {
  locale: string;
  locales: any;
  setLocale: SetLocale;
  t: T;
};

const placeholderContext: TranslationContextType = {
  locale: 'en',
  locales: {},
  t: () => {
    throw new Error('TranslationContext not initialized');
  },
  setLocale: (_) => {
    throw new Error('TranslationContext not initialized');
  },
};

export const TranslationContext = createContext<TranslationContextType>(placeholderContext);

interface TranslationProps {
  fallbackLocale: string;
  locales: any;
  children: ReactNode;
}

export function getTranslation(translations: any, id: string, params?: any) {
  const fnOrString: TValue = translations[id];

  if (typeof fnOrString === 'function') {
    return fnOrString(params);
  }

  return fnOrString;
}

export function useTranslation() {
  const translationMode = useValue('translation/mode');
  const { t } = useContext(TranslationContext);
  const renderTranslationInput = useInputTranslation();

  return translationMode === 'input' ? renderTranslationInput : t;
}

export function useLocale() {
  const { locale, setLocale } = useContext(TranslationContext);
  return { locale, setLocale };
}

export function Translation({ fallbackLocale, locales, children }: TranslationProps) {
  const currentLocale = useValue('current/locale');
  const setCurrentLocale = useDispatch('current/locale');
  const locale = currentLocale || fallbackLocale;
  const translations = locales[locale];

  const setLocale = useCallback<SetLocale>(
    (locale) => setCurrentLocale({ locale: locale }),
    [setCurrentLocale]
  );

  const t: T = useCallback(
    (id, params?) => {
      const translation = getTranslation(translations, id, params);

      if (!translation) {
        console.error(`No translation supplied for key: ${id}`);
      }

      return translation;
    },
    [translations]
  );

  const ctx = useMemo(
    () => ({
      locale,
      locales,
      setLocale,
      t,
    }),
    [t, locale, locales, setLocale]
  );

  return <TranslationContext.Provider value={ctx}>{children}</TranslationContext.Provider>;
}
