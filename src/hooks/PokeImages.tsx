import {createContext, ReactNode, useState, useContext, useEffect} from 'react';

interface PokemonsImgContextData{
    pokeImg: string;
    GetPokemonImg:({PokeInfo}:PokeCardProps)=>string;
}

interface PokemonsImgProviderProps {
    children: ReactNode;
}

interface PokeCardProps{
    PokeInfo:{
        name:string,
        type:string,
        gender?:string
    }
}



const PokemonsImgContext = createContext<PokemonsImgContextData>(
    {} as PokemonsImgContextData
);


export function PokemonsImgProvider({children}:PokemonsImgProviderProps){
    const [pokeImg, setPokeImg] = useState('');
    var PokeDB = require('pokedex-promise-v2');
    var PokeSearch = new PokeDB();
    var GetOfficialArtworkUrl = [];
    let ImgUrl = '';
    const PokeNames = ['gastly', 'vespiquen', 'raikou', 'coalossal', 'impidimp', 'drakloak', 'zacian-hero', 'quilava', 
                       'volbeat', 'solrock', 'feebas', 'deoxys-normal', 'audino', 'scolipede', 'cinccino', 'gothita', 'galvantula', 'klang',
                       'mienfoo', 'volcarona', 'scatterbug', 'spewpa', 'tyrunt', 'popplio', 'yungoos']

    function GetPokemonImg({PokeInfo}:PokeCardProps){
        const [pokeImg2, setPokeImg2] = useState('');

        switch(PokeInfo.type){

            case 'officialArtwork':
                useEffect(()=>{
                    if(PokeNames.indexOf(PokeInfo.name)> -1) //Pokemons that have an error, so I have to do this
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${PokeInfo.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        GetOfficialArtworkUrl=Object.values(response.sprites.other)
                        if(GetOfficialArtworkUrl[1].front_default!==null){
                            ImgUrl=GetOfficialArtworkUrl[1].front_default
                            setPokeImg2(ImgUrl)
                        }
                        else{
                            ImgUrl=GetOfficialArtworkUrl[1].front_default
                            setPokeImg2(ImgUrl)
                        }
                        
                    })
                }
                else{
                    PokeSearch.getPokemonByName(PokeInfo.name)
                    .then(response=>{
                        GetOfficialArtworkUrl=Object.values(response.sprites.other)
                        if(GetOfficialArtworkUrl[1].front_default!==null){
                            ImgUrl=GetOfficialArtworkUrl[1].front_default
                            setPokeImg2(ImgUrl)
                        }
                        else{
                            ImgUrl=response.sprites.front_default
                            setPokeImg2(ImgUrl)
                        }
                    })
                }
                },[])
            break;

            case 'frontSprite':
                useEffect(()=>{
                    if(PokeNames.indexOf(PokeInfo.name)> -1) //Gastly has a error, so I have to do this
                {
                    fetch('https://pokeapi.co/api/v2/pokemon/gastly')
                    .then(response=>response.json())
                    .then(response=>{
                        if(PokeInfo.gender==='male'){
                            ImgUrl=response.sprites.front_default
                            setPokeImg2(ImgUrl)
                        }
                        else if(PokeInfo.gender==='female' && response.sprites.front_female!==null){
                            ImgUrl=response.sprites.front_female
                            setPokeImg2(ImgUrl)
                        }
                        else{
                            ImgUrl=response.sprites.front_default
                            setPokeImg2(ImgUrl)
                        }
                        
                    })
                }
                else{
                    PokeSearch.getPokemonByName(PokeInfo.name)
                    .then(response=>{
                        if(PokeInfo.gender==='male'){
                            ImgUrl=response.sprites.front_default
                            setPokeImg2(ImgUrl)
                        }
                        else if(PokeInfo.gender==='female' && response.sprites.front_female!==null){
                            ImgUrl=response.sprites.front_female
                            setPokeImg2(ImgUrl)
                        }
                        else {
                            ImgUrl=response.sprites.front_default
                            setPokeImg2(ImgUrl)
                        }
                    })
                }
                },[])
            break;

            case 'backSprite':
                useEffect(()=>{
                    if(PokeNames.indexOf(PokeInfo.name)> -1)  //Pokes that have an error, so I have to do this
                {
                    fetch('https://pokeapi.co/api/v2/pokemon/gastly')
                    .then(response=>response.json())
                    .then(response=>{
                        if(PokeInfo.gender==='male'){
                            ImgUrl=response.sprites.back_default
                            setPokeImg2(ImgUrl)
                        }
                        else if(PokeInfo.gender==='female' && response.sprites.back_female!==null){
                            ImgUrl=response.sprites.back_female
                            setPokeImg2(ImgUrl)
                        }
                        else {
                            ImgUrl=response.sprites.back_default
                            setPokeImg2(ImgUrl)
                        }       
                        
                    })
                }
                else{
                    PokeSearch.getPokemonByName(PokeInfo.name)
                    .then(response=>{
                            if(PokeInfo.gender==='male'){
                                ImgUrl=response.sprites.back_default
                                setPokeImg2(ImgUrl)
                            }
                            else if(PokeInfo.gender==='female' && response.sprites.back_female!==null){
                                ImgUrl=response.sprites.back_female
                                setPokeImg2(ImgUrl)
                            }
                            else {
                                ImgUrl=response.sprites.back_default
                                setPokeImg2(ImgUrl)
                            }                            
                        }
                    )
                }
                },[])
            break;
            case 'frontShiny':
                useEffect(()=>{
                    if(PokeNames.indexOf(PokeInfo.name)> -1)
                {
                    fetch('https://pokeapi.co/api/v2/pokemon/gastly')
                    .then(response=>response.json())
                    .then(response=>{
                        if(PokeInfo.gender==='male'){
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg2(ImgUrl)
                        }
                        else if(PokeInfo.gender==='female' && response.sprites.front_shiny_female!==null){
                            ImgUrl=response.sprites.front_shiny_female
                            setPokeImg2(ImgUrl)
                        }
                        else{
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg2(ImgUrl)
                        }
                        
                    })
                }
                else{
                    PokeSearch.getPokemonByName(PokeInfo.name)
                    .then(response=>{
                        if(PokeInfo.gender==='male'){
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg2(ImgUrl)
                        }
                        else if(PokeInfo.gender==='female' && response.sprites.front_shiny_female!==null){
                            ImgUrl=response.sprites.front_shiny_female
                            setPokeImg2(ImgUrl)
                        }
                        else {
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg2(ImgUrl)
                        }
                    })
                }
                },[])
            break;
            case 'backShiny':
                useEffect(()=>{
                    if(PokeNames.indexOf(PokeInfo.name)> -1) 
                {
                    fetch('https://pokeapi.co/api/v2/pokemon/gastly')
                    .then(response=>response.json())
                    .then(response=>{
                        if(PokeInfo.gender==='male'){
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg2(ImgUrl)
                        }
                        else if(PokeInfo.gender==='female' && response.sprites.back_shiny_female!==null){
                            ImgUrl=response.sprites.back_shiny_female
                            setPokeImg2(ImgUrl)
                        }
                        else{
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg2(ImgUrl)
                        }
                        
                    })
                }
                else{
                    PokeSearch.getPokemonByName(PokeInfo.name)
                    .then(response=>{
                        if(PokeInfo.gender==='male'){
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg2(ImgUrl)
                        }
                        else if(PokeInfo.gender==='female' && response.sprites.back_shiny_female!==null){
                            ImgUrl=response.sprites.back_shiny_female
                            setPokeImg2(ImgUrl)
                        }
                        else {
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg2(ImgUrl)
                        }
                    })
                }
                },[])
            break;
        }
        return(pokeImg2)
        }
        
    

    return(
        <PokemonsImgContext.Provider value={{pokeImg, GetPokemonImg}}>
            {children}
        </PokemonsImgContext.Provider>
    )
}

export function usePokemonsImg(){
    const context = useContext(PokemonsImgContext);

    return context;
}