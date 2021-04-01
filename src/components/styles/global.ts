import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body{
        background:grey;
    }

    html {
       @media (max-width:1080px){
           font-size:93.75%;
       }

       @media (max-width: 720px){
           font-size:50.5%;
       }

       @media (max-width: 280px){
           font-size:40.5%;
       }
   }
`;
