import { GlobalStyle } from "../styles/global";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


function MyApp({ Component, pageProps }) {
  return (
    <>
    <GlobalStyle/>
    <Component {...pageProps} />
    </>
    )
  
}

export default MyApp
