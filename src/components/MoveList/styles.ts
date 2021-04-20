import styled from 'styled-components';
import { darken, transparentize } from 'polished';



export const Tip = styled.span`

    border-bottom: 1px dashed;
    text-decoration: none;
            margin-right:0.5rem;
      
        
    &:hover {
            cursor: help;
            position: relative;
       }

     span {
            display: none
        }
        
    &:hover span {
            border: #c0c0c0 1px dotted;
            padding: 5px 20px 5px 5px;
            display: block;
            z-index: 100;
            background: #f0f0f0 no-repeat 100% 5%;
            left: 50px;
            margin: 10px;
            position: absolute;
            bottom: 10px;
            text-decoration: none;
            width:45vw;
        }
`;


export const Container = styled.div`
    display:flex;
    flex-direction:column;

    

    

    table {
        width:80vw;
        border-spacing: 0 0.5rem;
        align-self:center;
        border-collapse: collapse;
        background:#B5B5B5;


        th {
            padding: 1rem 2rem;
            text-align: center;
            line-height: 1.5rem;
            font-size:1.5rem;
            border:solid black; 
        }

        td {
            padding: 0.2rem 2rem;
            text-align: center;
            border: 0;
            border:solid black; 
            font-size:1.3rem;
        }
    }
`;

interface ButtonProps{
    isActive:boolean;
}

interface TypesProps{
    type:'normal'|'fire'|'water'|'electric'|'grass'|'ice'|'fighting'|'poison'
    |'ground'|'flying'|'psychic'|'bug'|'rock'|'ghost'|'dragon'|'dark'|'steel'|'fairy';
}

const typesColors = {
    normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
}

export const PokemonTypeRelations = styled.div<TypesProps>`
    background: ${props=>transparentize(0.3, typesColors[props.type])};
    padding:0.3rem;
    border-radius:1rem;
    text-align:center;
    border: solid black;
    margin:0.5rem;
`;


export const StyledButtons = styled.button<ButtonProps>`
    border-radius:2rem;
        font-size:1.3rem;
        padding:0.5rem;
        outline: none;
        margin-left:0.5rem;
        padding:0.5rem 1rem;
        background:${(props)=>props.isActive 
        ? transparentize(0.2, '#33CC95') 
        : '#DCDCDC'};

        :hover{
        cursor: pointer;
        border-color:${darken(0.1, '#d7d7d7')};
        }
`;

export const ButtonsWrap = styled.div`
    display:flex;
    flex-direction:column;
    margin-bottom:1rem;

    div{
        display:flex;
        margin-bottom:0.5rem;
    }

    span{
        font-size:1.5rem;
        margin-bottom:0.5rem;
    }
`;

