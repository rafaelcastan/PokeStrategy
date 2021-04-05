import styled from 'styled-components';

export const Container = styled.div`

    display:flex;
    align-content:center;
    flex-direction:column;
    margin-top: 1rem;
    border: solid black;
    border-width: 0.4rem;
    background:#A9A9A9;
    border-radius:1rem;
    width: 6rem;
    

    &:hover{
        cursor: pointer;
    }

    span{
        align-self:center;
        font-size:0.9rem;
        text-transform: capitalize;
        margin:0.5rem;
        text-align:center;
    }

    .Image{
        align-self:center;
        width: 5rem;

    }
        /* Define an animation behavior */
    @keyframes spinner {
        to { transform: rotate(360deg); }
    }
    /* This is the class name given by the Font Awesome component when icon contains 'spinner' */
    .fa-spinner {
    /* Apply 'spinner' keyframes looping once every second (1s)  */
    animation: spinner 1s linear infinite;
    align-self:center;
    margin: 5rem;
    }     

    .fa-FileExcel{
        align-self:center;
    margin: 6rem;
    }
    
`;