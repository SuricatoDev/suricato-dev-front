import { Inter } from 'next/font/google'
import { AppProps } from 'next/app'
import { AccessibilityContextProvider } from '@/providers/AccessibilityContextProvider'
import { SessionProvider } from 'next-auth/react'
import MobileFooter from '@/components/sections/MobileFooter'
import Layout from '@/containers/Layout'
import { ToastContainer } from 'react-toastify'

export const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    "'Segoe UI'",
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    "'Open Sans'",
    "'Helvetica Neue'",
    'sans-serif'
  ]
})

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <AccessibilityContextProvider>
      <SessionProvider session={session}>
        <Layout>
          <div className={`${inter.className}`} id="modal-root">
            <Component {...pageProps} />
            <ToastContainer position="bottom-center" autoClose={5000} />
            <MobileFooter />
          </div>
        </Layout>
      </SessionProvider>
    </AccessibilityContextProvider>
  )
}
