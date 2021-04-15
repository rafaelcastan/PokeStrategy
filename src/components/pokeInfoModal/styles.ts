import { darken } from 'polished';
import styled, {css} from 'styled-components';

export const CloseModalButton = styled.button`
    z-index:1;
    position:absolute;
    background-color: Transparent;
    background-repeat:no-repeat;
    top:0;
    right:0;
    border: none;
    outline: none;
    cursor:pointer;
    overflow: hidden;    
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

export const PokemonType = styled.div<TypesProps>`
    margin-top:0.5rem;
    background: ${props=>typesColors[props.types]};
    font-size:2rem;
    width:9rem;
    border-radius:1rem;
    text-align:center;
    border: solid black;
    font-weight: bold;
`


export const PokemonCard = styled.div<TypesProps>`
    display:flex;
    flex-direction:row;
    background: ${props=>darken(0.1, typesColors[props.types])};
    height:auto;
    width:auto;
    border-radius:2rem;
    margin-top:3rem;
    margin-bottom:2rem;
    flex-wrap:wrap;
    position: relative;
    border: solid black;
    font-weight: 600;

    

    .Artwork{
    width:20%;
    min-width:15rem;
    align-self:center;
    margin-top:2rem;
    margin-left:1rem;
    }
    
    .AnimatedPokemon {
        width:8rem;
        max-width:160px;
        max-height:160px;
        position: absolute;
        right: 1rem;
        bottom:1rem;
        align-self:flex-end;
    }
`;

export const PokemonNameAndAbilities = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    width:26%;
    margin-left:2rem;
    @media (max-width:660px){
        margin-left:1rem;
    }

    .PokemonName{
        font-size:4rem;
        text-transform:capitalize;

        @media (max-width:550px){
        font-size:2.5rem;
    }
    }

    .PokemonCardTitle{
        margin-top:1rem;
        font-size:2rem;
        text-transform:capitalize;
    }

    .PokemonAbilitiesDetails{
        font-size:1.3rem;
        text-transform:capitalize;
    }
`;

export const StatsBars = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:1rem;
    margin-right:1rem;
    margin-top:2rem;
    align-self: flex-start;
    width:30rem;
    margin-bottom:2rem;

    @media (max-width:660px){
        margin-bottom:11.5rem;
    }

    span{
        font-size:1.5rem;
    }
`;

export const ModalBody = styled.div`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    width:auto;
    height:auto;
    justify-content:space-evenly;
    position:relative;
`;

export const BuildChart = styled.div`


`;





export const Container = styled.div`

display:flex;
flex-direction:column;
justify-content:space-around;
position:relative;


.BattleBackground{
    position:absolute;
    z-index:0;
    background-repeat: no-repeat;
    background-size: contain;
    width:46rem;
}

.react-switch{
    margin-top:1rem;
    height:1rem;
}

.BattleImage{
    margin-right:3rem;
    align-self:flex-start;
    margin-top:2.2rem;
}

`;