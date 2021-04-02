import InfiniteScroll from 'react-infinite-scroll-component';
import dynamic from 'next/dynamic';

import { PokeCard } from "../pokecard/pokecard"
import { Container,PokeCardsContainer } from "./styles"

import { usePokemonsInfo } from "../../hooks/PokeContext";
import { SearchBar } from '../searchBar/searchBar';
import PokedexIcon from '../../assets/pokedex.svg';
import { useEffect, useState } from 'react';
import React from 'react';



export function HomePage (){
    const { pokedex, GetMorePokemons } = usePokemonsInfo();
    const [pokeId, setPokeId] = useState(1);
    const [mobileView, setMobileView] = useState(false);
    const randomPoke = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/';
    let mounted = false;
        
    useEffect(()=>{
        mounted = true;
        const setNavInnerHTML = (html) => {
            const nav = document.querySelector('nav');
            nav.innerHTML = html;

          };
          if (typeof window !== 'undefined') {
            const mql = window.matchMedia('(min-width: 1280px)');
            setMobileView(mql.matches);
            setPokeId(Math.floor(Math.random() * 649))
          }
    },[])
      
    return (
        <Container>
            {!mounted && (
                <>
                <SearchBar/>
                <PokedexIcon className="Icon" />
                <div hidden={!mobileView}>
                <span className="IconName">StrategyDex</span>
                <img  
                className="Pokemon"
                src={`${randomPoke+pokeId}.gif`}/>
                </div>
            <InfiniteScroll loader={<h4></h4>}  hasMore={true} next={GetMorePokemons} dataLength={pokedex.length}>
                <PokeCardsContainer>
                {pokedex.map((Pokes, i)=>(
                    <PokeCard key={i} PokeInfo={{name:Pokes}}/>
                ))}
                </PokeCardsContainer>
            </InfiniteScroll>)
            </>)
            }
                
        </Container>
    )
}