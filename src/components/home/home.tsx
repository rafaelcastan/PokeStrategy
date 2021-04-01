import InfiniteScroll from 'react-infinite-scroll-component';

import { PokeCard } from "../pokecard/pokecard"
import { Container,PokeCardsContainer } from "./styles"

import { usePokemonsInfo } from "../../hooks/PokeContext";
import { SearchBar } from '../searchBar/searchBar';
import PokedexIcon from '../../assets/pokedex.svg';


export function HomePage (){
    const { pokedex, GetMorePokemons } = usePokemonsInfo();
    let mobileView = (false);

    const setNavInnerHTML = (html) => {
        const nav = document.querySelector('nav');
        nav.innerHTML = html;
      };
      if (typeof window !== 'undefined') {
        const mql = window.matchMedia('(min-width: 1528px)');
        mobileView = mql.matches;
      }
      
    return (
        <Container>
                <SearchBar/>
                <PokedexIcon className="Teste" />
                {mobileView && (<span className="Teste2">StrategyDex</span>)}
                
            <InfiniteScroll loader={<h4>Loading...</h4>}  hasMore={true} next={GetMorePokemons} dataLength={pokedex.length} >
                <PokeCardsContainer>
                {pokedex.map((Pokes, i)=>(
                    <PokeCard key={i} PokeInfo={{name:Pokes}}/>
                ))}
                </PokeCardsContainer>
            </InfiniteScroll>
        </Container>
    )
}