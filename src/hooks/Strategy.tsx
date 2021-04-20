import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {forFormat} from '@smogon/sets/'
import {Dex} from '@pkmn/dex';

interface PokemonStrategyProps {
    children: ReactNode;
}

interface PokemonStrategyData{
    verifyAvailableGen:(Pokemon:string)=>AvailableGen;
    getStrategy:({gen,format,pokemon}:getStrategyProps)=>PokemonBuild[];
    itensDescription:itemDescription[];
    naturesDescription:natureDescription[];
    getMoveDescription:(move:string)=>string;
}

interface AvailableGen {
    gen:{name:string,
    format:Array<string>}[]
}

interface getStrategyProps{
    gen:number, //accepts number from 1 to 8
    format:string,
    pokemon:string
}

const PokemonStrategyContext = createContext(
    {} as PokemonStrategyData
);

let PokemonBuildInitial = {
    name:'',
    moves:[],
    item:'',
    ability:'',
    nature:'',
    evs:{
        hp:0,
        atk:0, 
        def:0,
        spa:0,
        spd:0,
        spe:0,
    }   
}

interface PokemonBuild{
    name?:string,
    moves?:string[],
    item?:string,
    ability?:string,
    nature?:string,
    evs?:{
        hp?:number,
        atk?:number, 
        def?:number,
        spa?:number,
        spd?:number,
        spe?:number,
    }
}

let itemDescriptionInitial = {name : '', description : ''}

interface itemDescription{
    name:string,
    description:string
}

let natureDescriptionInitial = {
    name : '', 
    increasedStat:'',
    decreasedStat:''
}

interface natureDescription{
    name:string,
    increasedStat:string,
    decreasedStat:string
}

const Natures = [		
    'Adamant',	
    'Brave',	
    'Lonely',	
    'Naughty',	
    'Bold',	
    'Impish',	
    'Lax',	
    'Relaxed',	
    'Modest',	
    'Mild',	
    'Quiet',	
    'Rash',	
    'Calm',	
    'Careful',	
    'Gentle',	
    'Sassy',	
    'Hasty',	
    'Jolly',	
    'Naive',	
    'Timid',	
]



export function PokemonStrategyProvider({children}:PokemonStrategyProps){

    const [pokemonBuildCompleted, setPokemonBuildCompleted] = useState<PokemonBuild[]>([{...PokemonBuildInitial}]);
    let itemDescription : itemDescription[] = [{...itemDescriptionInitial}];
    const [itensDescription, setItensDescription] = useState<itemDescription[]>([])
    const [naturesDescription, setNaturesDescription] = useState<natureDescription[]>([])
    
    
    var PokeDB = require('pokedex-promise-v2');
    var PokeSearch = new PokeDB();

    

    function getStrategy({gen,format,pokemon}:getStrategyProps){
        let pokemonBuild : PokemonBuild[] = [{...PokemonBuildInitial}]
        useEffect(()=>{
            switch (format){
                case 'UU':{
                    if(pokemon!==undefined){
                        forFormat(`gen${gen+1}uu`).then((response)=>{
                            let names = Object.keys(response.dex[pokemon])
                            names.map((key,index)=>{
                                pokemonBuild[index]={...PokemonBuildInitial}
                                pokemonBuild[index].name = key
                                pokemonBuild[index].moves = response.dex[pokemon][key]["moves"]
                                pokemonBuild[index].item = response.dex[pokemon][key]["item"]
                                pokemonBuild[index].ability = response.dex[pokemon][key]["ability"]
                                pokemonBuild[index].nature = response.dex[pokemon][key]["nature"]
                                pokemonBuild[index].evs = response.dex[pokemon][key]["evs"]
                            })
                            return(pokemonBuild)
                        })
                        .then((response)=>{
                            setPokemonBuildCompleted(response)})
                        .catch((error)=>console.log(error))
                        
                    }
                }
                break;
                case 'OU':{
                    if(pokemon!==undefined){
                    forFormat(`gen${gen+1}ou`).then((response)=>{
                        let names = Object.keys(response.dex[pokemon])
                            names.map((key,index)=>{
                                pokemonBuild[index]={...PokemonBuildInitial}
                                pokemonBuild[index].name = key
                                pokemonBuild[index].moves = response.dex[pokemon][key]["moves"]
                                pokemonBuild[index].item = response.dex[pokemon][key]["item"]
                                pokemonBuild[index].ability = response.dex[pokemon][key]["ability"]
                                pokemonBuild[index].nature = response.dex[pokemon][key]["nature"]
                                pokemonBuild[index].evs = response.dex[pokemon][key]["evs"]
                            })
                        
                            return(pokemonBuild)
                        })
                        .then((response)=>{
                            setPokemonBuildCompleted(response)})
                    .catch((error)=>console.log(error))
                }
                }
                break;
                case 'NU':{
                    if(pokemon!==undefined){
                    forFormat(`gen${gen+1}nu`).then((response)=>{
                        let names = Object.keys(response.dex[pokemon])
                            names.map((key,index)=>{
                                pokemonBuild[index]={...PokemonBuildInitial}
                                pokemonBuild[index].name = key
                                pokemonBuild[index].moves = response.dex[pokemon][key]["moves"]
                                pokemonBuild[index].item = response.dex[pokemon][key]["item"]
                                pokemonBuild[index].ability = response.dex[pokemon][key]["ability"]
                                pokemonBuild[index].nature = response.dex[pokemon][key]["nature"]
                                pokemonBuild[index].evs = response.dex[pokemon][key]["evs"]
                            })
                            return(pokemonBuild)
                        })
                        .then((response)=>{
                            setPokemonBuildCompleted(response)})
                    .catch((error)=>console.log(error))
                }
                }
                break;
            }
        },[gen,format])

        return pokemonBuildCompleted
    }

    useEffect(()=>{
        if(pokemonBuildCompleted!==undefined){
        pokemonBuildCompleted.map((build, index)=>{
            if(pokemonBuildCompleted[index].item!=='' && pokemonBuildCompleted[index].item!==undefined){
            itemDescription[index]={...itemDescriptionInitial}
            itemDescription[index].description=Dex.items.get(build.item).desc
            itemDescription[index].name=build.item
        }
        })
        setItensDescription(itemDescription)
    }
    },[pokemonBuildCompleted])

    function getMoveDescription(Move:string){
        if(Move!==''&&Move!==undefined){
            
            if(Move.includes('Hidden Power')){
                return(Dex.moves.get('Hidden Power').desc)
            }
            else{
                return(Dex.moves.get(Move).desc)
            }

            
        }
        
    }



    useEffect(()=>{
        let natureDescription : natureDescription[] = [{...natureDescriptionInitial}];
             if(Natures!==undefined){
                Natures.map((nature, index)=>{
                    natureDescription[index]={...natureDescriptionInitial}
                    PokeSearch.getNatureByName(nature.toLowerCase().replaceAll(' ','-'))
                    .then((response)=>{
                        
                        natureDescription[index].increasedStat=response.increased_stat.name
                        natureDescription[index].decreasedStat=response.decreased_stat.name
                        natureDescription[index].name=nature
                        return(natureDescription)
                    }).then((response)=>{
                        
                        setNaturesDescription(response)
                    }).catch((error)=>console.log(error))
                })
        }
    },[])

    


    

    function verifyAvailableGen(Pokemon:string){
        let available : AvailableGen = 
        {gen:[
          {name:'R&B',format:[]},
          {name:'G&S',format:[]},
          {name:'R&S',format:[]},
          {name:'D&P',format:[]},
          {name:'B&W',format:[]},
          {name:'X&Y',format:[]},
          {name:'S&M',format:[]},
          {name:'S&S',format:[]},
        ]}
        const [availableGen,setAvailableGen] = useState<AvailableGen>()
        useEffect(()=>{ 
            available.gen.forEach((element,index) => {
                forFormat(`gen${index+1}uu`).then((response)=>{
                    if(response.dex[Pokemon]!==undefined){
                        element.format.push('UU')
                    }
                })
                forFormat(`gen${index+1}ou`).then((response)=>{
                    if(response.dex[Pokemon]!==undefined){
                        element.format.push('OU')
                    }
                })
                if (index>0){ //add (index!==4 && index>0) here to use stats
                forFormat(`gen${index+1}nu`).then((response)=>{
                    if(response.dex[Pokemon]!==undefined){
                        element.format.push('NU') 
                    } 
                }).then(()=>{
                    if(index===7){
                        setAvailableGen(available)
                    } 
                })}
            });
            
    //     forGen(1).then((response)=>{Pokemon in response.default.gen1ou.stats
    //     if (Pokemon in response.default.gen1ou.stats)
    //     {  
    //         available.gen[0].format.push('OU')
    //     }
    
    //     if (Pokemon in response.default.gen1uu.stats)
    //     {
    //       available.gen[0].format.push('UU')
    //     }
    //   })
    //     forGen(2).then((response)=>{
    //         if(Pokemon in response.default.gen2ou.stats)
    //         {    
    //             available.gen[1].format.push('OU')
    //         }
       
    //         if (Pokemon in response.default.gen2uu.stats)
    //         {
    //             available.gen[1].format.push('UU')
    //         }

    //         if (Pokemon in response.default.gen2nu.stats)
    //         {
    //           available.gen[1].format.push('NU')
    //         }
    // })
    //     forGen(3).then((response)=>{
    //     if (Pokemon in response.default.gen3ou.stats)
    //     {   
    //         available.gen[2].format.push('OU')
    //     }
    //     if (Pokemon in response.default.gen3uu.stats)
    //     {
    //         available.gen[2].format.push('UU')
    //     }
    //     if (Pokemon in response.default.gen3nu.stats)
    //     {
    //       available.gen[2].format.push('NU')
    //     }

    // })
    //     forGen(4).then((response)=>{
    //     if (Pokemon in response.default.gen4ou.stats)
    //     {   
    //         available.gen[3].format.push('OU')
    //     }
    //     if (Pokemon in response.default.gen4uu.stats)
    //     {
    //         available.gen[3].format.push('UU')
    //     }
    //     if (Pokemon in response.default.gen4nu.stats)
    //     {
    //       available.gen[3].format.push('NU')
    //     }
    // })
    //     forGen(5).then((response)=>{
    //     if (Pokemon in response.default.gen5ou.stats)
    //     {   
    //         available.gen[4].format.push('OU')
    //     }

    //     if (Pokemon in response.default.gen5uu.stats)
    //     {
    //         available.gen[4].format.push('UU')
    //     }
    // })
    //     forGen(6).then((response)=>{
    //     if (Pokemon in response.default.gen6ou.stats)
    //     {
    //         available.gen[5].format.push('OU')
    //     }

    //     if (Pokemon in response.default.gen6uu.stats)
    //     {
    //         available.gen[5].format.push('UU')
    //     }

    //     if (Pokemon in response.default.gen6nu.stats)
    //     {
    //       available.gen[5].format.push('NU')
    //     }
    // })
    //     forGen(7).then((response)=>{
    //     if (Pokemon in response.default.gen7ou.stats)
    //     {
    //         available.gen[6].format.push('OU')
    //     }

    //     if (Pokemon in response.default.gen7uu.stats)
    //     {
    //         available.gen[6].format.push('UU')
    //     }

    //     if (Pokemon in response.default.gen7nu.stats)
    //     {
    //         available.gen[6].format.push('NU')
    //     }
    // })
    //     forGen(8).then((response)=>{
    //     if (Pokemon in response.default.gen8ou.stats)
    //     {   
    //         available.gen[7].format.push('OU')
    //     }
    //     if (Pokemon in response.default.gen8uu.stats)
    //     {
    //         available.gen[7].format.push('UU')
    //     }
    //     if (Pokemon in response.default.gen8nu.stats)
    //     {
    //         available.gen[7].format.push('NU')
    //     }
    //     setAvailableGen(available)
    // })
  },[])
        return availableGen
    }
    



    return(
        <PokemonStrategyContext.Provider value={{verifyAvailableGen, getStrategy, itensDescription, 
                                                naturesDescription, getMoveDescription}}>
            {children}
        </PokemonStrategyContext.Provider>
    )

}


export function usePokemonStrategy(){
    const context =useContext(PokemonStrategyContext);
    return context;
}