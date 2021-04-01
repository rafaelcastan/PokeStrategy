import styled from 'styled-components';

export const Container = styled.form`
    
    display:flex;
    align-self:center;
    flex-direction:row;
    align-content:center;
    border: solid;
    border-radius:1rem;
    overflow:hidden;
    width:40rem;
    height:3rem;
    background:#A9A9A9;

    

    .Sugestions{
        width:35.5rem;
        position:absolute;
        background:#A9A9A9;
        margin-left:0.88rem;
        margin-top:3.01rem;
        text-transform: capitalize;
    }

    span{
        font-size: 1.5rem;
    }

    button{
        width:10%;
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