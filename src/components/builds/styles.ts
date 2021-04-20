import { darken, transparentize } from 'polished';
import styled from 'styled-components'


interface ButtonProps{
    isActive:boolean;
}


export const StyledButtons = styled.button<ButtonProps>`
    border-radius:2rem;
        font-size:1.3rem;
        padding:0.5rem;
        outline: none;
        margin-left:0.5rem;
        background:${(props)=>props.isActive 
        ? transparentize(0.2, '#33CC95') 
        : '#DCDCDC'};
        padding:0.5rem 1rem;

        :hover{
        cursor: pointer;
        border-color:${darken(0.1, '#d7d7d7')};
        }
`;


export const Container = styled.div`

span{
        font-size:1.3rem;
    }
    display:flex;
    flex-direction:column;
    justify-content:space-between;


.GenerationButtons{
    margin-top:0.5rem;
    margin-bottom:0.5rem;

    button{
        

    }
}

.FormatButtons{
    margin-top:0.5rem;
    margin-bottom:0.5rem;
}
`;