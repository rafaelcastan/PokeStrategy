import {createContext, ReactNode, useEffect, useState, useContext} from 'react';
import {Dex} from '@pkmn/dex';

interface PokemonsInfoContextData{
    pokedex: PokedexProps[];
    fullPokedex: string[];
    selectedPokemon:string;
    pokeTree:PokemonEvolutionTreeProps;
    pokemonInfo:PokemonInfoProps;
    loading:boolean;
    abilitiesDescription:abilitiesDescription[];
    typesRelations:typeRelationsProps[];
    selectedGen:number;
    movesLearnSets:LearnSetsProps[];
    // GetMorePokemons:()=>void;
    changeSelectedGen:(gen:number)=>void;
    capitalizeFirstLetter:(string)=>string;
    actualizePokedex:(string)=>void;
    SelectPokemon:(string)=>void;
    moveType:({move,infoType}:moveType)=>string;

}

interface abilitiesDescription{
    name:string,
    description:string
}

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
                tradeSpecies: {name:string,url:string},
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
                tradeSpecies: {name:string,url:string},
                trigger:string,
        }[]
        }[]
}

interface PokemonInfoProps{
    abilities:{name:string,isHidden:boolean}[],
    // moves:{name:string,version:{levelLearned:number,learnMethod:string, version:string}[]}[],
    stats:{name:string, value:number}[],
    description:string,
    types:{name:string,url:string}[]
}



interface PokemonEvolutionTreeProps{
    evolutionTree:{baseForm:Evolution,
    evolutions:Evolution[]}
}

interface typeRelationsProps{
    doubleDamageFrom: string[],
    doubleDamageTo: string[],
    halfDamageFrom: string[],
    halfDamageTo: string[],
    noDamageFrom: string[],
    noDamageTo: string[],
}

interface LearnSetsProps {
    name:string,
    learnMethods:string[]
}

interface moveType{
    move:string,
    infoType:'type' | 'category' | 'basePower' | 'accuracy'
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
                tradeSpecies:{name:'',url:''},
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
                tradeSpecies:{name:'',url:''},
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


const PokeInfoInitialState = {
    abilities:[{name:'',isHidden:false}],
            // moves:[{name:'',version:[{levelLearned:0,learnMethod:'', version:''}]}],
            stats:[{name:'', value:0}],
            description:'',
            types:[{name:'', url:''}]
}



let typeRelationsInitial = {
    doubleDamageFrom: [''],
    doubleDamageTo: [''],
    halfDamageFrom: [''],
    halfDamageTo: [''],
    noDamageFrom: [''],
    noDamageTo: [''],
}


let LearnSetsInitialState ={
    name:'',
    learnMethods:['']
}

let abilityDescInitial = {name : '', description : ''}


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
    const [typesRelations, setTypesRelations] = useState<typeRelationsProps[]>([{...typeRelationsInitial}]);
    const [abilitiesDescription, setAbilitiesDescription] = useState<abilitiesDescription[]>([])
    let abilityDescription : abilitiesDescription[] = [{...abilityDescInitial}];
    const [selectedGen, setSelectedGen] = useState(0);
    const [movesLearnSets, setMovesLeanSets] = useState<LearnSetsProps[]>([LearnSetsInitialState]);
    
    var PokeDB = require('pokedex-promise-v2');
    var PokeSearch = new PokeDB();

 
    function SelectPokemon (Pokemon:string){
        setSelectedPokemon(Pokemon)
        setPokeTree(PokemonEvolutionTreeInitial)
   
        if(Pokemon!==''){
            setLoading(true)
            GetPokemonInfo(Pokemon)
            GetPokemonEvolutionTree(Pokemon)
          
        }
    }

    function changeSelectedGen(Gen:number){
        setSelectedGen(Gen)
    }

    useEffect(()=>{
        if(selectedPokemon!==''){
        let TempLearnSets : LearnSetsProps[] = [{...LearnSetsInitialState}];
        Dex.forGen(selectedGen+1).learnsets.get(selectedPokemon).then((response)=>{
            Object.entries(response.learnset).map((move, index)=>{
                TempLearnSets[index] = {...LearnSetsInitialState}
                TempLearnSets[index].name=move[0]
                TempLearnSets[index].learnMethods=move[1]
            })
            return TempLearnSets
        }).then((LearnSet)=>setMovesLeanSets(LearnSet))
        .catch((error)=>console.log(error))
    }
    },[selectedGen,selectedPokemon])
        
    

    function moveType ({move,infoType}:moveType){
        if(move!=='' && move!==undefined){
        if(infoType==='type'){
            return(Dex.moves.get(move).type)
        }
        
        if (infoType==='category'){
            return(Dex.moves.get(move).category)
        }

        if (infoType==='basePower'){
            return(Dex.moves.get(move).basePower.toString())
        }
        
        if (infoType==='accuracy'){
            return(Dex.moves.get(move).accuracy.toString())
        } 
    }
    }

    
    useEffect(()=>{
        if(pokemonInfo.abilities[0].name!==''){
        pokemonInfo.abilities.map((abilities,index)=>{
            abilityDescription[index] = {...abilityDescInitial}
            PokeSearch.getAbilityByName(abilities.name).then((response)=>{
                response.flavor_text_entries.map((ability)=>{
                    if(ability.language.name.includes('en')){
                        abilityDescription[index].description=ability.flavor_text
                    }
                })
                abilityDescription[index].name=capitalizeFirstLetter(abilities.name)
                return(abilityDescription)
            }).then((response)=>{
                setAbilitiesDescription(response)
            })
        })
    }
    },[pokemonInfo.abilities])
        
        useEffect(()=>{
            let TempTypes : typeRelationsProps[] = [{...typeRelationsInitial}]
            if(selectedPokemon!=='' && pokemonInfo.types[0].name!==""){
            pokemonInfo.types.map((type,index1)=>{
            PokeSearch.getTypeByName(type.name)
            .then((response)=>{
                TempTypes[index1]={
                    doubleDamageFrom: [''],
                    doubleDamageTo: [''],
                    halfDamageFrom: [''],
                    halfDamageTo: [''],
                    noDamageFrom: [''],
                    noDamageTo: [''],
                }

                response.damage_relations.double_damage_from.map((type, index)=>{
          
                    TempTypes[index1].doubleDamageFrom[index]=type.name;
                })

                response.damage_relations.double_damage_to.map((type, index)=>{
                  
                    TempTypes[index1].doubleDamageTo[index]=type.name;
                })

                response.damage_relations.half_damage_from.map((type, index)=>{
          
                    TempTypes[index1].halfDamageFrom[index]=type.name;
                })

                response.damage_relations.half_damage_to.map((type, index)=>{
                
                    TempTypes[index1].halfDamageTo[index]=type.name;
                })

                response.damage_relations.no_damage_from.map((type, index)=>{
             
                    TempTypes[index1].noDamageFrom[index]=type.name;
                })

                response.damage_relations.no_damage_to.map((type, index)=>{
           
                    TempTypes[index1].noDamageTo[index]=type.name;
                })
                return(TempTypes)
            }).then((response)=>{setTypesRelations(response)})
              .catch((error)=>console.log(error))
              
            })}},[pokemonInfo]) 


    
        

    function GetPokemonInfo(PokemonName:string){
        let tempPokeInfo = {} as PokemonInfoProps;
        PokeSearch.getPokemonByName(PokemonName)
                  .then((response)=>{
                    tempPokeInfo.types =  response.types.map(props=>{
                        return ({name:props.type.name, 
                                 url:props.type.url
                                 })})   
                      tempPokeInfo.stats = response.stats.map(props=>{
                          return ({name:props.stat.name, value:props.base_stat})
                      })
                      tempPokeInfo.abilities = response.abilities.map(props=>{
                          return ({name:props.ability.name, isHidden:props.is_hidden})
                      })
                    //   tempPokeInfo.moves = response.moves.map(props=>{ ////Moves map, not being used
                    //       return ({name:props.move.name, 
                    //                version:props.version_group_details
                    //                .map(props=>{
                    //                 return({levelLearned:props.level_learned_at, 
                    //                         learnMethod:props.move_learn_method.name,
                    //                         version: props.version_group.name})
                    //                })})
                    //   })
                      return (tempPokeInfo)
                         
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
    .then((response)=>{
        setPokemonInfo(response)
    }).catch((error)=>console.log(error))
    }

    function GetPokemonEvolutionTree(PokemonName:string){
        const PokeNotFind = PokemonEvolutionTreeError //error here
        PokeNotFind.evolutionTree.baseForm.name='error'
        let tempPokeInfo={evolutionTree:{baseForm:{}}} as PokemonEvolutionTreeProps;
        PokeSearch.getPokemonByName(PokemonName).then((response)=>{
            return response.id
        }).then((Id)=>{
            return PokeSearch.getPokemonSpeciesByName(Id)
        })
        .then((response)=>{
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
}).catch(()=>{setLoading(false), setPokeTree(PokeNotFind)})
}).catch(()=>{setLoading(false), setPokeTree(PokeNotFind)})
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
                                              actualizePokedex, selectedPokemon, SelectPokemon, 
                                              pokeTree, pokemonInfo, loading, typesRelations, abilitiesDescription,
                                              changeSelectedGen, selectedGen, movesLearnSets, moveType}}>
            {children}
        </PokemonsInfoContext.Provider>
    )
}

export function usePokemonsInfo(){
    const context =useContext(PokemonsInfoContext);
    return context;
}