import {BuildWrap} from './styles';
import {usePokemonStrategy} from '../../hooks/Strategy';
import { usePokemonsInfo } from '../../hooks/PokeContext';

interface StrategyChartProps{
    selectedGen:number,
    format:string
}

export function StrategyChart({selectedGen,format}:StrategyChartProps){
    const {verifyAvailableGen, getStrategy} = usePokemonStrategy()
    const {selectedPokemon, pokemonInfo, capitalizeFirstLetter, pokeTree, SelectPokemon} =usePokemonsInfo();
    const ImgUrl= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"
    let pokemonbuild = getStrategy({gen:selectedGen,format:format,pokemon:capitalizeFirstLetter(selectedPokemon)})

   return(
       <>
           {pokemonbuild.map((builds,index)=>{
               return(
                <BuildWrap>              
               <div className="BuildBody">
                <div className="Moves">
                <span className="BuildName">Build name: {builds.name}</span>
               {builds.moves.map((move,index)=>{
                return(
                <span>Move {index+1}: {move}</span>
                )
                })}
                </div>
             
                <div className="Info">
                    {builds.item!==undefined && (
                    <div className="ItemWrap">
                    <span>Item: {builds.item}</span>
                    <img key={index} src={`${ImgUrl+builds.item.toLowerCase().replaceAll(' ','-')}.png`} alt={`${builds.item}`}/>
                    </div>
                    )}
                    {builds.ability!==undefined && (
                    <span>Ability: {builds.ability}</span>
                    )}
                    {builds.nature!==undefined && (
                    <span>Nature: {builds.nature}</span>
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