import { usePokemonsImg } from "../../hooks/PokeImages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Container } from "./styles";
import {Img} from 'react-image'

interface PokeCardProps{
    ModalOpen: ()=>void,
    PokeInfo:{
        name:string,
    }
    Size?:number,
}

export function PokeCard ({PokeInfo,ModalOpen,Size}:PokeCardProps){
    const { GetPokemonImg } = usePokemonsImg();
    const imgError =  'https://1.bp.blogspot.com/_KBmmkCxTLY8/TMBfCU6xtBI/AAAAAAAAAFI/Ia5W4Suucww/s1600/kawax-pokeball-3097.png';

    return(
    <Container onClick={()=>ModalOpen()} resize={Size}>
        <Img className="Image"  
        alt={`${PokeInfo.name} sprite `} 
        loader={<FontAwesomeIcon icon={faSpinner} style={{width:'2rem', alignSelf:'center'}}/>}
        unloader={<FontAwesomeIcon icon={faFileExcel}/>}
        key={Date.now()}
        loading="lazy"
        src={[GetPokemonImg({PokeInfo:{name:PokeInfo.name, type:'officialArtwork'}}), imgError]}
        onClick={()=>ModalOpen()}/>
        <span onClick={()=>ModalOpen()}>{PokeInfo.name}</span>
    </Container>
    )
};
