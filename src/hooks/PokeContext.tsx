import {createContext, ReactNode, useEffect, useState, useContext} from 'react';

interface PokemonsInfoProviderProps {
    children: ReactNode;
}

interface PokedexProps {
    name:string,
    id:number
}

interface Evolution{
            name:string, 
            method:{
                gender:number,
                heldItem:{name:string, url:string},
                item:{name:string, url:string},
                knownMove:{name:string,url:string},
                knownMoveType:{name:string,url:string},
                location:{name:string,url:string},
                minAffection:number,
                minBeautty:number,
                minHappines:number,
                minLevel: number,
                needsOverworldRain: boolean,
                partySpecies: {name:string, url:string},
                partyType:{name:string, url:string},
                relativePhysicalStats: number,
                timeOfDay: string,
                tradeSpecies: string,
                trigger:string
        }[]
        evolution:{
            name:string, 
            method:{
                gender:number,
                heldItem:{name:string, url:string},
                item:{name:string, url:string},
                knownMove:{name:string,url:string},
                knownMoveType:{name:string,url:string},
                location:{name:string,url:string},
                minAffection:number,
                minBeautty:number,
                minHappines:number,
                minLevel: number,
                needsOverworldRain: boolean,
                partySpecies: {name:string, url:string},
                partyType:{name:string, url:string},
                relativePhysicalStats: number,
                timeOfDay: string,
                tradeSpecies: string,
                trigger:string,
        }[]
        }[]
}

interface PokemonInfoProps{
    abilities:{name:string,isHidden:boolean}[],
    moves:{name:string,version:{levelLearned:number,learnMethod:string, version:string}[]}[],
    stats:{name:string, value:number}[],
    description:string,
}



interface PokemonEvolutionTreeProps{
    evolutionTree:{baseForm:Evolution,
    evolutions:Evolution[]}
}

const EvolutionInitialState = {
    name:'', 
            method:[{
                gender:0,
                heldItem:{name:'', url:''},
                item:{name:'', url:''},
                knownMove:{name:'',url:''},
                knownMoveType:{name:'',url:''},
                location:{name:'',url:''},
                minAffection:0,
                minBeautty:0,
                minHappines:0,
                minLevel:0,
                needsOverworldRain:false,
                partySpecies:{name:'', url:''},
                partyType:{name:'', url:''},
                relativePhysicalStats:0,
                timeOfDay:'',
                tradeSpecies:'',
                trigger:'',
        }],
        evolution:[{
            name:' ', 
            method:[{
                gender:0,
                heldItem:{name:'', url:''},
                item:{name:'', url:''},
                knownMove:{name:'',url:''},
                knownMoveType:{name:'',url:''},
                location:{name:'',url:''},
                minAffection:0,
                minBeautty:0,
                minHappines:0,
                minLevel:0,
                needsOverworldRain:false,
                partySpecies:{name:'', url:''},
                partyType:{name:'', url:''},
                relativePhysicalStats:0,
                timeOfDay:'',
                tradeSpecies:'',
                trigger:'',
        }]
        }]
}

const PokemonEvolutionTreeInitial = {
    evolutionTree:{baseForm:EvolutionInitialState,
    evolutions:[EvolutionInitialState]}
}

const PokemonEvolutionTreeError = {
    evolutionTree:{baseForm:EvolutionInitialState,
    evolutions:[EvolutionInitialState]}
}

interface PokemonsInfoContextData{
    pokedex: PokedexProps[];
    fullPokedex: string[];
    selectedPokemon:string;
    // GetMorePokemons:()=>void;
    capitalizeFirstLetter:(string)=>string;
    actualizePokedex:(string)=>void;
    SelectPokemon:(string)=>void;
    pokeTree:PokemonEvolutionTreeProps;
    pokemonInfo:PokemonInfoProps;
    loading:boolean;
}

const PokeInfoInitialState = {
    abilities:[{name:'',isHidden:false}],
            moves:[{name:'',version:[{levelLearned:0,learnMethod:'', version:''}]}],
            stats:[{name:'', value:0}],
            description:''
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
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfoProps>(PokeInfoInitialState);
    const [pokeTree, setPokeTree] = useState<PokemonEvolutionTreeProps>(PokemonEvolutionTreeInitial);
    const [loading,setLoading] = useState(false);
    var PokeDB = require('pokedex-promise-v2');
    var PokeSearch = new PokeDB();
 
    function SelectPokemon (Pokemon:string){
        setSelectedPokemon(Pokemon)
        setPokeTree(PokemonEvolutionTreeInitial)
        if(Pokemon!==''){
            setLoading(true)
            GetPokemonEvolutionTree(Pokemon)
            GetPokemonInfo(Pokemon)
        }
    }

    function GetPokemonInfo(PokemonName:string){
        let tempPokeInfo = {} as PokemonInfoProps;
        PokeSearch.getPokemonByName(PokemonName)
                  .then((response)=>{
                      tempPokeInfo.stats = response.stats.map(props=>{
                          return ({name:props.stat.name, value:props.base_stat})
                      })
                      tempPokeInfo.abilities = response.abilities.map(props=>{
                          return ({name:props.ability.name, isHidden:props.is_hidden})
                      })
                      tempPokeInfo.moves = response.moves.map(props=>{
                          return ({name:props.move.name, 
                                   version:props.version_group_details
                                   .map(props=>{
                                    return({levelLearned:props.level_learned_at, 
                                            learnMethod:props.move_learn_method.name,
                                            version: props.version_group.name})
                                   })})
                      })       
    })
    //.then(()=>{
    //     PokeSearch.getPokemonByName(PokemonName).then((response)=>{
    //         return response.id
    //     }).then((Id)=>{
    //         return PokeSearch.getPokemonSpeciesByName(Id)
    //     }).then((response)=>{
    //         console.log(response)
    //         response.flavor_text_entries.map((descriptions)=>{
    //             if(descriptions.language.name.includes('en')&&descriptions.version.name.includes('sword')){
        
    //             tempPokeInfo.description=descriptions.flavor_text

    //             }

    //             else if(descriptions.language.name.includes('en')&&descriptions.version.name.includes('lets-go-eevee')){
               
    //             tempPokeInfo.description=descriptions.flavor_text

    //             }
                
    //             else if(descriptions.language.name.includes('en')&&descriptions.version.name.includes('omega-ruby')){
                  
    //             tempPokeInfo.description=descriptions.flavor_text

    //             }
    //         })
    //     })
    //})
    .then(()=>{
        setPokemonInfo(tempPokeInfo)
    }
        )
    
    }

    function GetPokemonEvolutionTree(PokemonName:string){
        const PokeNotFind = PokemonEvolutionTreeError //error here
        PokeNotFind.evolutionTree.baseForm.name='error'
        let tempPokeInfo={evolutionTree:{baseForm:{}}} as PokemonEvolutionTreeProps;
        PokeSearch.getPokemonByName(PokemonName).then((response)=>{
            return response.id
        }).then((Id)=>{
            return PokeSearch.getPokemonSpeciesByName(Id)
        }).catch(()=>{setLoading(false), setPokeTree(PokeNotFind)})
        .then((response)=>{
            if (response===undefined){
                setPokeTree(PokeNotFind)
                setLoading(false)
            }
        fetch(response.evolution_chain.url)
        .then(response=>response.json())
        .then(response=>{
        tempPokeInfo.evolutionTree.baseForm.name = response.chain.species.name;
        tempPokeInfo.evolutionTree.baseForm.method = response.chain.evolution_details.map(props=>{
              return({
                  gender:props.gender,
                  heldItem:props.held_item,
                  item:props.item,
                  knownMove:props.known_move,
                  knownMoveType:props.known_move_type,
                  location:props.location,
                  minAffection:props.min_affection,
                  minBeautty:props.min_beauty,
                  minHappines:props.min_happiness,
                  minLevel: props.min_level,
                  needsOverworldRain: props.needs_overworld_rain,
                  partySpecies: props.party_species,
                  partyType: props.party_type,
                  relativePhysicalStats: props.relative_physical_stats,
                  timeOfDay: props.time_of_day,
                  tradeSpecies: props.trade_species,
                  trigger:props.trigger.name
              })})

         tempPokeInfo.evolutionTree.evolutions=response.chain.evolves_to.map(props=>{
             return({name:props.species.name,
              method:props.evolution_details.map(props=>{
                  return({
                      gender:props.gender,
                      heldItem:props.held_item,
                      item:props.item,
                      knownMove:props.known_move,
                      knownMoveType:props.known_move_type,
                      location:props.location,
                      minAffection:props.min_affection,
                      minBeautty:props.min_beauty,
                      minHappines:props.min_happiness,
                      minLevel: props.min_level,
                      needsOverworldRain: props.needs_overworld_rain,
                      partySpecies: props.party_species,
                      partyType: props.party_type,
                      relativePhysicalStats: props.relative_physical_stats,
                      timeOfDay: props.time_of_day,
                      tradeSpecies: props.trade_species,
                      trigger: props.trigger.name
                  })
              }),
              evolution: props.evolves_to.map(props=>{
                  return({name:props.species.name,
                      method:props.evolution_details.map(props=>{
                          return({
                              gender:props.gender,
                              heldItem:props.held_item,
                              item:props.item,
                              knownMove:props.known_move,
                              knownMoveType:props.known_move_type,
                              location:props.location,
                              minAffection:props.min_affection,
                              minBeautty:props.min_beauty,
                              minHappines:props.min_happiness,
                              minLevel: props.min_level,
                              needsOverworldRain: props.needs_overworld_rain,
                              partySpecies: props.party_species,
                              partyType: props.party_type,
                              relativePhysicalStats: props.relative_physical_stats,
                              timeOfDay: props.time_of_day,
                              tradeSpecies: props.trade_species,
                              trigger: props.trigger.name
                          })
                      })
                  })
              }),
          })
      })     
  }        
).then(()=>{
    setPokeTree(tempPokeInfo)
    setLoading(false)
})
})
 }

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

    // function GetMorePokemons (){ //Return a  Promise with limited pokemons when called
    //     PokeSearch.getPokemonsList(interval) 
    // .then(function(response) {
    //     let PokemonsMaped = [];
    //     let iden = id;
    //     response.results.map(response=>{
    //         PokemonsMaped=[...PokemonsMaped, {name:response.name, id:iden}]   
    //         iden++;  
    //     })
    //     setPokedex([...pokedex,...PokemonsMaped])
    //     setId(iden)
    //     offsetChange();
    // })
    // .catch(function(error) {
    //     console.log('There was an ERROR: ', error);
    // });
    // }

    return(
        <PokemonsInfoContext.Provider value={{pokedex, fullPokedex, capitalizeFirstLetter, 
                                              actualizePokedex, selectedPokemon, SelectPokemon, pokeTree, pokemonInfo, loading}}>
            {children}
        </PokemonsInfoContext.Provider>
    )
}

export function usePokemonsInfo(){
    const context =useContext(PokemonsInfoContext);
    return context;
}