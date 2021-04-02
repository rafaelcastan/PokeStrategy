import styled from 'styled-components';

export const Container = styled.div`

        display:flex;
        flex-direction:column;

        .Icon{
            width:4.8rem; 
            position:fixed;
            left:1%;
            top:1%;
        }
        .IconName{
            font-size:2rem;
            position:fixed;
            left:6.8%;
            top:3%;
            @media (min-width:1800px){
                left:5%;
            }
        }

        .Pokemon{
            position:fixed;
            right:15%;
            top:2%;
            width:5rem;

            @media (max-width:1205px){
                right:5%;
            }
        }

        .infinite-scroll-component{
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



