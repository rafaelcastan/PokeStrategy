import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import {Img} from 'react-image';


import { Container,NavBar } from "./styles";
import { usePokemonsInfo } from "../../hooks/PokeContext";

export function SearchBar(){
    const { capitalizeFirstLetter, fullPokedex} = usePokemonsInfo();
    const [display, setDisplay] = useState(false);;
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);    
    const pokeGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/`;
    const pokeSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';


    function setSearchValue (Pokemon:string){
        setSearch(Pokemon);
        setDisplay(false);
    }

    useEffect(()=>{
        document.addEventListener('mouseup', handleClickOutside);

        return()=>{
            document.removeEventListener('mouseup', handleClickOutside);
        }
    }, []);

    const handleClickOutside = event =>{
        const {current : wrap} = wrapperRef;
        if(wrap && !wrap.contains(event.target)){
            setDisplay(false);
        }
    }
    
    return(
        <NavBar>
        <Container>
                <input type="text" 
                placeholder="Search.." 
                value={search}
                onClick={()=>{
                    setDisplay(true)
                }}
                onKeyUp={event=> event.key === 'Escape' && setDisplay(false)}
                onChange={event=>{
                    setDisplay(true)
                    setSearch(event.target.value)
                    
                }}
                />
                    {display && (
                        <div className="Sugestions">
                            {fullPokedex.filter((name)=> name.indexOf(search.toLowerCase()) > -1 ).splice(0,13).map((values, index) =>{
                                return <div
                                        onMouseDown={()=>setSearchValue(capitalizeFirstLetter(values))}
                                        onKeyPress={event=> event.key === 'Enter'
                                        && setSearchValue(capitalizeFirstLetter(values))}
                                        ref={wrapperRef}
                                        tabIndex={0}
                                        key={index}
                                        >
                                    <span>{capitalizeFirstLetter(values)}</span>
                                        <Img className="Images" 
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
        </NavBar>
        
    )
}