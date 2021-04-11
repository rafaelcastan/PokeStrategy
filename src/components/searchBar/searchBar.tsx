import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import {Img} from 'react-image';


import { Container,NavBar } from "./styles";
import { usePokemonsInfo } from "../../hooks/PokeContext";
import PokedexIcon from '../../assets/pokedex.svg';


export function SearchBar(){
    const { capitalizeFirstLetter, fullPokedex, SelectPokemon} = usePokemonsInfo();
    const [displaySugestion, setDisplaySugestion] = useState(false);
    const [search, setSearch] = useState("");
    const [mobileView, setMobileView] = useState(false);
    const [pokeId, setPokeId] = useState(1);
    const [mounted, setMounted] = useState(false);
    const [sugestionClicked, setSugestionClicked] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const wrapperRef = useRef(null);    
    const pokeGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/`;
    const pokeSprite = 'https://raw.githubusercontent.com/rafaelcastan/Sprites/main/Sprites/';


    useEffect(()=>{
        if(sugestionClicked){
            doSearch();
            setSugestionClicked(false);
        }
    },[sugestionClicked])
    

    function setSearchValue (Pokemon:string){
        setSearch(Pokemon);
        setDisplaySugestion(false);   
        setSugestionClicked(true);

    }

    function doSearch (){

        let pokemonExists = fullPokedex.filter((name)=> name.indexOf(search.toLowerCase()) > -1 )
        if((fullPokedex.indexOf(search.replace(/\s/g, '').toLowerCase())> -1)){ //Find Pokemon
            SelectPokemon(search.toLowerCase().replace(/\s+/g, ''))
            setSearch('')
            setNotFound(false)
        }
        else if(pokemonExists.length===0){ //Pokemon not found
            setNotFound(true)
        }
        else{
            SelectPokemon(pokemonExists[0].toLowerCase())//auto-complete what user wright
            setSearch('')
            setNotFound(false)
        }       
    }

    useEffect(()=>{
        if(search!=='')
        {
            setDisplaySugestion(true)
        }
        else{
            setDisplaySugestion(false)
        }
    },[search])

    useEffect(()=>{
        document.addEventListener('mouseup', handleClickOutside);
        setPokeId(Math.floor(Math.random() * 649));
        setMounted(true);
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

    function ChangeTabIndex(Position:string){
        if(Position==='down'){
            
        }
        if(Position==='up'){
            
        }
    }

    
    
    return(
      <>
            {mounted && (
            <NavBar>
            <Container onSubmit={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
                event.preventDefault()
                setDisplaySugestion(false)
                if(search){doSearch()}
            }
            }
            isNotFound={notFound}
            >
            <input type="text" 
            placeholder="Search..." 
            value={search}
            onClick={()=>{if(search!==''){
                setDisplaySugestion(true)
            }}}
            onKeyUp={event=> event.key === 'Escape' && setDisplaySugestion(false)}
            onChange={event=>{
            setSearch(event.target.value)
            }}
            />
                {displaySugestion && (
                    <div className="Sugestions">
                        {fullPokedex.filter((name)=> name.indexOf(search.replace(/\s+/g, '').toLowerCase()) > -1 ).splice(0,52) //make the suggestion box only show pokemons that match the search and in alphabetical order
                        .sort((primeiroNome, segundoNome) => primeiroNome.localeCompare(segundoNome))
                        .map((value, index) =>{
                            if(value.startsWith(search.replace(/\s+/g, '').toLowerCase().slice(0,search.length))){
                            return <div
                                    onMouseDown={ ()=>{ 
                                         setSearchValue(capitalizeFirstLetter(value))          
                                    }}
                                    onKeyPress={event=> {if(event.key === 'Enter'){
                                    setSearchValue(capitalizeFirstLetter(value))  
                                    }}}
                                    onKeyDown={event=>{if(event.key==='ArrowDown' || event.key==='Down'){
                                        
                                    }}}
                                    ref={wrapperRef}
                                    tabIndex={0}
                                    key={index}
                                    >
                                <span>{capitalizeFirstLetter(value)}</span>
                                    <Img className="SugestionsImages" 
                                    src={`${pokeSprite+value}.gif`}
                                    loader={<FontAwesomeIcon icon={faSpinner} size="sm"/>}
                                    unloader={<FontAwesomeIcon icon={faFileExcel}/>}
                                    key={Date.now()}
                                    loading="lazy"/>
                            </div>
}})}
                    </div>
                )}
                <button type="submit"><FontAwesomeIcon icon={faSearch}  size="lg"/></button>
        
    </Container>
    
            <PokedexIcon className="Icon" style={{width:'4.5rem'}}/>
            <span className="IconName" hidden={!mobileView}>StrategyDex</span>
            <img 
            hidden={!mounted}
            className="Pokemon"
            src={`${pokeGif+pokeId}.gif`}/>
    </NavBar>
    )}
    </>
    )

}


// {[`${pokeGif+(fullPokedex.indexOf(values)+1)}.gif`, 
// `${pokeSprite+(fullPokedex.indexOf(values)+9103)}.png`,
// `${pokeSprite+(fullPokedex.indexOf(values)+1)}.png`]}