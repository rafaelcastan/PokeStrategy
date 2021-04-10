import { usePokemonsImg } from "../../hooks/PokeImages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Container } from "./styles";
import {Img} from 'react-image'
import { usePokemonsInfo } from "../../hooks/PokeContext";

interface PokeCardProps{
    PokeInfo:{
        name:string,
    }
    Size?:number,
}

export function PokeCard ({PokeInfo,Size}:PokeCardProps){
    const { GetPokemonImg } = usePokemonsImg();
    const {SelectPokemon} =usePokemonsInfo();
    const imgError =  'https://1.bp.blogspot.com/_KBmmkCxTLY8/TMBfCU6xtBI/AAAAAAAAAFI/Ia5W4Suucww/s1600/kawax-pokeball-3097.png';
    const PokemonImage = GetPokemonImg({Pokemon:{name:PokeInfo.name, type:'officialArtwork'}})
    const pokemonGif = GetPokemonImg({Pokemon:{name:PokeInfo.name, type:'animated'}})

    return(
    <Container onClick={()=>SelectPokemon(PokeInfo.name)} resize={Size}>
        <Img className="Image"  
        alt={`${PokeInfo.name} sprite `} 
        loader={<FontAwesomeIcon icon={faSpinner} style={{width:'2rem', alignSelf:'center'}}/>}
        unloader={<FontAwesomeIcon icon={faFileExcel}/>}
        key={Date.now()}
        loading="lazy"
        src={[PokemonImage, imgError]}
        onClick={e => {(e.currentTarget.src =pokemonGif)}}
        onMouseEnter={e => {(e.currentTarget.src =pokemonGif)}}
        onMouseLeave={e => {(e.currentTarget.src = PokemonImage)}}/>
        <span>{PokeInfo.name}</span>
    </Container>
    )
};
