import Layout from '@/containers/Layout'
import { AccessibilityContextProvider } from '@/providers/AccessibilityContextProvider'
import isPropValid from '@emotion/is-prop-valid'
import { SessionProvider } from 'next-auth/react'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import { StyleSheetManager } from 'styled-components'

import { AuthStatusProvider } from '@/contexts/AuthStatusProvider'
import { GoogleMapsProvider } from '@/contexts/GoogleMapsProvider'

import PWAInstallPrompt from '@/components/common/PWAInstallPrompt'
import RouteChangeLoader from '@/components/common/RouterChangeLoader'
import { SessionUpdater } from '@/components/common/SessionUpdater'
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
            <Layout>
              <StyleSheetManager
                shouldForwardProp={(prop) => isPropValid(prop)}
              >
                <RouteChangeLoader />
                <div className={inter.className} id="modal-root">
                  <Component {...pageProps} />
                  <PWAInstallPrompt />
                  <ToastContainer
                    draggable={true}
                    draggablePercent={50}
                    limit={3}
                    draggableDirection="x"
                    pauseOnHover={false}
                    newestOnTop={false}
                    position="bottom-center"
                    autoClose={3000}
                    style={{
                      zIndex: 99999
                    }}
                  />
                  {!hideMobileFooter && <MobileFooter />}
                </div>
              </StyleSheetManager>
            </Layout>
          </GoogleMapsProvider>
        </AuthStatusProvider>
      </SessionProvider>
    </AccessibilityContextProvider>
  )
}

export default MyApp
