import styled from 'styled-components';

export const Container = styled.div`

        display:flex;
        flex-direction:column;

        .Teste{
            width:4.8rem; 
            position:absolute;
            left:1%;
            top:1%;
        }
        .Teste2{
            font-size:2rem;
            position:absolute;
            left:6%;
            top:3%;
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



