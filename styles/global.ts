import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body{
        background:grey;

        
    }

    *{
       margin:0;
       padding:0;
       box-sizing: border-box;
   }


    html {
       @media (max-width:1080px){
           font-size:93.75%;
       }

   }
   //Scrollbar edits

   div::-webkit-scrollbar {
        width: 15px;               /* width of the entire scrollbar */
    }

    div::-webkit-scrollbar-track {
        background:#696969;       /* color of the tracking area */
    }

    div::-webkit-scrollbar-thumb {
        background-color: black;    /* color of the scroll thumb */
        border-radius: 20px;       /* roundness of the scroll thumb */
        border: 3px solid #696969;  /* creates padding around scroll thumb */
    }

   body::-webkit-scrollbar {
        width: 15px;               /* width of the entire scrollbar */
    }

    body::-webkit-scrollbar-track {
        background:#696969;       /* color of the tracking area */
    }

    body::-webkit-scrollbar-thumb {
        background-color: black;    /* color of the scroll thumb */
        border-radius: 20px;       /* roundness of the scroll thumb */
        border: 3px solid #696969;  /* creates padding around scroll thumb */
    }
`;
