import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Roboto_Condensed } from 'next/font/google';
import { Page } from '../components/Page';
config.autoAddCss = false;

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['300', '400', '700'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center ${robotoCondensed.className}`}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </div>
  );
}
