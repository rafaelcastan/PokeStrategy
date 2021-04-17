import { useCallback, useState } from "react";
import { faFistRaised, faShieldAlt} from '@fortawesome/free-solid-svg-icons';
import Switch from "react-switch";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TypesWrap, TypesRelationsBox, PokemonTypeRelations, 
    TypesRelationsBoxMixed, TypesChart} from "./styles";
import { usePokemonsInfo } from "../../hooks/PokeContext";

interface DefenseTypesProps{
    fourfoldDamageFrom: string[],
    doubleDamageFrom: string[],
    halfDamageFrom: string[],
    quarterDamageFrom: string[],
    noDamageFrom: string[],
}

export function TypeRelationsChart (){

    const {pokemonInfo, capitalizeFirstLetter, typesRelations, abilitiesDescription} =usePokemonsInfo();

    let TypeRelationsChartBuilder =   useCallback(()=>{
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
                DefenseTypesRelations.noDamageFrom =  DefenseTypesRelations.noDamageFrom.filter((str)=> {return /\S/.test(str)})
            }
    
        })
    
    
        if (typesRelations.length>0 && typesRelations[1]!==undefined){ //some pokemons have 2 types, so we have to build a new resistance for it
    
            let TypesToRemoveFromDouble = ['']
    
            DefenseTypesRelations.fourfoldDamageFrom= typesRelations[0].doubleDamageFrom
            .filter (type => typesRelations[1].doubleDamageFrom.includes(type))
            .filter((str)=> {return /\S/.test(str)});
    
            DefenseTypesRelations.quarterDamageFrom = typesRelations[0].halfDamageFrom
            .filter (type => typesRelations[1].halfDamageFrom.includes(type))
            .filter((str)=> {return /\S/.test(str)});
    
            TypesToRemoveFromDouble = typesRelations[0].doubleDamageFrom.filter
            (type => typesRelations[1].halfDamageFrom.includes(type))
            .concat((typesRelations[1].doubleDamageFrom.filter
            (type => typesRelations[0].halfDamageFrom.includes(type))))
            .filter((str)=> {return /\S/.test(str)});
    
    
           DefenseTypesRelations.doubleDamageFrom = typesRelations[0].doubleDamageFrom
           .concat(typesRelations[1].doubleDamageFrom)
           .filter((type)=>!TypesToRemoveFromDouble.includes(type))
           .filter((type)=>!DefenseTypesRelations.fourfoldDamageFrom.includes(type))
           .filter((type)=>!DefenseTypesRelations.noDamageFrom.includes(type))
           .filter((str)=> {return /\S/.test(str)})
    
           DefenseTypesRelations.halfDamageFrom = typesRelations[0].halfDamageFrom.concat(typesRelations[1].halfDamageFrom)
           .filter((type)=>!DefenseTypesRelations.doubleDamageFrom.includes(type))
           .filter((type)=>!DefenseTypesRelations.fourfoldDamageFrom.includes(type))
           .filter((type)=>!DefenseTypesRelations.noDamageFrom.includes(type))
           .filter((type)=>!DefenseTypesRelations.quarterDamageFrom.includes(type))
           .filter((type)=>!TypesToRemoveFromDouble.includes(type))
           .filter((str)=> {return /\S/.test(str)})
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
                   <TypesRelationsBox key={type+index.toString()} types={pokemonInfo.types[index].name}>
                       <PokemonTypeRelations types={pokemonInfo.types[index].name} 
                       key={pokemonInfo.types[index].name+'title'}>
                       {capitalizeFirstLetter(pokemonInfo.types[index].name)}
                       </PokemonTypeRelations>
                       {type.doubleDamageTo[0]!=='' && (
                        <>
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
                        </>
                       )}
                       
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

    return(
        <TypeRelationsChartBuilder/>
    )
}

