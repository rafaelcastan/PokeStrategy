import styled from 'styled-components';

export const Container = styled.div`

    display:flex;
    align-content:center;
    flex-direction:column;
    margin-top: 1rem;
    border: solid black;
    border-width: 0.4rem;
    background:#A9A9A9;
    border-radius:2rem;
    

    &:hover{
        cursor: pointer;
    }

    span{
        align-self:center;
        font-size:1.5rem;
        text-transform: capitalize;
    }

    img{
        align-self:center;
        width: 13rem;
    }
`;