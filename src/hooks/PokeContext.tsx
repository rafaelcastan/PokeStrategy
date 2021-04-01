import {createContext, ReactNode, useEffect, useState, useContext} from 'react';

interface PokemonsInfoProviderProps {
    children: ReactNode;
}



interface PokemonsInfoContextData{
    pokedex: string[];
    fullPokedex: string[];
    GetMorePokemons:()=>void;
    capitalizeFirstLetter:(string)=>string;
    actualizePokedex:(string)=>void;
}

const PokemonsInfoContext = createContext<PokemonsInfoContextData>(
    {} as PokemonsInfoContextData
    );

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    function addPokemon (string) {
        return string;
    }

export function PokemonsInfoProvider({children}:PokemonsInfoProviderProps){
    const [pokedex, setPokedex] = useState<string[]>([]);
    const [fullPokedex, setFullPokedex] = useState<string[]>([]);
    const [interval, setInterval] = useState({limit: 32,offset: 0})
    var PokeDB = require('pokedex-promise-v2');
    var PokeSearch = new PokeDB();
 

    function offsetChange(){
        let offsetChange = interval;
        offsetChange.offset+=32;
        setInterval(offsetChange)
    }

    function actualizePokedex(newPokes){
        setPokedex(newPokes)
    }

    useEffect(()=>{
        PokeSearch.getPokemonsList(interval) //Return a  Promise
        .then(function(response) {
            let PokemonsMaped = [];
            response.results.map(response=>{
                PokemonsMaped=[...PokemonsMaped, addPokemon(response.name)]     
            })
            setPokedex([...pokedex,...PokemonsMaped])
    })
    .catch(function(error) {
        console.log('There was an ERROR: ', error);
    });

    PokeSearch.getPokemonsList() //Return a  Promise
    .then(function(response) {
        let PokemonsMaped = [];
        response.results.map(response=>{
            PokemonsMaped=[...PokemonsMaped, addPokemon(response.name)]     
        })
        setFullPokedex(PokemonsMaped)
        
        offsetChange();
    })
    .catch(function(error) {
        console.log('There was an ERROR: ', error);
    });
    },[])

    function GetMorePokemons (){
        PokeSearch.getPokemonsList(interval) //Return a  Promise
    .then(function(response) {
        let PokemonsMaped = [];
        response.results.map(response=>{
            PokemonsMaped=[...PokemonsMaped, addPokemon(response.name)]     
        })
        setPokedex([...pokedex,...PokemonsMaped])
        offsetChange();
    })
    .catch(function(error) {
        console.log('There was an ERROR: ', error);
    });
    }

    return(
        <PokemonsInfoContext.Provider value={{pokedex, fullPokedex, GetMorePokemons, capitalizeFirstLetter, actualizePokedex}}>
            {children}
        </PokemonsInfoContext.Provider>
    )
}

export function usePokemonsInfo(){
    const context =useContext(PokemonsInfoContext);

    return context;
}