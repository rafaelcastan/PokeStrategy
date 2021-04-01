import { useEffect, useState } from "react";
import { usePokemonsImg } from "../../hooks/PokeImages";
import { Container } from "./styles";

interface PokeCardProps{
    PokeInfo:{
        name:string,
    }
}

export function PokeCard ({PokeInfo}:PokeCardProps){
    const { GetPokemonImg } = usePokemonsImg();
   
    /*
    const [pokeImg, setPokeImg] = useState('');
    var PokeDB = require('pokedex-promise-v2');
    var PokeSearch = new PokeDB();
    var GetOfficialArtworkUrl = [];
    let ImgUrl = '';

    

    useEffect(()=>{
        if(PokeInfo.name==='gastly') //Gastly has a error, so I have to do this
        {
            fetch('https://pokeapi.co/api/v2/pokemon/gastly')
            .then(response=>response.json())
            .then(response=>{
                GetOfficialArtworkUrl=Object.values(response.sprites.other)
                ImgUrl=GetOfficialArtworkUrl[1].front_default
                setPokeImg(ImgUrl);
            })
        }
        else{
    PokeSearch.getPokemonByName(PokeInfo.name)
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
        
    })}},[])
    */
    
    

    return(
    <Container>
        <img src={GetPokemonImg({PokeInfo:{name:PokeInfo.name, type:'officialArtwork'}})} alt={`${PokeInfo.name} sprite `}/>
        <span>{PokeInfo.name}</span>
    </Container>
    )
};
