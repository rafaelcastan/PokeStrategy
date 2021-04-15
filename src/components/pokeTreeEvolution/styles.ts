import styled from 'styled-components';

export const EvolutionTree = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin-bottom:2rem;
    margin-top:2rem;
    flex-wrap:wrap;
    width:auto;
    align-self:flex-start;

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

        :hover{
            cursor:pointer; 
        }
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
            flex:100%;
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