import { usePokemonsInfo } from "../../hooks/PokeContext";
import { useCallback, useState } from "react";

import {Container, StyledButtons, ButtonsWrap, PokemonTypeRelations, Tip} from "./styles"
import React from "react";
import { usePokemonStrategy } from "../../hooks/Strategy";

interface LearnSetsProps {
    name:string,
    learnMethods:number
}

export function MoveList (){
    const {capitalizeFirstLetter,selectedGen, movesLearnSets, changeSelectedGen, moveType, selectedPokemon} =usePokemonsInfo();
    const {getMoveDescription} = usePokemonStrategy();
    const Gens=[1,2,3,4,5,6,7,8,]
    const LearMethods = ['L','M', 'T', 'E', 'V', 'S']
    const [choseLearnMethods, setChoseLearnMethods] = useState('L');
    let alreadyLoaded = '';
    let sortedMoves : LearnSetsProps[] = [{
        name:'',
        learnMethods:99
    }]
    let availableMethods = []
    const categoryImgUrl = "https://play.pokemonshowdown.com/sprites/categories/"


    let count=0
    movesLearnSets.map((move)=>{ //getting only the moves that are selected in learnMethods
        if(move.learnMethods.find((method)=>method.match(`${selectedGen+1+choseLearnMethods}`))!==undefined){
            move.learnMethods.filter((gens)=>gens
            .match(`${selectedGen+1+choseLearnMethods}`))
            .map((gen)=>{
                sortedMoves[count] = {
                    name:'',
                    learnMethods:99
                }
                sortedMoves[count].name=move.name
                if(choseLearnMethods==='L'){
                    sortedMoves[count].learnMethods=
                Number(gen.substring(2))
                }

                count++
                }
            );
 
        }
    })
    sortedMoves = sortedMoves.sort((a,b)=>a.learnMethods-b.learnMethods) //sorting the learnMethods to get an ordened array
   
    
    movesLearnSets.map((move)=>{
        LearMethods.map((Method)=>{
            if(move.learnMethods.find((method)=>method.match(selectedGen+1+Method))!==undefined){
                availableMethods.push(Method)
            }
        })
    })
    availableMethods = availableMethods.filter((method,nextmethod) => availableMethods.indexOf(method) === nextmethod)


    const MovesTable = useCallback(()=>{

        return(
            <Container>
                <span style={{alignSelf:"center", fontSize:"2.5rem"}}>Moves Learned:</span>
            <ButtonsWrap>
            <span>Select gen:</span>
            <div>
            {Gens.map((gen, index)=>(
                <StyledButtons isActive={index===selectedGen} onClick={()=>{changeSelectedGen(index); setChoseLearnMethods('L')}}>{gen}</StyledButtons>
            ))}
            </div>

            </ButtonsWrap>

            <ButtonsWrap>
            <span>Select learn method:</span>
            <div>
            {LearMethods.map((Method)=>{
                if(Method==='L' && availableMethods.includes('L')){
                    return(
                    <StyledButtons 
                    isActive={Method===choseLearnMethods} 
                    onClick={()=>{setChoseLearnMethods(Method)}}
                    >
                        Level Up
                    </StyledButtons>
                    )
                }
                if(Method==='M' && availableMethods.includes('M') ){
                    return(
                    <StyledButtons 
                    isActive={Method===choseLearnMethods}  
                    onClick={()=>{setChoseLearnMethods(Method)}}
                    >
                        TM's and TR's
                    </StyledButtons>
                    )
                }
                if(Method==='T' && availableMethods.includes('T') ){
                    return(
                    <StyledButtons  
                    isActive={Method===choseLearnMethods}  
                    onClick={()=>{setChoseLearnMethods(Method)}}
                    >Tutor
                    </StyledButtons>
                    )
                }
                if(Method==='E'  && availableMethods.includes('E')){
                    return(
                    <StyledButtons 
                    isActive={Method===choseLearnMethods}  
                    onClick={()=>{setChoseLearnMethods(Method)}}
                    >
                        Egg Moves
                    </StyledButtons>
                    )
                }
                if(Method==='V' && availableMethods.includes('V')){
                    return(
                    <StyledButtons 
                    isActive={Method===choseLearnMethods} 
                    onClick={()=>{setChoseLearnMethods(Method)}}>
                        Virtual Console
                    </StyledButtons>
                    )
                }
                if(Method==='S' && availableMethods.includes('S')){
                    return(
                    <StyledButtons  
                    isActive={Method===choseLearnMethods} 
                    onClick={()=>{setChoseLearnMethods(Method)}}
                    >
                        Events
                    </StyledButtons>
                    )
                }
            })}
            </div>
            </ButtonsWrap>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    {choseLearnMethods==='L' && (
                        <th>Level Learned</th>
                    )}
                    <th>Type</th>
                    <th>Category</th>
                    <th>Power</th>
                    <th>Accuary</th>
                </tr>
            </thead>

            <tbody>
                        {sortedMoves.map((move,index)=>{
                            let movementType = moveType({move:move.name, infoType:'type'})
                            let movementCategory = moveType({move:move.name, infoType:'category'})
                            return(
                                <>
                                    <tr key={move.name+index}>
                                    {choseLearnMethods==='S' ? (
                                        move.name!==alreadyLoaded && (
                                            <td>
                                                <div>
                                                    <Tip>
                                                    {capitalizeFirstLetter(alreadyLoaded = move.name)}
                                                        <span>
                                                    {getMoveDescription(move.name)}
                                                        </span>
                                                    </Tip>
                                                </div>
                                            </td>
                                        )
                                    )
                                    :
                                    (
                                        <td>
                                            <div>
                                                <span style={{marginRight:"0.5rem"}}></span>
                                                    <Tip >{capitalizeFirstLetter(alreadyLoaded = move.name)}
                                                        <span>
                                                            {getMoveDescription(move.name)}
                                                        </span>
                                                </Tip>
                                            </div>
                                        </td>
                                    )}
                                    {(move.learnMethods!==99 && move.learnMethods!==0) && (
                                        <td key={move.name+"levellearned"}>
                                        {move.learnMethods}
                                        </td>
                                    )}
                                    {move.learnMethods===0 && (
                                        <td key={move.name+"levellearned"}>
                                        Learn by evolving 
                                        </td>
                                    )}
                                    <td>
                                    {movementType!==undefined && (
                                        <PokemonTypeRelations type={movementType.toLowerCase()}>
                                        {movementType}
                                        </PokemonTypeRelations> 
                                    )}
                                   </td>
                                    <td key={move.name+"Category"}>
                                        <img src={`${categoryImgUrl+movementCategory}.png`} alt="Category Image"/>
                                        {movementCategory}
                                    </td>

                                    {moveType({move:move.name, infoType:'basePower'})==='0' ? 
                                    (
                                        <td>-</td>
                                    )
                                    :
                                    (
                                        <td key={move.name+"basePower"}>{moveType({move:move.name, infoType:'basePower'})}</td>
                                    )}
                                    {moveType({move:move.name, infoType:'accuracy'})==='true' ? 
                                    (
                                        <td>-</td>
                                    )
                                    :
                                    (
                                        <td key={move.name+"accuary"}>{moveType({move:move.name, infoType:'accuracy'})}</td>
                                    )}
                                    </tr>
                                </>
                            )
                        })}
            </tbody>
        </table>
    </Container>
        )
    },[movesLearnSets, choseLearnMethods, selectedPokemon])



    return(
        <MovesTable/>
    )
}