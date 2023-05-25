import '@/styles/font-awesome-all.css'
import '@/styles/flaticon.css'
import '@/styles/owl.css'
import '@/styles/bootstrap.css'
import '@/styles/jquery.fancybox.min.css'
import '@/styles/animate.css'
import '@/styles/nice-select.css'
import '@/styles/imagebg.css'
import '@/styles/color.css'
import '@/styles/style.css'
import '@/styles/responsive.css'
import '@/styles/jquery-ui.min.css'
import '@/styles/jquery-ui.structure.min.css'
import '@/styles/jquery-ui.theme.min.css'
import '@/styles/app.min.css'
import './../public/scss/booking.scss'
import './../public/scss/dialog.scss'
import './../public/scss/shopCard.scss'
import { RecoilRoot } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import client from '../graphQL/apolloClient';

// import '@/styles/globals.css'
// import '@/styles/rtl.css'
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// date-fns
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ShoppingCard from '@/components/ShoppingCard'

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ApolloProvider>
    </RecoilRoot>
  )
}

// const MyApp = ({ Component, pageProps } : AppProps) => (
//   <Component {...pageProps} />
// )

export default appWithTranslation(App)