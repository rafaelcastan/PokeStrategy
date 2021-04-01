import InfiniteScroll from 'react-infinite-scroll-component';

import { PokeCard } from "../pokecard/pokecard"
import { Container,PokeCardsContainer } from "./styles"

import { usePokemonsInfo } from "../../hooks/PokeContext";
import { SearchBar } from '../searchBar/searchBar';


export function HomePage (){
    const { pokedex, GetMorePokemons } = usePokemonsInfo();

    return (
        <Container>
                <SearchBar></SearchBar>
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