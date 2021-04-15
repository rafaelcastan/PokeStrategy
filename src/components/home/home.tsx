import { Container, StyledLoader } from "./styles"
import { FixedSizeGrid  as Grid  } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Modal from 'react-modal'


import {PokeCard} from "../pokecard/pokecard"
import { usePokemonsInfo } from "../../hooks/PokeContext";
import { SearchBar } from '../searchBar/searchBar';
import { useEffect, useState} from 'react';
import React from 'react';
import { PokeInfoModal } from "../pokeInfoModal/pokeInfoModal";



Modal.setAppElement('html')

export function HomePage (){
    const { fullPokedex, SelectPokemon, selectedPokemon, pokeTree, loading } = usePokemonsInfo();
    const [isPokeInfoModalOpen,setIsPokeInfoModalOpen] = useState(false);
    const [collumNumbers, setCollumNumbers] = useState(6);
    const [rowNumbers, setRowNumbers] = useState(187);
    const [rowSize, setRowSize] = useState(2.1);
    const [needRowUpdated, setNeedRowUpdated] = useState(true);

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", updateGrid);
    }

    function rowUpdate(){
      if(needRowUpdated){
        setRowNumbers((fullPokedex.length/collumNumbers)+1)
        updateGrid()
        setNeedRowUpdated(false);
      }
    }

    function updateGrid(){
        setNeedRowUpdated(true);
        const XL = window.matchMedia("(min-width:1600px)").matches;
        const L = window.matchMedia("(min-width:1280px)").matches;
        const M = window.matchMedia("(min-width:600px)").matches;
        const S = window.matchMedia("(min-width:360px)").matches;
       
        if (XL) {
          setCollumNumbers(6)
          setRowSize(2.3)
         } else if (L) {
          setCollumNumbers(5)
          setRowSize(1.8)
        } else if (M) {
          setCollumNumbers(4)
          setRowSize(1.5)
        } else if (S) {
          setCollumNumbers(3)
          setRowSize(1)
        } else {
          setCollumNumbers(2)
          setRowSize(1)
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
          setRowSize(2.8)
         } else if (L) {
          setCollumNumbers(5)
          setRowSize(2.1)
        } else if (M) {
          setCollumNumbers(4)
          setRowSize(2.1)
        } else if (S) {
          setCollumNumbers(3)
          setRowSize(1)
        } else {
          setCollumNumbers(3)
          setRowSize(1)
        }
      }
    },[])

    function handleOpenPokeInfoModal() {
        setIsPokeInfoModalOpen(true);
    }

    function handleClosePokeInfoModal() {
        setIsPokeInfoModalOpen(false);
        SelectPokemon('');
    }


    useEffect(()=>{
      if(selectedPokemon!=='' && !isPokeInfoModalOpen){
        handleOpenPokeInfoModal()
      }      
    },[pokeTree])
     
    const Row = ({ rowIndex,columnIndex, style}) => (
      <div style={style}>
        {fullPokedex[rowIndex * collumNumbers + columnIndex] !== undefined && (
          <PokeCard  PokeInfo={{name:fullPokedex[rowIndex * collumNumbers + columnIndex]}} Size={rowSize}/>
        )}
      </div>
    );


    return (
      <StyledLoader
      active={loading && !isPokeInfoModalOpen}
      spinner
      text='Loading your content...'
      >
        <Container>
          {isPokeInfoModalOpen &&(
            <PokeInfoModal
            isOpen={isPokeInfoModalOpen}
            onRequestClose={handleClosePokeInfoModal}
        />
          )}
          
            <SearchBar/>

          {fullPokedex.length>1 && (
            <AutoSizer>
              {({ height, width }) => (
              <Grid 
                className="List"
                columnCount={collumNumbers}
                columnWidth={screen.availWidth/collumNumbers-collumNumbers*2}
                height={height}
                rowCount={rowNumbers}
                rowHeight={148*rowSize}
                width={width}
                onScroll={rowUpdate}
              >
                {Row}
              </Grid>
          )}
              </AutoSizer>)}
        </Container>
        </StyledLoader>
      )
}