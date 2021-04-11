import styled from 'styled-components';

interface ContainerProps{
    activeColor:'green'|'red'|'yellow'|'orange'|'cyan';
}

const colors = {
    green:'#32CD32',
    red: '#FF0000',
    yellow: '#FFFF00',
    orange: '#DAA520',
    cyan: '#00FFFF'
}

export const Container = styled.div<ContainerProps>`

    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content:space-between;
    flex-basis: 100%;

    

    .Bar{
    display: flex;
    align-items: center;
    flex-direction:row;
    flex: 1;
    height: 1.5rem;
    border-radius: 1rem;
    background: grey;
    margin: 0 1.5rem;
    position: relative;
    width:100%;
    overflow:hidden;
    flex: 0 1 auto;
    }

    span{
        font-size:1.5rem;
    }
   
.Progress {
    height: 100%;
    border-radius: 2rem;
    background: ${props=>colors[props.activeColor]};
}
`;