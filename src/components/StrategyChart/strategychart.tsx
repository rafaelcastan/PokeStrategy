import {BuildWrap} from './styles';
import {usePokemonStrategy} from '../../hooks/Strategy';
import { usePokemonsInfo } from '../../hooks/PokeContext';
import React, { useEffect, useState } from 'react';
import {Icons} from '@pkmn/img';

interface StrategyChartProps{
    selectedGen:number,
    format:string
}

export function StrategyChart({selectedGen,format}:StrategyChartProps){
    const {getStrategy, itensDescription, naturesDescription, getMoveDescription} = usePokemonStrategy()
    const {selectedPokemon, capitalizeFirstLetter, abilitiesDescription} =usePokemonsInfo();
    const ImgUrl= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"
    let pokemonbuild = getStrategy({gen:selectedGen,format:format,pokemon:capitalizeFirstLetter(selectedPokemon)})
    const [haveUpdate, setHaveUpdate] = useState(false)

    useEffect(()=>{
        setHaveUpdate(!haveUpdate)
    },[itensDescription])
 
   return(
       <>
           {pokemonbuild.map((builds,index)=>{
               const itemIcon = React.createElement('span',{style:Icons.getItem(builds.item).css});
               return(
                <BuildWrap key={builds.name+index+'20'}>              
               <div className="BuildBody">
                <div className="Moves">
                <span className="BuildName">Build name: {builds.name}</span>
               {builds.moves.map((move,index)=>{
                return(
                    <div key={move+index} style={{marginBottom:"0.5rem"}}>
                <span style={{marginRight:"0.5rem"}}>Move {index+1}:</span>
                    <span className="tip" >{move}
                        <span>
                            {getMoveDescription(move)}
                        </span>
                    </span>
                    </div>
                )
                })}
                </div>
                <div className="Info">
                    {builds.item!==undefined && (
                    <div className="ItemWrap">
                        <span style={{marginRight:"0.5rem"}}>Item:</span>
                    <span className="tip" >{builds.item}
                        <span>
                            {itensDescription.map((itens)=>{if(builds.item===itens.name){return itens.description}})}
                        </span>
                    </span>
                    {itemIcon}
                    </div>
                    )}
                    {builds.ability!==undefined && (
                        <div style={{marginBottom:"0.5rem"}}>
                            <span style={{marginRight:"0.5rem"}}>Ability:</span>
                    <span className="tip" >{builds.ability}
                        <span >
                        {abilitiesDescription.map((abilities)=>{if(builds.ability===abilities.name){return abilities.description}})}
                        </span>
                    </span>
                    </div>
                    )}
                    
                    {builds.nature!==undefined && (
                    
                    <div style={{marginBottom:"0.5rem"}}>
                            <span style={{marginRight:"0.5rem"}}>Nature:</span>
                    <span className="tip" >{builds.nature}
                        <span >
                           {naturesDescription.map((nature)=>{if(builds.nature.toLowerCase()===nature.name.toLowerCase())
                            {return `Increases ${capitalizeFirstLetter(nature.increasedStat)} and reduces ${capitalizeFirstLetter(nature.decreasedStat)}`}})}
                        </span>
                    </span>
                    </div>
                    )}
                    {builds.evs!==undefined && (
                        <span>EVs: {Object.entries(builds.evs).join(" / ").replaceAll(',', ' ').toUpperCase()}</span>
                    )}
                </div>
                </div>
                </BuildWrap>
                )
            })}
       </>
   )
}