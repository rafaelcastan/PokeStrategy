import { memo } from 'react';
import {Container} from './styles'

interface StatsBarProps{
    Value:number,
}

function StatsBar ({Value}:StatsBarProps){

    // let MaxValue = {hp: 250,
    //                 attack: 190,
    //                 defense:230,
    //                 SPATK:194,
    //                 SPDEF:230,
    //                 SPD:180};


    let BarFill = Math.round(Value * 100/250);

    let Color = '';

    if(BarFill===100){
        Color='cyan'
    }
    else if(BarFill>=40){
        Color='green'
    }
    else if (BarFill>=35){
        Color='yellow'
    }
    else if (BarFill>25){
        Color='orange'
    }
    else{
        Color='red'
    }


    return(
        <Container activeColor={Color}> 
            <div className="Bar">
                <div className="Progress" style={{
                    width: `${BarFill}%`,
                    transition: '2s width linear'
                }}/>
            </div>
            <span>{Value}</span>
        </Container>
    )
}

export default memo(StatsBar)