import { Container,PokeCardsContainer } from "./styles"
import { FixedSizeGrid  as Grid  } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";


import { PokeCard } from "../pokecard/pokecard"

import { usePokemonsInfo } from "../../hooks/PokeContext";
import { SearchBar } from '../searchBar/searchBar';
import { useState} from 'react';
import React from 'react';
import { PokeInfoModal } from "../pokeInfoModal/pokeInfoModal";
import Modal from 'react-modal'


Modal.setAppElement('html')

export function HomePage (){
    const { pokedex,fullPokedex, GetMorePokemons } = usePokemonsInfo();
    const [isPokeInfoModalOpen,setIsPokeInfoModalOpen] = useState(false);
    let collumNumbers = 6;

    function handleOpenPokeInfoModal() {
        setIsPokeInfoModalOpen(true);
    }

    function handleClosePokeInfoModal() {
        setIsPokeInfoModalOpen(false);
    }
     
    const Row = ({ rowIndex,columnIndex, style}) => (
      
        <div style={style}>
          
          {fullPokedex[rowIndex * collumNumbers + columnIndex] !== undefined && (
            <PokeCard  PokeInfo={{name:fullPokedex[rowIndex * collumNumbers + columnIndex]}} ModalOpen={handleOpenPokeInfoModal} />
          )}
        
        </div>
      );

    return (
        <Container>
            <PokeInfoModal
                isOpen={isPokeInfoModalOpen}
                onRequestClose={handleClosePokeInfoModal}
            />
            <SearchBar ModalOpen={handleOpenPokeInfoModal}/>

            {fullPokedex.length>1 && (
             
                 <AutoSizer>
        {({ height, width }) => (
      <Grid 
        className="List"
        columnCount={collumNumbers}
    columnWidth={310}
    height={height}
    rowCount={187}
    rowHeight={320}
    width={width}
      >
        {Row}
      </Grid>
    )}
  </AutoSizer>)}
            

         
        </Container>
    )
}