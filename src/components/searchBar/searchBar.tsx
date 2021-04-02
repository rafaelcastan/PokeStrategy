import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import {Img} from 'react-image';


import { Container,NavBar } from "./styles";
import { usePokemonsInfo } from "../../hooks/PokeContext";
import PokedexIcon from '../../assets/pokedex.svg';

export function SearchBar(){
    const { capitalizeFirstLetter, fullPokedex} = usePokemonsInfo();
    const [displaySugestion, setDisplaySugestion] = useState(false);
    const [search, setSearch] = useState("");
    const [mobileView, setMobileView] = useState(false);
    const [pokeId, setPokeId] = useState(Math.floor(Math.random() * 649));
    const [autoCompleteSearch, setAutoCompleteSearch] = useState(false);
    const wrapperRef = useRef(null);    
    const pokeGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/`;
    const pokeSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    const randomPoke = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/';
    


    function setSearchValue (Pokemon:string){
        setAutoCompleteSearch(true);
        setSearch(Pokemon);
        setDisplaySugestion(false);        
    }
    
    useEffect(()=>{
        if(autoCompleteSearch){
            setAutoCompleteSearch(false);
        }
    },[autoCompleteSearch])

    useEffect(()=>{
        document.addEventListener('mouseup', handleClickOutside);
        const setNavInnerHTML = (html) => {
            const nav = document.querySelector('nav');
            nav.innerHTML = html;

          };
          if (typeof window !== 'undefined') {
            const mql = window.matchMedia('(min-width: 1280px)');
            setMobileView(mql.matches);
          }

        return()=>{
            document.removeEventListener('mouseup', handleClickOutside);
        }
    }, []);

    const handleClickOutside = event =>{
        const {current : wrap} = wrapperRef;
        if(wrap && !wrap.contains(event.target)){
            setDisplaySugestion(false);
        }
    }
    
    return(
        <NavBar>
        <Container onSubmit={()=>console.log('foi')}>
                <input type="text" 
                placeholder="Search..." 
                value={search}
                onClick={()=>{
                    setDisplaySugestion(true)
                }}
                onKeyUp={event=> event.key === 'Escape' && setDisplaySugestion(false)}
                onChange={event=>{
                    setDisplaySugestion(true)
                    setSearch(event.target.value)
                    
                }}
                />
                    {displaySugestion && (
                        <div className="Sugestions">
                            {fullPokedex.filter((name)=> name.indexOf(search.toLowerCase()) > -1 ).splice(0,150).map((values, index) =>{
                                return <div
                                        onMouseDown={()=>setSearchValue(capitalizeFirstLetter(values))}
                                        onKeyPress={event=> event.key === 'Enter'
                                        && setSearchValue(capitalizeFirstLetter(values))}
                                        ref={wrapperRef}
                                        tabIndex={0}
                                        key={index}
                                        >
                                    <span>{capitalizeFirstLetter(values)}</span>
                                        <Img className="SugestionsImages" 
                                        src={[`${pokeGif+(fullPokedex.indexOf(values)+1)}.gif`, 
                                              `${pokeSprite+(fullPokedex.indexOf(values)+9103)}.png`,
                                              `${pokeSprite+(fullPokedex.indexOf(values)+1)}.png`]}
                                        loader={<FontAwesomeIcon icon={faSpinner} size="sm"/>}
                                        unloader={<FontAwesomeIcon icon={faFileExcel}/>}
                                        key={Date.now()}
                                        loading="lazy"/>
                                </div>
                            })}
                        </div>
                    )}
                    <button type="submit"><FontAwesomeIcon icon={faSearch}  size="lg"/></button>
            
        </Container>
        
                <PokedexIcon className="Icon" style={{width:'4.8rem'}}/>
                <span className="IconName" hidden={!mobileView}>StrategyDex</span>
                <img 
                className="Pokemon"
                src={`${randomPoke+pokeId}.gif`}/>
                
        </NavBar>
        
    )
}