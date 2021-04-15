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
            margin-top:2rem;

            img{
                width:2.5rem;
            }
        }
        
    }
`;