import { useCallback, useState } from 'react'

import { usePokemonsInfo } from '../../hooks/PokeContext';
import {usePokemonStrategy} from '../../hooks/Strategy';
import {StrategyChart} from '../StrategyChart/strategychart'
import {Container, StyledButtons} from './styles'


interface AvailableGen {
    gen:{name:string,
    format:string[]}[]
}



export function Builds (){
    const {selectedPokemon, capitalizeFirstLetter, changeSelectedGen} =usePokemonsInfo();
    const {verifyAvailableGen} = usePokemonStrategy()
    const smogonUrl = "https://www.smogon.com/dex/ss/pokemon/"
    

    const Build = useCallback(()=>{
    const [firstTimeRendered, setFirstTimeRendered] = useState(true)
    const [firstTimeRenderedStrategy, setFirstTimeRenderedStrategy] = useState(true)
    const [selectedGen, setSelectedGen] = useState(0);
    const [selectedFormat, setselectedFormat] = useState('UU');
    const [activeGen, setActiveGen] = useState(0);
    const [activeFormat, setActiveFormat] = useState('UU');

    let selectFormat = 'UU'
    let mostNewGen = 0;
    let counter=0;
    let availableGen : AvailableGen = {gen:[
        {name:'R&B',format:[]},
        {name:'G&S',format:[]},
        {name:'R&S',format:[]},
        {name:'D&P',format:[]},
        {name:'B&W',format:[]},
        {name:'X&Y',format:[]},
        {name:'S&M',format:[]},
        {name:'S&S',format:[]},
      ]}
    availableGen =  verifyAvailableGen(capitalizeFirstLetter(selectedPokemon))
    return(
        <Container>
        {availableGen!==undefined ? (
            <div className="BuildOptions">
            <span className="BuildTitle">Builds: </span>
            <p></p>
            <div className="GenerationButtons">
            <span>Generations: </span>
            {availableGen.gen.map((version,index)=>{
                if(version.format.length>0){
                    mostNewGen=index
                    return(
                    <>
                    <StyledButtons isActive={index===activeGen} key={index} 
                    onClick={()=>{setSelectedGen(index);
                                  changeSelectedGen(index);
                                  setFirstTimeRendered(false); 
                                  setActiveGen(index); 
                                  setFirstTimeRenderedStrategy(true)}}
                    >{version.name}</StyledButtons>
                    </>
                    )
                }
                else{counter++}
            })}
            </div>
            { (firstTimeRendered && selectedGen!== mostNewGen) && (<>{setSelectedGen(mostNewGen)} {changeSelectedGen(mostNewGen)} {setActiveGen(mostNewGen)}</>)}
            
            <p></p>
            <div className="FormatButtons">
            <span>Format: </span>
            {availableGen.gen[selectedGen].format.length>0 && (

            availableGen.gen[selectedGen].format.map((format,index)=>{
                selectFormat=format;
                return(
                    <>
                       <StyledButtons  isActive={format===activeFormat} onClick={()=>{setselectedFormat(format); setFirstTimeRenderedStrategy(false); setActiveFormat(format)}}>{format}</StyledButtons> 
                    </>
                    
                )
            })
            )}
            {(firstTimeRenderedStrategy && selectFormat!==selectedFormat) && (<>{setselectedFormat(selectFormat)} {setActiveFormat(selectFormat)} </>)}
            {counter>7 ? (<span style={{color:'orange'}}>No build provided</span>)
            :
            (
            <StrategyChart selectedGen={selectedGen} format={selectedFormat}/>
            )
            }
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
            <span>See more Builds and Info at:  
            <a href={`${smogonUrl}${selectedPokemon}`} 
                style={{marginLeft:"0.5rem"}}
               target="_blank">Smogon.com</a>
            </span>
            
            </div>
            </div>
            
        )
        :
        (
            <div></div>
        )}
        </Container>
    )
    },[selectedPokemon])



    return(
       <Build/>
    )
}