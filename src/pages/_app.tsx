import { AppProps } from 'next/app';

import '../styles/tailwind.css';
import '../styles/styles.css';
import '../styles/tailwind-util.css';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
