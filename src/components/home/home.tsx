import { Container,PokeCardsContainer } from "./styles"
import InfiniteScroll from 'react-infinite-scroll-component';

import { PokeCard } from "../pokecard/pokecard"


import { usePokemonsInfo } from "../../hooks/PokeContext";
import { SearchBar } from '../searchBar/searchBar';
import { useEffect} from 'react';
import React from 'react';
import { PokeInfoModal } from "../pokeInfoModal/pokeInfoModal";



export function HomePage (){
    const { pokedex, GetMorePokemons } = usePokemonsInfo();
    let mounted = false;
        
    useEffect(()=>{
        mounted = true;
    },[])
      
    return (
        <Container>
            {!mounted && (
                <>
            <SearchBar/>
            <InfiniteScroll loader={<h4></h4>}  hasMore={true} next={GetMorePokemons} dataLength={pokedex.length}>
                <PokeCardsContainer>
                {pokedex.map((Pokes, i)=>(
                    <PokeCard key={i} PokeInfo={{name:Pokes}}/>
                ))}
                </PokeCardsContainer>
            </InfiniteScroll>
            </>)
            }
        </Container>
    )
}