import React, { useState } from 'react';
import {frequency_data} from '../../data/frequency';

const cellItem = (props) => {

    //console.log(props)
    const [title, setTitle] = useState("")

    const toggleTitle = () =>{
        setTitle(props.aa.toLowerCase())
    }

    const getChainType = (ct) => {
        if(props.chain_type.includes("eav")){
            return "heavy"
        }else{
            return "light"
        }

    }


    const loadFreqData = (anntotationScheme,pos, aa) => {
        const frequency = frequency_data[anntotationScheme][getChainType()][pos][aa]
        //console.log(frequency);
        
            if(frequency<=0.01){
                return {
                    backgroundColor: "red"
                }
            }
            if(frequency>0.01&&frequency<=0.9){
                return {
                    backgroundColor: "yellow"
                }
            }
            if(frequency>0.9){
                return {
                    backgroundColor: "green"
                }
            }
        }

    return(
        <td onClick={() => toggleTitle()} className="bmt-line" style={loadFreqData(props.activeAnnotationScheme,props.pos,props.seqpos)}>
            {title}
        </td>
    )
}

export default cellItem;