import React, { useState } from 'react';
import {frequency_data} from '../../data/frequency';
import {common_as_data} from '../../data/frequency';

const cellItem = (props) => {

    const getChainType = () => {
        if(props.chain_type.includes("eav")){
            return "heavy"
        }else{
            return "light"
        }

    }


    const loadFreqData = (anntotationScheme, pos, aa) => {
        const frequency = frequency_data[anntotationScheme][getChainType()][pos][aa]
        //console.log(frequency);
            if(frequency<=props.threshold[0]/100){
                if(props.cdr==="1"){
                    return {
                        backgroundColor: "#9b0000",
                        color: 'white'
                    }

                }
                else{
                    return {
                        backgroundColor: "red",
                        color: 'white'
                    }
                }

            }
            if(frequency>props.threshold[0]/100&&frequency<=props.threshold[1]/100){
                if(props.cdr==="1"){
                    return {
                        backgroundColor: "#ACACAC",
                        color: 'black'
                    }

                }
                else{
                    return {
                        backgroundColor: "#F2F2F2",
                        color: 'black'
                    }
                }
            }
            if(frequency>props.threshold[1]/100){
                if(props.cdr==="1"){
                    return {
                        backgroundColor: "#2a3746",
                        color: 'white'
                    }

                }
                else{
                    return {
                        backgroundColor: "#004777",
                        color: 'white'
                    }
                }
            }
        }
    
    return(
        <td onClick={() => {props.handleMutation([props.pos, props.aa])}} 
            className="bmt-line" style={loadFreqData(props.activeAnnotationScheme,props.pos,props.aa)}
        >
            <span className="bmt-line-title">
            { common_as_data[props.activeAnnotationScheme][getChainType()][props.pos]===props.aa?<span>*</span>:null }
            </span>
        </td>
    )
}

export default cellItem;