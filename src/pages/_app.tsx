import { Inter } from 'next/font/google'
import { AppProps } from 'next/app'
import { AccessibilityContextProvider } from '@/providers/AccessibilityContextProvider'

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AccessibilityContextProvider>
      <div className={`${inter.className}`}>
        <Component {...pageProps} />
      </div>
    </AccessibilityContextProvider>
  )
}
