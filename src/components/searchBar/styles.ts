import styled from 'styled-components';
import {transparentize} from 'polished';

export const NavBar = styled.div`
    width:100%;
    height:6rem;
    background:#696969;
    display:flex;
    flex-direction:row;
    align-content:center;
    justify-content:space-around;
    position: fixed;
    top: 0;
    z-index:90;

    .Icon{
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
                left:5.5%;
            }
        }

        .Pokemon{
            position:fixed;
            right:20%;
            top:1rem;
            max-width:5rem;

            @media (max-width:1350px){
                right:1%;
                top:1rem;
                max-width:5rem;
            }
        }
`;

interface ContainerProps{
    isNotFound:boolean;
}

export const Container = styled.form<ContainerProps>`
    
    display:flex;
    flex-direction:row;
    border: solid;
    border-radius:1rem;
    overflow:hidden;
    max-width:58%;
    width:40rem;
    height:3rem;
    background:${(props)=>props.isNotFound ? transparentize(0.7,'red') : '#A9A9A9'};
    align-self:center;

    

    .Sugestions{
        max-width:56%;
        width:36rem;
        position:absolute;
        background:rgba(169, 169, 169, 0.95);
        margin-top:2.8rem;
        margin-left:1rem;
        text-transform: capitalize;
        display:flex;
        flex-direction:column;
        align-content:center;
        z-index:0;
        border-radius:0.1rem;
        max-height:35rem;
        overflow:scroll;
        overflow-x: hidden;

        @media (max-width:1021px){
            margin-left:0rem;
            max-width:53%;
        }

        div{
            display:flex;
            flex-direction:row;
        }

        .SugestionsImages{
            order: 2;
            max-width:5rem;
            align-self:center;

            &:hover{
                cursor:pointer;
            }
        }
    }

    span{
        font-size: 1.5rem;
        margin-left:1.5rem;
        margin-right:0.5rem;
        align-self:center;

        &:hover{
                cursor:pointer;
            }
    }

    button{
        width:4rem;
        border: none;
        cursor: pointer;
        background:#696969;
        outline: none;
    }

    input{
        border:none;
        font-size:1.2rem;
        width:100%;
        background: ${(props)=>props.isNotFound ? transparentize(1,'red') : '#A9A9A9'};
        height:100%;
        margin-left:0.8rem;
        z-index:1;

        &:focus{
            box-shadow: 0 0 0 0;
            border: 0 none;
            outline: 0;
        }

        
    }
   

`;