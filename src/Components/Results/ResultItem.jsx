import React from 'react';

const colormap = {
    "A": "#f44336",
    "C": "#e91e63",
    "D": "#9c27b0",
    "E": "#673ab7",
    "F": "#3f51b5",
    "G": "#2196f3",
    "H": "#03a9f4",
    "I": "#00bcd4",
    "K": "#009688",
    "L": "#4caf50",
    "M": "#8bc34a",
    "N": "#cddc39",
    "P": "#ffeb3b",
    "Q": "#ffc107",
    "R": "#ff9800",
    "S": "#ff5722",
    "T": "#795548", 
    "V": "#607d8b",
    "W": "#A4DD00",
    "Y": "#68CCCA"}


const resultItem = (props) => {
    return(
        <div className="result__item">
           <div className="result__item__aa" style={{backgroundColor:colormap[props.data.amino_acid]}}>
               <b>{props.data.amino_acid}</b>
           </div>
           <div className="result__item__pos">
                {props.data.pos}
           </div>
           <div className="result__item__freq">
                {props.data.frequency}
           </div>
        </div>);





}

export default resultItem;