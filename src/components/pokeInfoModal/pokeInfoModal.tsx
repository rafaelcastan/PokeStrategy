import Modal from 'react-modal';
import {useCallback,  useState } from 'react';
import Switch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFistRaised, faShieldAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Container, PokemonCard,
         PokemonNameAndAbilities, StatsBars, 
         ModalBody, CloseModalButton, PokemonTypes, PokemonType,
         TypesWrap, TypesRelationsBox, PokemonTypeRelations, 
         TypesRelationsBoxMixed, TypesChart} from "./styles";
         
import { usePokemonsInfo } from '../../hooks/PokeContext';
import { usePokemonsImg } from '../../hooks/PokeImages';
import StatsBar from '../Statsbar/statsBar'
import BackgroundImg from '../../assets/background.png';
import PokemonsBattlingImg from '../pokemonsBattle/battleScene'
import {Builds} from '../builds/builds'
import {PokeEvolutionTree} from '../pokeTreeEvolution/poketree'


interface PokeInfoModalProps{
    isOpen:boolean;
    onRequestClose:() => void;
}

interface DefenseTypesProps{
    fourfoldDamageFrom: string[],
    doubleDamageFrom: string[],
    halfDamageFrom: string[],
    quarterDamageFrom: string[],
    noDamageFrom: string[],
}


export function PokeInfoModal({isOpen, onRequestClose}:PokeInfoModalProps){
    const {selectedPokemon, pokemonInfo, capitalizeFirstLetter, typesRelations} =usePokemonsInfo();
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
      
    let TypeRelationsChart =   useCallback(()=>{
        const [isAtack, setIsAtack] = useState(false);
        const handleChangeInTypes = nextChecked => { //Switch set
            setIsAtack(nextChecked);
          };
        let DefenseTypesRelations: DefenseTypesProps = {
            fourfoldDamageFrom: [],
            doubleDamageFrom: [],
            halfDamageFrom: [],
            quarterDamageFrom:[],
            noDamageFrom: [],
        }

        typesRelations.map((type, index)=>{

            if(type.noDamageFrom[index]!==''){
                DefenseTypesRelations.noDamageFrom=[...DefenseTypesRelations.noDamageFrom,...type.noDamageFrom] 
            }

        })


        if (typesRelations.length>0 && typesRelations[1]!==undefined){ //some pokemons have 2 types, so we have to build a new resistance for it

            let TypesToRemoveFromDouble = ['']

            DefenseTypesRelations.fourfoldDamageFrom= typesRelations[0].doubleDamageFrom
            .filter (type => typesRelations[1].doubleDamageFrom.includes(type));

            DefenseTypesRelations.quarterDamageFrom = typesRelations[0].halfDamageFrom
            .filter (type => typesRelations[1].halfDamageFrom.includes(type));

            TypesToRemoveFromDouble = typesRelations[0].doubleDamageFrom.filter
            (type => typesRelations[1].halfDamageFrom.includes(type))
            .concat((typesRelations[1].doubleDamageFrom.filter
            (type => typesRelations[0].halfDamageFrom.includes(type))));


           DefenseTypesRelations.doubleDamageFrom = typesRelations[0].doubleDamageFrom
           .concat(typesRelations[1].doubleDamageFrom)
           .filter((type)=>!TypesToRemoveFromDouble.includes(type))
           .filter((type)=>!DefenseTypesRelations.fourfoldDamageFrom.includes(type))
           .filter((type)=>!DefenseTypesRelations.noDamageFrom.includes(type))

           DefenseTypesRelations.halfDamageFrom = typesRelations[0].halfDamageFrom.concat(typesRelations[1].halfDamageFrom)
           .filter((type)=>!DefenseTypesRelations.doubleDamageFrom.includes(type))
           .filter((type)=>!DefenseTypesRelations.fourfoldDamageFrom.includes(type))
           .filter((type)=>!DefenseTypesRelations.noDamageFrom.includes(type))
           .filter((type)=>!DefenseTypesRelations.quarterDamageFrom.includes(type))
           .filter((type)=>!TypesToRemoveFromDouble.includes(type))
        }
        else{
            typesRelations.map((type, index)=>{
                DefenseTypesRelations.doubleDamageFrom = type.doubleDamageFrom
                DefenseTypesRelations.halfDamageFrom = type.halfDamageFrom
                DefenseTypesRelations.noDamageFrom = type.noDamageFrom
            })
        }

       
            return(
            <TypesChart>
                <Switch
                onChange={handleChangeInTypes}
                checked={isAtack}
                className="react-switch-Types"
                offColor="#e10054"
                onColor="#049fe8"
                uncheckedIcon={
                <div style={{display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontSize: 20}}>
                <FontAwesomeIcon style={{color:'black'}} icon={faShieldAlt}/>
                </div>}
                checkedIcon={
                    <div style={{display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 20}}>
                    <FontAwesomeIcon style={{color:'black'}} icon={faFistRaised}/>
                    </div>}
            />
            {isAtack ? (
               <TypesWrap>
               {typesRelations.map((type,index)=>{
                   return(
                   <TypesRelationsBox types={pokemonInfo.types[index].name}>
                       <PokemonTypeRelations types={pokemonInfo.types[index].name} 
                       key={pokemonInfo.types[index].name+'title'}>
                       {capitalizeFirstLetter(pokemonInfo.types[index].name)}
                       </PokemonTypeRelations>
                       <span>Does 2X damage to:</span>
                       <div className="TypesAdvantageBox">
                       {type.doubleDamageTo.map((dealsDoubleDamage,index2)=>{
                           return(
                           <PokemonTypeRelations types={dealsDoubleDamage} 
                           key={dealsDoubleDamage+index2}>
                           {capitalizeFirstLetter(dealsDoubleDamage)}
                           </PokemonTypeRelations>
                           )
                       })}
                       </div>
                       <span> Does &frac12; damage to:</span>
                       <div className="TypesAdvantageBox">
                       {type.halfDamageTo.map((dealsHalfDamage,index2)=>{
                           return(
                           <PokemonTypeRelations types={dealsHalfDamage} 
                           key={dealsHalfDamage+index2}>
                           {capitalizeFirstLetter(dealsHalfDamage)}
                           </PokemonTypeRelations>
                           )
                       })}
                       </div>
                       {type.noDamageTo[0]!=='' && (
                       <>
                       <span>Does zero damage to:</span>
                       <div className="TypesAdvantageBox">
                       {type.noDamageTo.map((dealsNoDamage,index2)=>{
                           return(
                           <PokemonTypeRelations types={dealsNoDamage} 
                           key={dealsNoDamage+index2}>
                           {capitalizeFirstLetter(dealsNoDamage)}
                           </PokemonTypeRelations>
                           )
                       })}
                       </div>
                       </>
                       )}
                   </TypesRelationsBox>
                   )
               })}
           </TypesWrap>
            )

            :

            (
                <TypesWrap>
                     <TypesRelationsBoxMixed type1={pokemonInfo.types[0].name}
                     type2={!(pokemonInfo.types.length>1) ? (pokemonInfo.types[0].name):(pokemonInfo.types[1].name)}
                     >
                        {(pokemonInfo.types.length>1) ? (
                            <div className="TypesMixedTitle">
                            <PokemonTypeRelations types={pokemonInfo.types[0].name}>
                            {capitalizeFirstLetter(pokemonInfo.types[0].name)}
                            </PokemonTypeRelations>
                            <span>+</span>
                            <PokemonTypeRelations types={pokemonInfo.types[1].name}>
                            {capitalizeFirstLetter(pokemonInfo.types[1].name)}
                            </PokemonTypeRelations>
                            </div>
                        ):(
                            <div className="TypesMixedTitle">
                             <PokemonTypeRelations types={pokemonInfo.types[0].name}>
                             {capitalizeFirstLetter(pokemonInfo.types[0].name)}
                             </PokemonTypeRelations>
                             </div>
                         )}
                        {(DefenseTypesRelations.fourfoldDamageFrom.length>0) && (
                            <>
                            <span>Takes 4X damage from:</span>
                            <div className="TypesAdvantageBox">
                            {DefenseTypesRelations.fourfoldDamageFrom.map((receiveFourfoldDamage,index)=>{
                                return(
                                <PokemonTypeRelations types={receiveFourfoldDamage} 
                                key={receiveFourfoldDamage+index}>
                                {capitalizeFirstLetter(receiveFourfoldDamage)}
                                </PokemonTypeRelations>
                                )
                            })}
                           </div>
                           </>
                        )}
                        <span>Takes 2X damage from:</span>
                        <div className="TypesAdvantageBox">
                        {DefenseTypesRelations.doubleDamageFrom.map((receiveDoubleDamageFrom,index)=>{
                                return(
                                <PokemonTypeRelations types={receiveDoubleDamageFrom} 
                                key={receiveDoubleDamageFrom+index}>
                                {capitalizeFirstLetter(receiveDoubleDamageFrom)}
                                </PokemonTypeRelations>
                                )
                        })}
                        </div>
                        <span> Takes &frac12; damage from:</span>
                       <div className="TypesAdvantageBox">
                       {DefenseTypesRelations.halfDamageFrom.map((receiveHalfDamageFrom,index)=>{
                           return(
                           <PokemonTypeRelations types={receiveHalfDamageFrom} 
                           key={receiveHalfDamageFrom+index}>
                           {capitalizeFirstLetter(receiveHalfDamageFrom)}
                           </PokemonTypeRelations>
                           )
                       })}
                       </div>
                       {(DefenseTypesRelations.quarterDamageFrom.length>0) && (
                           <>
                           <span> Takes &frac14; damage from:</span>
                           <div className="TypesAdvantageBox">
                           {DefenseTypesRelations.quarterDamageFrom.map((receiveQuarterDamageFrom,index)=>{
                               return(
                               <PokemonTypeRelations types={receiveQuarterDamageFrom} 
                               key={receiveQuarterDamageFrom+index}>
                               {capitalizeFirstLetter(receiveQuarterDamageFrom)}
                               </PokemonTypeRelations>
                               )
                           })}
                           </div>
                           </>
                       )}
                       {(DefenseTypesRelations.noDamageFrom[0]!=='') && (
                           <>
                           {console.log(DefenseTypesRelations.noDamageFrom)}
                           <span> Takes 0 damage from:</span>
                           <div className="TypesAdvantageBox">
                           {DefenseTypesRelations.noDamageFrom.map((receiveZeroDamageFrom,index)=>{
                               return(
                               <PokemonTypeRelations types={receiveZeroDamageFrom} 
                               key={receiveZeroDamageFrom+index}>
                               {capitalizeFirstLetter(receiveZeroDamageFrom)}
                               </PokemonTypeRelations>
                               )
                           })}
                           </div>
                           </>
                       )}
                     </TypesRelationsBoxMixed>
                </TypesWrap>
            
            )
            }
            </TypesChart>
            )

        },[typesRelations])
    


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
                    <p key={selectedPokemon+abilities.name+index}>{abilities.name} {abilities.isHidden && <span>: Hidden</span>}</p>
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