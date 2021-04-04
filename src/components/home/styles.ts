import styled from 'styled-components';

export const Container = styled.div`  
        width:calc(100% - 2rem);
        height:calc(100vh - 6rem);

        .List{
            margin-left:0.5rem;
             margin-right:0.5rem;
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



