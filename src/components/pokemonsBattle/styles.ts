import styled, {css} from 'styled-components';

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
        margin-top:-1.3rem;
        width:16rem;
}


.PokemonBattleFrontSprite{
    margin-top:8.5rem;
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