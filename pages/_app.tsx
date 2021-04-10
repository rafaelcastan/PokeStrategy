import { GlobalStyle } from "../styles/global";

import { CleanConsole } from '@eaboy/clean-console';

//CleanConsole.init() 


function MyApp({ Component, pageProps }) {

  return (
    <>
    <GlobalStyle/>
    <Component {...pageProps} />
    </>
    )
  
}

export default MyApp
