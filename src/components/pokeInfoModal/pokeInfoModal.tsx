import Modal from 'react-modal';
import {useCallback,  useState } from 'react';
import Switch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Container, PokemonCard,
         PokemonNameAndAbilities, StatsBars, 
         ModalBody, CloseModalButton, PokemonTypes, PokemonType,
} from "./styles";
         
import { usePokemonsInfo } from '../../hooks/PokeContext';
import { usePokemonsImg } from '../../hooks/PokeImages';
import StatsBar from '../Statsbar/statsBar'
import BackgroundImg from '../../assets/background.png';
import PokemonsBattlingImg from '../pokemonsBattle/battleScene'
import {Builds} from '../builds/builds'
import {PokeEvolutionTree} from '../pokeTreeEvolution/poketree'
import {TypeRelationsChart} from '../PokemonTypes/pokemontypes'


interface PokeInfoModalProps{
    isOpen:boolean;
    onRequestClose:() => void;
}




export function PokeInfoModal({isOpen, onRequestClose}:PokeInfoModalProps){
    const {selectedPokemon, pokemonInfo, capitalizeFirstLetter, typesRelations, abilitiesDescription} =usePokemonsInfo();
    const {GetPokemonImg} = usePokemonsImg();
    const [checked, setChecked] = useState(false);

    const handleChange = nextChecked => { //Switch set
        setChecked(nextChecked);
      };

    const customStyles = {
        overlay: {
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            background:'#696969',
            border:'none',
        }
      };
      
    
    


    function PokemonInfo(){
       const artworkUrl = GetPokemonImg({Pokemon:{name:selectedPokemon, type:'officialArtwork'}})
        return(
            <>
            <img className="Artwork" src={artworkUrl} alt="Pokemon Artwork Image"/>
            <PokemonNameAndAbilities>
            <span className="PokemonName">{selectedPokemon}</span>
            {/* {!pokemonInfo.description!==undefined ? 
            (<span>Description: {pokemonInfo.description}</span>)
            :
            (<span>Description: Not Provided </span>)} */}
            <div className="PokemonAbilitiesDetails">
            <p className="PokemonCardTitle">Abilities:</p>
            {pokemonInfo.abilities.map((abilities,index)=>{
                return(
                    <div key={selectedPokemon+abilities.name+index}>
                    <span className="tip" >{abilities.name}<span >{abilitiesDescription[index].description}</span></span>
                    {abilities.isHidden && <span>: Hidden</span>}
                    </div>
                )
            })}
            </div>
            <PokemonTypes>
            <p className="PokemonCardTitle">Type:</p>
            <div style={{display:"flex", flexDirection:"row"}}>
            {pokemonInfo.types.map((type,index)=>{
                return(
                    <PokemonType types={type.name} className="Type" key={selectedPokemon+type.name+index}>{capitalizeFirstLetter(type.name)}</PokemonType>
                )
            })}
            </div>
            </PokemonTypes>
            </PokemonNameAndAbilities>
            </>
        )
        
    }

    const AnimatedSprite = useCallback(()=>{
        const  animatedUrl = GetPokemonImg({Pokemon:{name:selectedPokemon, type:'animated'}})
        return(
        <img className="AnimatedPokemon" src={animatedUrl} alt="Pokemon animated gif"/>
        )
    },[selectedPokemon]) 


    return(
        <Modal isOpen={isOpen} 
               onRequestClose={onRequestClose}
               style={customStyles}
               
        >
        <Container onAuxClick={(e)=>{ if(e.button!==2){e.preventDefault(); onRequestClose()}}}>
            <CloseModalButton onClick={()=>onRequestClose()} ><FontAwesomeIcon style={{width:'3rem', color:'red'}} icon={faTimes}  size="3x"/></CloseModalButton>
            <PokemonCard type1={pokemonInfo.types[0].name}
                         type2={!(pokemonInfo.types.length>1) ? (pokemonInfo.types[0].name):(pokemonInfo.types[1].name)}>
            <PokemonInfo/>
            <StatsBars>
            {pokemonInfo.stats.map((stats)=>{
                return(
                    <>
                    <span>{capitalizeFirstLetter(stats.name)}</span>
                    <StatsBar key={stats.name} Value={stats.value}/>
                    </>
                )
            })}
            </StatsBars>
            <AnimatedSprite/>
            </PokemonCard>
            <TypeRelationsChart/>

            <ModalBody>
                <div style={{alignSelf:"flex-start", width:'910px'}}>
                <PokeEvolutionTree/>
                <Builds/>
            </div>
            <div className="BattleImage" style={{display:'flex', marginLeft:'1.5rem'}}>
            <div style={{display:'flex',zIndex:2,height:'3rem'}}>
                <span style={{fontSize:"1.5rem", marginRight:'1rem', marginLeft:'1rem', marginTop:'1rem'}}>Shiny: </span>
                <Switch
                onChange={handleChange}
                checked={checked}
                className="react-switch"
            />
            </div>
            <img src={BackgroundImg} alt="Background Image" className="BattleBackground"/>
            
            <PokemonsBattlingImg isShiny={checked}/> 
            </div>
            </ModalBody>
            </Container>
        </Modal>
    )
}