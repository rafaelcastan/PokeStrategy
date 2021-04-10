import LoadingOverlay from 'react-loading-overlay-ts';
import styled from 'styled-components';

export const StyledLoader = styled(LoadingOverlay)`
    position:absolute;
    width:100vw;
    height:100vh;
`;

export const Container = styled.div`  
        height:calc(100vh - 6rem);
        width:calc(100vw - 1.5rem);
        @media (max-width:1024px){
            height:100vh;
            width:100vw;
            overflow:hidden;
       }

        .List{
            display:flex;
            flex-direction:row-reverse;
            flex-wrap:wrap;
            justify-content:space-between;
            margin-left:1.5rem;
            padding:0%;
            margin-top:6rem;
            
        }
        
`;


export const PokeCardsContainer = styled.div`
    margin-left:0.5rem;
    margin-right:0.5rem;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content:space-between;
`;



