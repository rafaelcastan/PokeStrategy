import { Container } from "./styles"
import { FixedSizeGrid  as Grid  } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";



import { PokeCard } from "../pokecard/pokecard"

import { usePokemonsInfo } from "../../hooks/PokeContext";
import { SearchBar } from '../searchBar/searchBar';
import { useEffect, useState} from 'react';
import React from 'react';
import { PokeInfoModal } from "../pokeInfoModal/pokeInfoModal";
import Modal from 'react-modal'


Modal.setAppElement('html')

export function HomePage (){
    const { fullPokedex } = usePokemonsInfo();
    const [isPokeInfoModalOpen,setIsPokeInfoModalOpen] = useState(false);
    let [collumNumbers, setCollumNumbers] = useState(6);
    let [rowNumbers, setRowNumbers] = useState(187);


    if (typeof window !== 'undefined') {
      window.addEventListener("resize", updateGrid);
    }

    function rowUpdate(){
      console.log(collumNumbers)
      setRowNumbers((fullPokedex.length/collumNumbers)+1)
    }

    function updateGrid(){
        const S = window.matchMedia("(min-width:360px)").matches;
        const M = window.matchMedia("(min-width:600px)").matches;
        const L = window.matchMedia("(min-width:1280px)").matches;
        const XL = window.matchMedia("(min-width:1600px)").matches;
        if (XL) {
          setCollumNumbers(6)
         } else if (L) {
          setCollumNumbers(5)
        } else if (M) {
          setCollumNumbers(4)
        } else if (S) {
          setCollumNumbers(3)
        } else {
          setCollumNumbers(2)
        }
        
  }

    useEffect(()=>{
      if (typeof window !== 'undefined') {
        const S = window.matchMedia("(min-width:360px)").matches;
        const M = window.matchMedia("(min-width:600px)").matches;
        const L = window.matchMedia("(min-width:1280px)").matches;
        const XL = window.matchMedia("(min-width:1600px)").matches;
        if (XL) {
          setCollumNumbers(6)
         } else if (L) {
          setCollumNumbers(5)
        } else if (M) {
          setCollumNumbers(5)
        } else if (S) {
          setCollumNumbers(3)
        } else {
          setCollumNumbers(2)
        }
      }
    },[])

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
          columnWidth={105}
          height={height}
          rowCount={rowNumbers}
          rowHeight={155}
          width={width}
          onScroll={rowUpdate}
        >
          {Row}
        </Grid>
     )}
        </AutoSizer>)}
        </Container>
    )
}