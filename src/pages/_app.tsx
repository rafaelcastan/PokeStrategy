import { GlobalStyle } from "../components/styles/global";

function MyApp({ Component, pageProps }) {
  return (
    <>
    <GlobalStyle/>
    <Component {...pageProps} />
    </>
    )
  
}

export default MyApp
