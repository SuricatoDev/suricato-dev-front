import { AccessibilityContextProvider } from '@/providers/AccessibilityContextProvider'
import isPropValid from '@emotion/is-prop-valid'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { StyleSheetManager } from 'styled-components'

import { AuthStatusProvider } from '@/contexts/AuthStatusProvider'
import { GoogleMapsProvider } from '@/contexts/GoogleMapsProvider'

import PWAInstallPrompt from '@/components/common/PWAInstallPrompt'
import RouteChangeLoader from '@/components/common/RouterChangeLoader'
import { SessionUpdater } from '@/components/common/SessionUpdater'
import ThemeColorUpdater from '@/components/common/ThemeColorUpdater'
import ToastProvider from '@/components/common/ToastProvider'
import EmailConfirmationToast from '@/components/sections/EmailConfirmationToast'
import MobileFooter from '@/components/sections/MobileFooter'

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

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter()

  const hideMobileFooter =
    router.pathname.startsWith('/anuncios/novo') ||
    router.pathname.startsWith('/anuncios/overview') ||
    router.pathname.startsWith('/cadastrar-empresa') ||
    router.pathname.startsWith('/confirmar-email') ||
    router.pathname.startsWith('/anuncios/editar')

  return (
    <AccessibilityContextProvider>
      <SessionProvider session={session}>
        <AuthStatusProvider>
          <SessionUpdater />
          <GoogleMapsProvider>
            <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
              <RouteChangeLoader />
              <div className={inter.className} id="modal-root">
                <ThemeColorUpdater />
                <EmailConfirmationToast />
                <Component {...pageProps} />
                <PWAInstallPrompt />
                <ToastProvider />
                {!hideMobileFooter && <MobileFooter />}
              </div>
            </StyleSheetManager>
          </GoogleMapsProvider>
        </AuthStatusProvider>
      </SessionProvider>
    </AccessibilityContextProvider>
  )
}

export default MyApp
