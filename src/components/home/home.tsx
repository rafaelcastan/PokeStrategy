import { Container,PokeCardsContainer } from "./styles"
import InfiniteScroll from 'react-infinite-scroll-component';

import { PokeCard } from "../pokecard/pokecard"


import { usePokemonsInfo } from "../../hooks/PokeContext";
import { SearchBar } from '../searchBar/searchBar';
import { useEffect, useState} from 'react';
import React from 'react';
import { PokeInfoModal } from "../pokeInfoModal/pokeInfoModal";
import Modal from 'react-modal'


Modal.setAppElement('html')

export function HomePage (){
    const { pokedex, GetMorePokemons } = usePokemonsInfo();
    let mounted = false;

    const [isPokeInfoModalOpen,setIsPokeInfoModalOpen] = useState(false);

    function handleOpenPokeInfoModal() {
        setIsPokeInfoModalOpen(true);
    }

    function handleClosePokeInfoModal() {
        setIsPokeInfoModalOpen(false);
    }
        
    useEffect(()=>{
        mounted = true;
    },[])
      
    return (
        <Container>
            <PokeInfoModal
                isOpen={isPokeInfoModalOpen}
                onRequestClose={handleClosePokeInfoModal}
            />
            {!mounted && (
                <>
            <SearchBar/>
            <InfiniteScroll loader={<h4></h4>}  hasMore={true} next={GetMorePokemons} dataLength={pokedex.length}>
                <PokeCardsContainer>
                {pokedex.map((Pokes, i)=>(
                    <PokeCard key={i} PokeInfo={{name:Pokes}} ModalOpen={handleOpenPokeInfoModal} />
                ))}
                </PokeCardsContainer>
            </InfiniteScroll>
            </>)
            }
            
        </Container>
    )
}