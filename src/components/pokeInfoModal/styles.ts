import styled, {css} from 'styled-components';

export const CloseModalButton = styled.button`
    z-index:1;
    position:absolute;
    background-color: Transparent;
    background-repeat:no-repeat;
    top:0;
    right:0;
    border: none;
    outline: none;
    cursor:pointer;
    overflow: hidden;    
`;


export const PokemonCard = styled.div`
    display:flex;
    flex-direction:row;
    background:lightblue;
    height:auto;
    width:auto;
    border-radius:2rem;
    margin-top:3rem;
    margin-bottom:2rem;
    flex-wrap:wrap;
    position: relative;

    

    .Artwork{
    width:20%;
    min-width:15rem;
    align-self:center;
    margin-top:2rem;
    margin-left:1rem;
    }
    .AnimatedPokemon {
        width:8rem;
        max-width:160px;
        max-height:160px;
        position: absolute;
        right: 1rem;
        bottom:1rem;
        align-self:flex-end;
    }
`;

export const PokemonNameAndAbilities = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:1rem;
    margin-top:4.5rem;

    .PokemonName{
        font-size:4rem;
        text-transform:capitalize;
    }

    .PokemonAbilities{
        margin-top:1rem;
        font-size:2rem;
        text-transform:capitalize;
    }

    .PokemonAbilitiesDetails{
        font-size:1.3rem;
        text-transform:capitalize;
    }
`;

export const StatsBars = styled.div`
    display:flex;
    flex-direction:column;
    margin-left:1rem;
    margin-right:1rem;
    margin-top:2rem;
    align-self: flex-start;
    width:30rem;
    margin-bottom:2rem;

    @media (max-width:660px){
        margin-bottom:9rem;
    }

    span{
        font-size:1.5rem;
    }
`;

interface ContainerProps{
    isTwoPokemonsRenderized:boolean,
    isPokemonBack:boolean
}

export const PokemonsBattling = styled.div<ContainerProps>`
    display:flex;
    flex-direction:row;
    margin-top:0;
    margin-left: ${(props)=>!props.isTwoPokemonsRenderized ? '-9rem' : '-2rem'};
    width:16rem;
    position:relative;
    margin-right:1rem;



    ${({ isPokemonBack })=>!isPokemonBack && css`
        margin-left: ${(props)=>!props.isTwoPokemonsRenderized ? '12.5rem' : '18rem'};
        width:fit-content;
    `}
        
    .PokemonBattleBackSprite{
        margin-top:-1rem;
        width:16rem;
}


.PokemonBattleFrontSprite{
    margin-top:8rem;
    width:12rem;
}

.imgDescriptionBackSprite {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0rem;
  left:7.2rem;
  z-index: 1;
  text-transform:capitalize;
  /* transition effect. not necessary */
  transition: opacity .2s, visibility .2s;
  font-size:1.5rem;
  color:white;
}

.imgDescriptionFrontSprite {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 8rem;
  left:4.5rem;
  z-index: 1;
  text-transform:capitalize;
  /* transition effect. not necessary */
  transition: opacity .2s, visibility .2s;
  font-size:1.43rem;
  color:black;
}

.BattlePokemonsBackSprite{
    display:flex;
    flex-direction:row;
}

.imgBattleWrap {
  position: relative;
}
`;

export const ModalBody = styled.div`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    width:auto;
    height:auto;
    justify-content:space-evenly;
    position:relative;
`;

export const EvolutionTree = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-bottom:2rem;
    margin-top:2rem;
    flex-wrap:wrap;
    width:auto;

    @media (min-width:512px){
        flex-wrap:nowrap;
       }

      
    

    .EvolutionPokemonWrap{
        display:flex;
        flex-direction:column;
        align-items:center;
        
        span{
            font-size:1.5rem;
            margin-top:0.5rem;
            margin-right:0.5rem;
            margin-left:0.5rem;
            margin-bottom:0.5rem;
        }
        
    }
    

    .EvolutionPokemonImg{
        width:7rem;
        margin-top:1rem;
        margin-left:1rem;
        margin-right:1rem;
    }

    .BaseForm{
        margin-bottom:2rem;
        display:flex;
        flex-wrap:wrap;
        align-items:center;
        border-radius:1rem;
        border:solid black;
        margin-left:50%;
        justify-content:space-evenly;
        margin-left:17vw;

        @media (min-width:512px){
            margin-left:0;
       }


    }

    .EvolutionWrap{
        margin-bottom:2rem;
        display:flex;
        flex-wrap:wrap;
        align-items:center;
        border-radius:1rem;
        border:solid black;
        margin-left:1rem;
        justify-content:space-evenly;
    }

    .MultEvolutionsMethods{
        display:flex;
        flex-direction:column;
        margin-top:0.5rem;
        margin-left:0.5rem;
    }

    .EvolutionMethods{
        display:flex;
        flex-direction:column;
        align-items:center;
        
        span{
            text-align:center;
            font-size:1.5rem;
            width:50%
        }
        span.tip {
            border-bottom: 1px dashed;
            text-decoration: none
        }
        span.tip:hover {
            cursor: help;
            position: relative
        }
        span.tip span {
            display: none
        }
        span.tip:hover span {
            border: #c0c0c0 1px dotted;
            padding: 5px 20px 5px 5px;
            display: block;
            z-index: 100;
            background: #f0f0f0 no-repeat 100% 5%;
            left: 0px;
            margin: 10px;
            position: absolute;
            top: 10px;
            text-decoration: none;
            width:45vw;
        }

        .ItemImg{
            display:flex;
            flex-direction:row;
            align-items:center;
            img {
            width:2rem;
           }  
        }
    }
    
`;

export const Container = styled.div`

display:flex;
flex-direction:column;
justify-content:space-around;
position:relative;


.BattleBackground{
    position:absolute;
    z-index:0;
    background-repeat: no-repeat;
    background-size: contain;
    width:46rem;
}

.react-switch{
    margin-top:1rem;
    height:1rem;
}

.BattleImage{
    position:relative;
}

`;