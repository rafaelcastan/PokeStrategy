import {createContext, ReactNode, useState, useContext, useEffect} from 'react';

interface PokemonsImgContextData{
    pokeImg: string;
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
    const [pokeImg, setPokeImg] = useState('');
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
        const [pokeImg2, setPokeImg2] = useState('');

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
                            setPokeImg2(ImgUrl)
                        }
                        else{
                            ImgUrl=GetOfficialArtworkUrl[1].front_default
                            setPokeImg2(ImgUrl)
                        }
                        
                    })
                }
                else{
                    PokeSearch.getPokemonByName(Pokemon.name)
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
                    if(PokeNames.indexOf(Pokemon.name)> -1) //Gastly has a error, so I have to do this
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.front_default
                            setPokeImg2(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.front_female!==null){
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
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.front_default
                            setPokeImg2(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.front_female!==null){
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
                    if(PokeNames.indexOf(Pokemon.name)> -1)  //Pokes that have an error, so I have to do this
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.back_default
                            setPokeImg2(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.back_female!==null){
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
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                            if(Pokemon.gender==='male'){
                                ImgUrl=response.sprites.back_default
                                setPokeImg2(ImgUrl)
                            }
                            else if(Pokemon.gender==='female' && response.sprites.back_female!==null){
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
                    if(PokeNames.indexOf(Pokemon.name)> -1)
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg2(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.front_shiny_female!==null){
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
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.front_shiny
                            setPokeImg2(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.front_shiny_female!==null){
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
                    if(PokeNames.indexOf(Pokemon.name)> -1) 
                {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${Pokemon.name}`)
                    .then(response=>response.json())
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg2(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.back_shiny_female!==null){
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
                    PokeSearch.getPokemonByName(Pokemon.name)
                    .then(response=>{
                        if(Pokemon.gender==='male'){
                            ImgUrl=response.sprites.back_shiny
                            setPokeImg2(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.back_shiny_female!==null){
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
                                setPokeImg2(ImgUrl)
                            })
                        
                    })
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
                                setPokeImg2(ImgUrl)
                            })
                     
            
                        

                        if(Pokemon.gender==='male'){
                            
                            setPokeImg2(ImgUrl)
                        }
                        else if(Pokemon.gender==='female' && response.sprites.back_shiny_female!==null){
                            
                            setPokeImg2(ImgUrl)
                        }
                        else{
                           
                            setPokeImg2(ImgUrl)
                        }
                    })
                }
                },[])
                break;

        }
        return(pokeImg2)
        }

function getItemImg(Item:string){
    const [itemUrl, setItemUrl] = useState('');
    PokeSearch.getItemByName(Item).then((response)=>{
        setItemUrl(response.sprites.default)
    })
    return(itemUrl)
}
        
    

    return(
        <PokemonsImgContext.Provider value={{pokeImg, GetPokemonImg, getItemImg}}>
            {children}
        </PokemonsImgContext.Provider>
    )
}

export function usePokemonsImg(){
    const context = useContext(PokemonsImgContext);
    return context;
}