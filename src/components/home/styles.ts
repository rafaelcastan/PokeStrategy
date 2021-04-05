import styled from 'styled-components';

export const Container = styled.div`  
        height:calc(100vh - 6.1rem);
        width:calc(100vw - 2rem);

        .List{
            display:flex;
            flex-direction:row-reverse;
            flex-wrap:wrap;
            justify-content:space-between;
            margin-left:2rem;
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



