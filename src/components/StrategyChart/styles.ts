import styled from 'styled-components';

export const BuildWrap = styled.div`
    display:flex;
    flex-direction:row;
    margin-top:2rem;
    flex-wrap:wrap;
    border:solid black;
    border-radius:3rem;
    padding:2rem;
    width:auto;

    span{
        margin-bottom:0.5rem;
    }

    .BuildName{
        margin-bottom:1rem;
    }

    .Moves{
        display:flex;
        flex-direction:column;
        width:25rem;
        align-self:left;
    }

    .BuildBody{
        display:flex;
        flex-direction:row;
    }

    .Info{
        display:flex;
        flex-direction:column;

        .ItemWrap{
            display:flex;
            align-items:center;
            margin-top:2.5rem;

            img{
                width:2.5rem;
            }
        }
        
    }

    span.tip {
            border-bottom: 1px dashed;
            text-decoration: none;
            margin-right:0.5rem;
        }
        
    span.tip:hover {
            cursor: help;
            position: relative;
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
            left: 50px;
            margin: 10px;
            position: absolute;
            bottom: 10px;
            text-decoration: none;
            width:30vw;
        }
`;