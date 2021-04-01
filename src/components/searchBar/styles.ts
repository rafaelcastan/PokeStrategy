import styled from 'styled-components';

export const NavBar = styled.div`
    width:100%;
    height:6rem;
    background:#696969;
    display:flex;
    flex-direction:row;
    align-content:center;
    justify-content:space-around;
`;

export const Container = styled.form`
    
    display:flex;
    flex-direction:row;
    border: solid;
    border-radius:1rem;
    overflow:hidden;
    max-width:58%;
    width:40rem;
    height:3rem;
    background:#A9A9A9;
    align-self:center;

    

    .Sugestions{
        max-width:60%;
        width:36rem;
        position:absolute;
        background:rgba(169, 169, 169, 0.95);
        margin-top:2.7rem;
        text-transform: capitalize;
        display:flex;
        flex-direction:column;
        align-content:center;
        z-index:0;
        border-radius:0.1rem;
        max-height:40%;
        overflow:scroll;
        overflow-x: hidden;

        div{
            display:flex;
            flex-direction:row;
        }

        .Images{
            order: 2;
            max-width:5rem;
            align-self:center;
        }
    }

    span{
        font-size: 1.5rem;
        margin-left:1.5rem;
        margin-right:0.5rem;
        align-self:center;
    }

    button{
        width:4rem;
        border: none;
        cursor: pointer;
        background:#696969;
    }

    input{
        border:none;
        font-size:1.2rem;
        width:100%;
        background:#A9A9A9;
        height:100%;
        margin-left:0.8rem;
        z-index:1;

        &:focus{
            box-shadow: 0 0 0 0;
            border: 0 none;
            outline: 0;
        }

        
    }
    /* Define an animation behavior */
@keyframes spinner {
  to { transform: rotate(360deg); }
}
/* This is the class name given by the Font Awesome component when icon contains 'spinner' */
.fa-spinner {
  /* Apply 'spinner' keyframes looping once every second (1s)  */
  animation: spinner 1s linear infinite;
}
`;