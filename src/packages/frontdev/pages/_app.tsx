import { AppProps } from 'next/app'
import '../assets/_globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
} 

export default MyApp