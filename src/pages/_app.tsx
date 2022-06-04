import type { AppProps } from 'next/app'
import { Layout } from '../components'
import { CartContextProvider } from '../context/cart'
import '../styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContextProvider>
  )
}
