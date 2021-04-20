import { useCallback} from 'react';

import {EvolutionTree} from './styles'
import { usePokemonsInfo } from '../../hooks/PokeContext';
import { usePokemonsImg } from '../../hooks/PokeImages';
import {Dex} from '@pkmn/dex'


interface EvolutionsMethodsProps{
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
    tradeSpecies:{name:string,url:string},
    trigger:string,
}

export function PokeEvolutionTree() {
    const {selectedPokemon, changeSelectedGen, pokeTree, SelectPokemon} =usePokemonsInfo();
    const {GetPokemonImg, getItemImg} = usePokemonsImg();
    const BasePokemon = "Don't change while Open" //using this to made the pokeTree not reender on click


    function EvolutionMethod(methods:EvolutionsMethodsProps){
        let Fullmethod = '';
        let shed='';
        let itemName='';
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
        if(methods.trigger==='other'){
            if (selectedPokemon==="farfetchd"){
                shed+="Get three critical hits in a single battle"
            }
        }
        if(methods.partySpecies!==null){
            Fullmethod+=`with a ${methods.partySpecies.name} in party`
        }
        if(methods.relativePhysicalStats!==null){
            Fullmethod+=`based on ${methods.relativePhysicalStats}`
        }
        if(methods.tradeSpecies!==null){
            Fullmethod+=`for a ${methods.tradeSpecies.name}`
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

    const BuildEvolutionTree = useCallback(()=>{
        if(pokeTree.evolutionTree.baseForm.name!=='error' && pokeTree.evolutionTree.evolutions.length>0){
            let baseForm=GetPokemonImg({Pokemon:{name:pokeTree.evolutionTree.baseForm.name, type:'animated'}})
        return(
            <EvolutionTree>
            <div className="BaseForm">
            <div className="EvolutionPokemonWrap">
                <img  className="EvolutionPokemonImg" 
                src={baseForm} 
                alt={`${selectedPokemon} baseForm Sprite`} 
                onClick={()=>{SelectPokemon(pokeTree.evolutionTree.baseForm.name);}}/>
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
                    <img className="EvolutionPokemonImg" src={GetPokemonImg({Pokemon:{name:evolutions.name, type:'animated'}})} alt=""
                    onClick={()=>{SelectPokemon(evolutions.name);}}/>
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
                            <img className="EvolutionPokemonImg" 
                            src={GetPokemonImg({Pokemon:{name:evolutions.name, type:'animated'}})} 
                            alt="" 
                            onClick={()=>{SelectPokemon(evolutions.name);}}/>
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
    },[BasePokemon]) 

    return(
        <BuildEvolutionTree/>
    )
}