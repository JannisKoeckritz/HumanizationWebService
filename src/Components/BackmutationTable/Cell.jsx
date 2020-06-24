import React, { useState } from 'react';
import {frequency_data} from '../../data/frequency';

const cellItem = (props) => {

    //console.log(props)
    const [title, setTitle] = useState("")

    const toggleTitle = () =>{
        if(title===""){
            setTitle(props.aa.toLowerCase())
        }else{
            setTitle("")
        }
    }

    const getChainType = (ct) => {
        if(props.chain_type.includes("eav")){
            return "heavy"
        }else{
            return "light"
        }

    }


    const loadFreqData = (anntotationScheme, pos, aa) => {
        const frequency = frequency_data[anntotationScheme][getChainType()][pos][aa]
        //console.log(frequency);
        console.log(frequency, props.threshold)
            if(frequency<=props.threshold[0]/100){
                if(props.cdr==="1"){
                    return {
                        backgroundColor: "#9b0000"
                    }

                }
                else{
                    return {
                        backgroundColor: "red"
                    }
                }

            }
            if(frequency>props.threshold[0]/100&&frequency<=props.threshold[1]/100){
                if(props.cdr==="1"){
                    return {
                        backgroundColor: "#9f9f00"
                    }

                }
                else{
                    return {
                        backgroundColor: "yellow"
                    }
                }
            }
            if(frequency>props.threshold[1]/100){
                if(props.cdr==="1"){
                    return {
                        backgroundColor: "#008300"
                    }

                }
                else{
                    return {
                        backgroundColor: "green"
                    }
                }
            }
        }

    return(
        <td onClick={() => {props.handleMutation([props.pos, props.aa])}} 
            className="bmt-line" style={loadFreqData(props.activeAnnotationScheme,props.pos,props.aa)}
        >
            {title}
        </td>
    )
}

export default cellItem;