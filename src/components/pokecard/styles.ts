import styled from 'styled-components';

interface ContainerProps{
    resize:number;
}



export const Container = styled.div<ContainerProps>`

    display:flex;
    align-content:center;
    flex-direction:column;
    margin-top: 1rem;
    border: solid black;
    border-width: 0.4rem;
    background:#A9A9A9;
    border-radius:1rem;
    width: calc(7.5rem * ${(props)=>props.resize});
    height: calc(8.5rem * ${(props)=>props.resize});
    overflow:hidden;
    justify-content:space-around;
    
    
    

    &:hover{
        cursor: pointer;
    }

    span{
        font-size:calc(0.85rem * ${(props)=>props.resize});
        text-transform: capitalize;
        margin:0.5rem;
        text-align:center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }

    .Image{
        align-self:center;
        width: calc(5rem * ${(props)=>props.resize});
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
    margin: calc(5rem * ${(props)=>props.resize});
    }     

    .fa-FileExcel{
        align-self:center;
    margin: calc(6rem * ${(props)=>props.resize});
    }
    
`;