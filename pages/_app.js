import { NextUIProvider } from '@nextui-org/react';
import { I18NProvider, useI18N } from 'context/i18n';
import Head from 'next/head';
import '../styles/globals.css';

const DefaultHead = () => {
  const { t } = useI18N();
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{t('SEO_DEFAULT_TITLE')}</title>
    </Head>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <I18NProvider>
        <DefaultHead />
        <Component {...pageProps} />
      </I18NProvider>
    </NextUIProvider>
  );
}

export default MyApp;
