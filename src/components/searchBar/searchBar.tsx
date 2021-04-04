import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import {Img} from 'react-image';


import { Container,NavBar } from "./styles";
import { usePokemonsInfo } from "../../hooks/PokeContext";
import PokedexIcon from '../../assets/pokedex.svg';

interface SearchBarProps{
    ModalOpen:()=>void,
}

export function SearchBar({ModalOpen}:SearchBarProps){
    const { capitalizeFirstLetter, fullPokedex} = usePokemonsInfo();
    const [displaySugestion, setDisplaySugestion] = useState(false);
    const [search, setSearch] = useState("");
    const [mobileView, setMobileView] = useState(false);
    const [pokeId, setPokeId] = useState(1);
    const [mounted, setMounted] = useState(false);
    const [sugestionClicked, setSugestionClicked] = useState(false);
    const wrapperRef = useRef(null);    
    const pokeGif = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/`;
    const pokeSprite = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    const randomPoke = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/';

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
            console.log(search)
        let teste = fullPokedex.filter((name)=> name.indexOf(search.toLowerCase()) > -1 )
        if((fullPokedex.indexOf(search.replace(/\s/g, '').toLowerCase())> -1)){
            console.log('valido')
            
        }
        else if(teste.length===0){
            console.log('Não existe')
        }
        else{
            console.log('Completar')
            console.log(teste[0])
        }

       
    }

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

    
    
    return(
      <>
            {mounted && (
            <NavBar>
            <Container onSubmit={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
                event.preventDefault()
                setDisplaySugestion(false)
                if(search){doSearch()}
            }
            }>
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
                        {fullPokedex.filter((name)=> name.indexOf(search.toLowerCase()) > -1 ).splice(0,52).map((values, index) =>{
                            return <div
                                    onMouseDown={ ()=>{ 
                                         setSearchValue(capitalizeFirstLetter(values))          
                                    }}
                                    onKeyPress={event=> {if(event.key === 'Enter'){
                                    setSearchValue(capitalizeFirstLetter(values))  
                                    }}}
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
            hidden={!mounted}
            className="Pokemon"
            src={`${randomPoke+pokeId}.gif`}/>
    </NavBar>
    )}
    </>
    )

}