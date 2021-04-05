import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body{
        background:grey;    
        overflow-y:hidden;
    }

    *{
       margin:0;
       padding:0;
       box-sizing: border-box;
   }
    /* Define an animation behavior */
   @keyframes spinner {
    to { transform: rotate(360deg); }
    }
    /* This is the class name given by the Font Awesome component when icon contains 'spinner' */
    .fa-spinner {
    /* Apply 'spinner' keyframes looping once every second (1s)  */
    animation: spinner 1s linear infinite;
    }

    html {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
       @media (max-width:1080px){
           font-size:93.75%;
       }
      
   }
   //Scrollbar edits

   div::-webkit-scrollbar {
        width: 15px;              /* width of the entire scrollbar */
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
