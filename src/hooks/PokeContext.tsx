import {createContext, ReactNode, useEffect, useState, useContext} from 'react';

interface PokemonsInfoProviderProps {
    children: ReactNode;
}

interface PokedexProps {
    name:string,
    id:number
}

interface PokemonsInfoContextData{
    pokedex: PokedexProps[];
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


export function PokemonsInfoProvider({children}:PokemonsInfoProviderProps){
    const [pokedex, setPokedex] = useState<PokedexProps[]>([]);
    const [fullPokedex, setFullPokedex] = useState<string[]>([]);
    const [interval, setInterval] = useState({limit: 32,offset: 0})
    const [id, setId] = useState(0);
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
        PokeSearch.getPokemonsList(interval) //Return a  Promise with a range of pokemons
        .then(function(response) {
            let PokemonsMaped = [];
            let ident=id;
            response.results.map(response =>{
                PokemonsMaped=[...PokemonsMaped, {name:response.name,id:ident}] 
                ident++;
            })  
            setPokedex([...pokedex,...PokemonsMaped])
            setId(ident)
            offsetChange();
    })
    .catch(function(error) {
        console.log('There was an ERROR: ', error);
    });

    PokeSearch.getPokemonsList() //Return a  Promise with all pokemons
    .then(function(response) {
        let PokemonsMaped = [];
        response.results.map(response=>{
            PokemonsMaped=[...PokemonsMaped, (response.name)]     
        })
        setFullPokedex(PokemonsMaped)
    })
    .catch(function(error) {
        console.log('There was an ERROR: ', error);
    });
    },[])

    function GetMorePokemons (){ //Return a  Promise with limited pokemons when called
        PokeSearch.getPokemonsList(interval) 
    .then(function(response) {
        let PokemonsMaped = [];
        let iden = id;
        response.results.map(response=>{
            PokemonsMaped=[...PokemonsMaped, {name:response.name, id:iden}]   
            iden++;  
        })
        setPokedex([...pokedex,...PokemonsMaped])
        setId(iden)
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