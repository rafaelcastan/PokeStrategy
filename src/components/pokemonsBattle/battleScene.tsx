import { memo, useEffect, useReducer } from 'react';
import { usePokemonsInfo } from '../../hooks/PokeContext';
import { usePokemonsImg } from '../../hooks/PokeImages';
import {PokemonsBattling} from './styles'


interface PokemonsBattlingImgProps{
    isShiny:boolean
}

interface LoadBattleImagesProps{
    isShiny:boolean
}

 function PokemonsBattlingImg({isShiny}:PokemonsBattlingImgProps){
    const {selectedPokemon} =usePokemonsInfo();
    const {GetPokemonImg} = usePokemonsImg();



function LoadBattleImages({isShiny}:LoadBattleImagesProps){
    const spriteFrontUrls = [GetPokemonImg({Pokemon:{name:selectedPokemon, type:'frontSprite', gender:'male'}}),
                             GetPokemonImg({Pokemon:{name:selectedPokemon, type:'frontSprite', gender:'female'}})]

    const spriteBackUrls = [GetPokemonImg({Pokemon:{name:selectedPokemon, type:'backSprite', gender:'male'}}),
                            GetPokemonImg({Pokemon:{name:selectedPokemon, type:'backSprite', gender:'female'}})]

    const shinyFrontUrls =[GetPokemonImg({Pokemon:{name:selectedPokemon, type:'frontShiny', gender:'male'}}),
                           GetPokemonImg({Pokemon:{name:selectedPokemon, type:'frontShiny', gender:'female'}})];


    const shinyBackUrls =[GetPokemonImg({Pokemon:{name:selectedPokemon, type:'backShiny', gender:'male'}}),
                          GetPokemonImg({Pokemon:{name:selectedPokemon, type:'backShiny', gender:'female'}})];

if (isShiny){
    if(shinyFrontUrls[0]!==shinyFrontUrls[1]){
    return(
        <>
    <PokemonsBattling isTwoPokemonsRenderized={false} isPokemonBack={false}>
        {shinyFrontUrls.map((image, index)=>{
        return(
            <div className="imgBattleWrap">
                <img className='PokemonBattleFrontSprite' key={image} src={image} alt={`${selectedPokemon} Sprite`}/>
                {index===0 ? 
                (<span key={index+30} className='imgDescriptionFrontSprite'>Male</span>)
                :
                (<span key={index+31} className='imgDescriptionFrontSprite'>Female</span>)}
            </div>
        )})}
    </PokemonsBattling>
    <PokemonsBattling isTwoPokemonsRenderized={false} isPokemonBack={true}>
    {shinyBackUrls.map((image, index)=>{
    return(
        <div className="imgBattleWrap">
            <img className='PokemonBattleBackSprite' key={image} src={image} alt={`${selectedPokemon} Sprite`}/>
            {index===0 ? 
            (<span key={index+40} className='imgDescriptionBackSprite'>Male</span>)
            :
            (<span key={index+41} className='imgDescriptionBackSprite'>Female</span>)}
        </div>
    )})}
</PokemonsBattling>
    </>
)}
else{
    return(
        <>
        <PokemonsBattling isTwoPokemonsRenderized={true} isPokemonBack={false}>
        <div className="imgBattleWrap">
            <img className='PokemonBattleFrontSprite' src={shinyFrontUrls[0]} alt={`${selectedPokemon} Sprite`}/>
        </div>
        </PokemonsBattling>
        <PokemonsBattling isTwoPokemonsRenderized={true} isPokemonBack={true}>
        <div className="imgBattleWrap">
            <img className='PokemonBattleBackSprite' src={shinyBackUrls[0]} alt={`${selectedPokemon} Sprite`}/>
        </div>
        </PokemonsBattling>
        </>
    )
}}
else{
    if(spriteFrontUrls[0]!==spriteFrontUrls[1]){
        return(
            <>
        <PokemonsBattling isTwoPokemonsRenderized={false} isPokemonBack={false}>
            {spriteFrontUrls.map((image, index)=>{
            return(
                <div className="imgBattleWrap">
                    <img className='PokemonBattleFrontSprite' key={image} src={image} alt={`${selectedPokemon} Sprite`}/>
                    {index===0 ? 
                    (<span key={index+20} className='imgDescriptionFrontSprite'>Male</span>)
                    :
                    (<span key={index+21} className='imgDescriptionFrontSprite'>Female</span>)}
                </div>
            )})}
        </PokemonsBattling>
        <PokemonsBattling isTwoPokemonsRenderized={false} isPokemonBack={true}>
        {spriteBackUrls.map((image, index)=>{
        return(
            <div className="imgBattleWrap">
                <img className='PokemonBattleBackSprite' key={image} src={image} alt={`${selectedPokemon} Sprite`}/>
                {index===0 ? 
                (<span key={index+10} className='imgDescriptionBackSprite'>Male</span>)
                :
                (<span key={index+11} className='imgDescriptionBackSprite'>Female</span>)}
            </div>
        )})}
        </PokemonsBattling>
        </>
        )
        }
    else{
        return(
            <>
            <PokemonsBattling isTwoPokemonsRenderized={true} isPokemonBack={false}>
            <div className="imgBattleWrap">
                <img className='PokemonBattleFrontSprite' src={spriteFrontUrls[0]} alt={`${selectedPokemon} Sprite`}/>
            </div>
            </PokemonsBattling>
            <PokemonsBattling isTwoPokemonsRenderized={true} isPokemonBack={true}>
            <div className="imgBattleWrap">
                <img className='PokemonBattleBackSprite' src={spriteBackUrls[0]} alt={`${selectedPokemon} Sprite`}/>
            </div>
            </PokemonsBattling>
            </>
        )
    }
}
} 
                

    return(
        <div>
    {!isShiny ? (
                <div>
                <LoadBattleImages isShiny={isShiny}/>
                </div>
            ):(
                <div>
                <LoadBattleImages isShiny={isShiny}/>
                </div>
            )} 
    </div>   
    )

}

export default memo(PokemonsBattlingImg)