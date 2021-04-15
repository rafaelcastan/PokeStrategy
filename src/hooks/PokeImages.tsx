import {createContext, ReactNode, useState, useContext, useEffect} from 'react';

interface PokemonsImgContextData{
    GetPokemonImg:({Pokemon}:PokeCardProps)=>string;
    getItemImg:(Item:string)=>string;
}

interface PokemonsImgProviderProps {
    children: ReactNode;
}

interface PokeCardProps{
    Pokemon:{
        name:string,
        type:string,
        gender?:string
    }
}



const PokemonsImgContext = createContext<PokemonsImgContextData>(
    {} as PokemonsImgContextData
);


export function PokemonsImgProvider({children}:PokemonsImgProviderProps){
    var PokeDB = require('pokedex-promise-v2');
    var PokeSearch = new PokeDB();
    var GetOfficialArtworkUrl = [];
    let ImgUrl = '';
    const PokeNames = ['gastly', 'vespiquen', 'raikou', 'coalossal', 'impidimp', 'drakloak', 'zacian-hero', 'quilava', 
                       'volbeat', 'solrock', 'feebas', 'deoxys-normal', 'audino', 'scolipede', 'cinccino', 'gothita', 'galvantula', 'klang',
                       'mienfoo', 'volcarona', 'scatterbug', 'spewpa', 'tyrunt', 'popplio', 'yungoos'];
    const pokeGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/`;
    const pokeSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    const pokeSpriteAnimated = 'https://raw.githubusercontent.com/rafaelcastan/Sprites/main/Sprites/';

    function GetPokemonImg({Pokemon}:PokeCardProps){
        const [pokeImg, setPokeImg] = useState('');

        switch(Pokemon.type){

            case 'officialArtwork':
                useEffect(()=>{
                    if(PokeNames.indexOf(Pokemon.name)> -1) //Pokemons that have an error, so I have to do this
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        GetOfficialArtworkUrl=Object.values(response.sprites.other)
                        if(GetOfficialArtworkUrl[1].front_default!==null){
                            ImgUrl=GetOfficialArtworkUrl[1].front_default
                            setPokeImg(ImgUrl)
                        }
                        else{
                            ImgUrl=GetOfficialArtworkUrl[1].front_default
                            setPokeImg(ImgUrl)
                        }
                        
                    }).catch((error)=>console.log(error))
                }
                else{
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                        GetOfficialArtworkUrl=Object.values(response.sprites.other)
                        if(GetOfficialArtworkUrl[1].front_default!==null){
                            ImgUrl=GetOfficialArtworkUrl[1].front_default
                            setPokeImg(ImgUrl)
                        }
                        else{
                            ImgUrl=response.sprites.front_default
                            setPokeImg(ImgUrl)
                        }
                    }).catch((error)=>console.log(error))
                }
                },[])
            break;

            case 'frontSprite':
                useEffect(()=>{
                    if(PokeNames.indexOf(Pokemon.name)> -1) //Gastly has a error, so I have to do this
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.front_default
                            setPokeImg(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.front_female!==null){
                            ImgUrl=response.sprites.front_female
                            setPokeImg(ImgUrl)
                        }
                        else{
                            ImgUrl=response.sprites.front_default
                            setPokeImg(ImgUrl)
                        }
                        
                    }).catch((error)=>console.log(error))
                }
                else{
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.front_default
                            setPokeImg(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.front_female!==null){
                            ImgUrl=response.sprites.front_female
                            setPokeImg(ImgUrl)
                        }
                        else {
                            ImgUrl=response.sprites.front_default
                            setPokeImg(ImgUrl)
                        }
                    }).catch((error)=>console.log(error))
                }
                },[])
            break;

            case 'backSprite':
                useEffect(()=>{
                    if(PokeNames.indexOf(Pokemon.name)> -1)  //Pokes that have an error, so I have to do this
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.back_default
                            setPokeImg(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.back_female!==null){
                            ImgUrl=response.sprites.back_female
                            setPokeImg(ImgUrl)
                        }
                        else {
                            ImgUrl=response.sprites.back_default
                            setPokeImg(ImgUrl)
                        }       
                        
                    }).catch((error)=>console.log(error))
                }
                else{
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                            if(Pokemon.gender==='male'){
                                ImgUrl=response.sprites.back_default
                                setPokeImg(ImgUrl)
                            }
                            else if(Pokemon.gender==='female' && response.sprites.back_female!==null){
                                ImgUrl=response.sprites.back_female
                                setPokeImg(ImgUrl)
                            }
                            else {
                                ImgUrl=response.sprites.back_default
                                setPokeImg(ImgUrl)
                            }                            
                        }
                    ).catch((error)=>console.log(error))
                }
                },[])
            break;
            case 'frontShiny':
                useEffect(()=>{
                    if(PokeNames.indexOf(Pokemon.name)> -1)
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.front_shiny_female!==null){
                            ImgUrl=response.sprites.front_shiny_female
                            setPokeImg(ImgUrl)
                        }
                        else{
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg(ImgUrl)
                        }
                        
                    }).catch((error)=>console.log(error))
                }
                else{
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.front_shiny_female!==null){
                            ImgUrl=response.sprites.front_shiny_female
                            setPokeImg(ImgUrl)
                        }
                        else {
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg(ImgUrl)
                        }
                    }).catch((error)=>console.log(error))
                }
                },[])
            break;
            case 'backShiny':
                useEffect(()=>{
                    if(PokeNames.indexOf(Pokemon.name)> -1) 
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.back_shiny_female!==null){
                            ImgUrl=response.sprites.back_shiny_female
                            setPokeImg(ImgUrl)
                        }
                        else{
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg(ImgUrl)
                        }
                        
                    }).catch((error)=>console.log(error))
                }
                else{
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.back_shiny_female!==null){
                            ImgUrl=response.sprites.back_shiny_female
                            setPokeImg(ImgUrl)
                        }
                        else {
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg(ImgUrl)
                        }
                    }).catch((error)=>console.log(error))
                }
                },[])
            break;
            case 'animated':
                useEffect(()=>{
                    if(PokeNames.indexOf(Pokemon.name)> -1) 
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        let pokeId = Number(response.id);
                        let ImgUrl = `${pokeGif+pokeId}.gif`
                            fetch(`${pokeGif+pokeId}.gif`).then(response=>{
                                if(!response.ok){
                                    ImgUrl=`${pokeSprite+(pokeId)}.png`
                                }
                                setPokeImg(ImgUrl)
                            })
                        
                    }).catch((error)=>console.log(error))
                }
                else{
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                        let pokeId = Number(response.id);
                        let ImgUrl = `${pokeGif+pokeId}.gif`
                        fetch(`${pokeGif+pokeId}.gif`).then(response=>{
                                if(!response.ok){
                                    ImgUrl=`${pokeSpriteAnimated+(Pokemon.name)}.gif`
                                }
                                setPokeImg(ImgUrl)
                            })
                     
            
                        

                        if(Pokemon.gender==='male'){
                            
                            setPokeImg(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.back_shiny_female!==null){
                            
                            setPokeImg(ImgUrl)
                        }
                        else{
                           
                            setPokeImg(ImgUrl)
                        }
                    }).catch((error)=>console.log(error))
                }
                },[])
                break;

        }
        return(pokeImg)
        }

function getItemImg(Item:string){
    const [itemUrl, setItemUrl] = useState('');
    PokeSearch.getItemByName(Item).then((response)=>{
        setItemUrl(response.sprites.default)
    }).catch((error)=>console.log(error))
    return(itemUrl)
}
        
    

    return(
        <PokemonsImgContext.Provider value={{ GetPokemonImg, getItemImg}}>
            {children}
        </PokemonsImgContext.Provider>
    )
}

export function usePokemonsImg(){
    const context = useContext(PokemonsImgContext);
    return context;
}