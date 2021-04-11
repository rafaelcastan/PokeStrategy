import Modal from 'react-modal';
import { useState } from 'react';
import Switch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {Img} from 'react-image';

import { Container, PokemonsBattling, PokemonCard, 
         PokemonNameAndAbilities, StatsBars, EvolutionTree, 
         ModalBody, CloseModalButton } from "./styles";
import { usePokemonsInfo } from '../../hooks/PokeContext';
import { usePokemonsImg } from '../../hooks/PokeImages';
import {StatsBar} from '../Statsbar/statsBar'
import BackgroundImg from '../../assets/background.png';


interface PokeInfoModalProps{
    isOpen:boolean;
    onRequestClose:() => void;
}

interface EvolutionsMethods{
        gender:number,
        heldItem:{name:string,url:string},
        item:{name:string, url:string},
        knownMove:{name:string,url:string},
        knownMoveType:{name:string,url:string},
        location:{name:string,url:string},
        minAffection:number,
        minBeautty:number,
        minHappines:number,
        minLevel:number,
        needsOverworldRain:boolean,
        partySpecies:{name:string, url:string},
        partyType:{name:string, url:string},
        relativePhysicalStats:number,
        timeOfDay:string,
        tradeSpecies:string,
        trigger:string,
}

export function PokeInfoModal({isOpen, onRequestClose}:PokeInfoModalProps){
    const {selectedPokemon, pokemonInfo, capitalizeFirstLetter, pokeTree} =usePokemonsInfo();
    const {GetPokemonImg, getItemImg} = usePokemonsImg();
    const [checked, setChecked] = useState(false);


    // console.log(pokeTree)
    // console.log(pokemonInfo)

    const handleChange = nextChecked => { //Switch set
        setChecked(nextChecked);
      };

    const customStyles = {
        overlay: {
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            background:'grey',
            border:'none',
        }
      };

        const artworkUrl = GetPokemonImg({Pokemon:{name:selectedPokemon, type:'officialArtwork'}})

        const animatedUrl = GetPokemonImg({Pokemon:{name:selectedPokemon, type:'animated'}})

        const spriteFrontUrls = [GetPokemonImg({Pokemon:{name:selectedPokemon, type:'frontSprite', gender:'male'}}),
                                 GetPokemonImg({Pokemon:{name:selectedPokemon, type:'frontSprite', gender:'female'}})]

        const spriteBackUrls = [GetPokemonImg({Pokemon:{name:selectedPokemon, type:'backSprite', gender:'male'}}),
                                GetPokemonImg({Pokemon:{name:selectedPokemon, type:'backSprite', gender:'female'}})]

        const shinyFrontUrls =[GetPokemonImg({Pokemon:{name:selectedPokemon, type:'frontShiny', gender:'male'}}),
                               GetPokemonImg({Pokemon:{name:selectedPokemon, type:'frontShiny', gender:'female'}})];

        
        const shinyBackUrls =[GetPokemonImg({Pokemon:{name:selectedPokemon, type:'backShiny', gender:'male'}}),
                              GetPokemonImg({Pokemon:{name:selectedPokemon, type:'backShiny', gender:'female'}})];


    function LoadBattleImages(Urls:string[], ImgClass:string, SpanClass:string, isFront:boolean){
        if(Urls[0]!==Urls[1]){
            return(
            <PokemonsBattling isTwoPokemonsRenderized={false} isPokemonBack={isFront}>
                {Urls.map((image, index)=>{
                return(
                    <div className="imgBattleWrap">
                        <img className={ImgClass} key={selectedPokemon+image+index} src={image} alt={`${selectedPokemon} Sprite`}/>
                        {index===0 ? 
                        (<span key={selectedPokemon+'male image'} className={SpanClass}>Male</span>)
                        :
                        (<span key={selectedPokemon+'female image'} className={SpanClass}>Female</span>)}
                    </div>
                )})}
            </PokemonsBattling>
                )
            }
        else{
            return(
                <PokemonsBattling isTwoPokemonsRenderized={true} isPokemonBack={isFront}>
                <div className="imgBattleWrap">
                    <Img className={ImgClass} src={[Urls[0], 'https://static.wikia.nocookie.net/pokemon/images/5/57/FRLG_Leaf_Back_Sprite.png']} alt={`${selectedPokemon} Sprite`}/>
                </div>
                </PokemonsBattling>
            )
        }  
    }

    

    function buildEvolutionTree(){
        console.log(pokeTree)
        if(pokeTree.evolutionTree.baseForm.name!=='error' && pokeTree.evolutionTree.evolutions.length>0){
            let baseForm=GetPokemonImg({Pokemon:{name:pokeTree.evolutionTree.baseForm.name, type:'animated'}})
        return(
            <EvolutionTree>
            <div className="BaseForm">
            <div className="EvolutionPokemonWrap">
                <img  className="EvolutionPokemonImg" src={baseForm} alt=""/>
                <span style={{textTransform:"capitalize"}}>{pokeTree.evolutionTree.baseForm.name}</span>
            </div>
            </div>
            <div className="variousPokemonsWraper">
            {pokeTree.evolutionTree.evolutions.map((evolutions)=>{ //Evolutions 2
                return(<>
                <div className="EvolutionWrap">
                <div className="MultEvolutionsMethods">
                {evolutions.method.map((method, index)=>{
                    return(
                        <div className="EvolutionMethods">
                        {index>=1 && (<span style={{marginBottom:'0.5rem'}}>OR</span>)}
                        <span key={index+method.trigger}>Evolves by: {method.trigger.replace('-',' ')}</span>
                                    {EvolutionMethod(method)}
                        </div>
                    )
                })}
                </div>
                <div className="EvolutionPokemonWrap">
                    <img className="EvolutionPokemonImg" src={GetPokemonImg({Pokemon:{name:evolutions.name, type:'animated'}})} alt=""/>
                    <span style={{textTransform:"capitalize"}}>
                    {evolutions.name}
                    </span>
                </div>
                </div>
                </>
                )
            })}
            </div>
            <div className="variousPokemonsWraper">
                {pokeTree.evolutionTree.evolutions.map((evolutions3)=>{ //Evolutions 3
                    return(<>
                    {evolutions3.evolution.map((evolutions)=>{
                        return(
                            <>
                            <div className="EvolutionWrap">
                            <div className="MultEvolutionsMethods">
                            {evolutions.method.map((method, index)=>{
                                return(
                                    <div className="EvolutionMethods">
                                    <span key={index+method.trigger}>Evolves by: {method.trigger.replace('-',' ')}</span>
                                    {EvolutionMethod(method)}
                                    </div>
                                )
                            })}
                            </div>
                            <div className="EvolutionPokemonWrap">
                            <img className="EvolutionPokemonImg" src={GetPokemonImg({Pokemon:{name:evolutions.name, type:'animated'}})} alt=""/>
                            <span style={{textTransform:"capitalize"}}>
                            {evolutions.name}
                            </span>
                            </div>
                            </div>
                            </>
                        )
                    })}                    
                    </>
                    )
                })}
            </div>
            </EvolutionTree>
        )
        }else{ 
        return(null)
        }
    }

    function EvolutionMethod(methods:EvolutionsMethods){
        let Fullmethod = '';
        let shed='';
        let itemName='';
        let heldingItemName='';
        let trade='';
        if(methods.item!==null){
            itemName+=methods.item.name.replace('-',' ')
        }
        if(methods.knownMove!==null){
            Fullmethod+=`with ${methods.knownMove.name.replace('-',' ')} move learned`
        }
        if(methods.knownMoveType!==null){
            Fullmethod+=`with an ${methods.knownMoveType.name.replace('-',' ')} move learned`
        }
        if(methods.location!==null){
            Fullmethod+=`at ${methods.location.name.replace('-',' ')}`
        }
        if(methods.minLevel!==null){
            Fullmethod+=`to level ${methods.minLevel}`
        }
        if (methods.heldItem!==null){
            trade+=`holding`
        }
        if(methods.timeOfDay!==''){
            Fullmethod+=` at ${methods.timeOfDay}`
        }
        if(methods.minHappines!==null){
            Fullmethod+=` and with ${methods.minHappines} of happines`
        }
        if(methods.gender!==null){
            switch(methods.gender){
            case 1: {Fullmethod+=' being female'} break;
            case 2: {Fullmethod+=` being male`} break;
            case 3: {Fullmethod+=` being genderless`} break;
            }
        }
        if(methods.minAffection!==null){
            Fullmethod+=` and with level ${methods.minAffection} of affection`
        }
        if(methods.minBeautty!==null){
            Fullmethod+=` and with ${methods.minBeautty}  of beauty`
        }
        if(methods.needsOverworldRain){
            Fullmethod+=` when is raining`
        }
        if (methods.partyType!==null){
            Fullmethod+=` and with a ${methods.partyType.name} type pokemon in party`
        }
        if(methods.trigger==='shed'){
            shed+="Have Nincada in your party, as well as one additional open slot (so, a total of five or fewer Pokémon in your party), and at least one PokéBall in your bag. Then, evolve Nincada into Ninjask by raising it to level 20. You'll find a Shedinja added to your party in addition to the Ninjask once it has evolved."
        }
        return (
            <>
            <span>{trade}</span>
            {methods.item!==null && (<div className="ItemImg"><img src={getItemImg(methods.item.name)} alt={`${methods.item.name} sprite`}/> 
            <span style={{textTransform:"capitalize", fontSize:"1.2rem"}}>({itemName})</span></div>
            )}
            {methods.heldItem!==null && (<div className="ItemImg"><img src={getItemImg(methods.heldItem.name)} alt={`${methods.heldItem.name} sprite`}/> 
            <span style={{textTransform:"capitalize", fontSize:"1.2rem"}}>({methods.heldItem.name})</span></div>
            )}
            <span >{Fullmethod}</span>
            {(shed!=='') && (<span  className="tip" >{`${shed.slice(0,4)}...`}<span >{shed}</span></span>)}
            </>
            )
        
    }


    return(
        <Modal isOpen={isOpen} 
               onRequestClose={onRequestClose}
               style={customStyles}
        >
        <Container onAuxClick={(e)=>{ if(e.button!==2){e.preventDefault(); onRequestClose()}}}>
            <CloseModalButton onClick={()=>onRequestClose()} ><FontAwesomeIcon style={{width:'3rem', color:'red'}} icon={faTimes}  size="3x"/></CloseModalButton>
            <PokemonCard>
            <img className="Artwork" src={artworkUrl} alt="Pokemon Artwork Image"/>
            <PokemonNameAndAbilities>
            <span className="PokemonName">{selectedPokemon}</span>
            {/* {!pokemonInfo.description!==undefined ? 
            (<span>Description: {pokemonInfo.description}</span>)
            :
            (<span>Description: Not Provided </span>)} */}
            <p className="PokemonAbilities">Abilities:</p>
            <div className="PokemonAbilitiesDetails">{pokemonInfo.abilities.map((abilities,index)=>{
                return(
                    <p key={selectedPokemon+abilities.name+index}>{abilities.name} {abilities.isHidden && <span>: Hidden</span>}</p>
                )
            })}
            </div>
            </PokemonNameAndAbilities>
            <StatsBars>
            {pokemonInfo.stats.map((stats)=>{
                return(
                    <>
                    <span>{capitalizeFirstLetter(stats.name)}</span>
                    <StatsBar key={selectedPokemon+stats.name} Value={stats.value}/>
                    </>
                )
            })}
            </StatsBars>
            <img className="AnimatedPokemon" src={animatedUrl} alt="Pokemon animated gif"/>
            </PokemonCard>
            <ModalBody>
                {buildEvolutionTree()}
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
            {!checked ? (
                <div>
                {LoadBattleImages(spriteFrontUrls, 'PokemonBattleFrontSprite', 'imgDescriptionFrontSprite', false)}
                {LoadBattleImages(spriteBackUrls, 'PokemonBattleBackSprite', 'imgDescriptionBackSprite', true)}
                </div>
            ):(
                <div>
                {LoadBattleImages(shinyFrontUrls, 'PokemonBattleFrontSprite', 'imgDescriptionFrontSprite', false)}
                {LoadBattleImages(shinyBackUrls, 'PokemonBattleBackSprite', 'imgDescriptionBackSprite', true)}
                </div>
            )}       
            </div>
            </ModalBody>
            </Container>
        </Modal>
    )
}