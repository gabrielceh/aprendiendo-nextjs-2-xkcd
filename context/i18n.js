import { useRouter } from 'next/router';
import { createContext, useCallback, useContext } from 'react';
import es from 'translations/es.json';
import en from 'translations/en.json';

const I18NContext = createContext();

const languages = { es, en };

//Para usar este context, debemos tener la configuracion de i18n en next.config.js
export function I18NProvider({ children }) {
  //Obtenemos el local para sabeer el idioma del usuario
  const { locale } = useRouter();

  // Memoriza la funcion
  // Solo actualiza si se actualiza la dependencia que le pasasmos
  const t = useCallback(
    (key, ...args) => {
      const translation = languages[locale][key];
      if (args.length === 0) {
        return translation;
      }

      args.forEach((value, index) => {
        translation = translation.replace(`\${${index}}`, value);
      });

      return translation;
    },
    [locale]
  );

  return <I18NContext.Provider value={{ t }}>{children}</I18NContext.Provider>;
}

export function useI18N() {
  const context = useContext(I18NContext);

  if (context === undefined) {
    throw new Error('useI18N must be used within a I18NProvider');
  }

  return context;
}
