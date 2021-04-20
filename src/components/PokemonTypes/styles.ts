import { darken } from 'polished';
import styled, {css} from 'styled-components';

export const PokemonType = styled.div<TypesProps>`
    margin-top:0.5rem;
    background: ${props=>typesColors[props.types]};
    font-size:2rem;
    width:9rem;
    border-radius:1rem;
    text-align:center;
    border: solid black;
    font-weight: bold;
    margin-left:0.5rem;
`;



interface TypesProps{
    types:'normal'|'fire'|'water'|'electric'|'grass'|'ice'|'fighting'|'poison'
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



export const PokemonTypes= styled.div`
    width:auto;
`;


interface TypesPropsMixed{
    type1:'normal'|'fire'|'water'|'electric'|'grass'|'ice'|'fighting'|'poison'
    |'ground'|'flying'|'psychic'|'bug'|'rock'|'ghost'|'dragon'|'dark'|'steel'|'fairy';

    type2:'normal'|'fire'|'water'|'electric'|'grass'|'ice'|'fighting'|'poison'
    |'ground'|'flying'|'psychic'|'bug'|'rock'|'ghost'|'dragon'|'dark'|'steel'|'fairy';
}

export const TypesRelationsBoxMixed = styled.div<TypesPropsMixed>`

    margin:2rem;
    flex:30%;
    border: solid black;
    padding:1rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    flex-wrap:wrap;
    border-radius:2rem;
    background-image: linear-gradient(to bottom right, ${(props)=>`${darken(0.1,typesColors[props.type1])}, ${darken(0.1,typesColors[props.type2])}`} ) 
`;

export const TypesRelationsBox = styled.div<TypesProps>`

    margin:2rem;
    flex:30%;
    border: solid black;
    padding:1rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    flex-wrap:wrap;
    border-radius:2rem;
    background: ${props=>darken(0.1, typesColors[props.types])};    

`;

export const TypesChart = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`;

export const TypesWrap = styled.div`
    display:flex;
    flex-direction:row;
    width:50%;

    span{
        font-size:1.8rem;
        font-weight: bold;
    }

    .TypesAdvantageBox{
        display:flex;
        flex-direction:row;
        flex-wrap:wrap;
        justify-content:center;
    }

    .TypesMixedTitle{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
    }
`;

export const PokemonTypeRelations = styled.div<TypesProps>`
    margin-top:0.5rem;
    background: ${props=>typesColors[props.types]};
    padding:0.3rem;
    font-size:2rem;
    width:9rem;
    border-radius:1rem;
    text-align:center;
    border: solid black;
    font-weight: bold;
    margin:0.5rem;
`;