import React, { useState } from 'react';
import valid_amino_acids from '../../data/iupac';
import frequency_heavy from '../../data/frequency_heavy_table.json';
import frequency_light from '../../data/frequency_light_table.json';

const cellItem = (props) => {

    //console.log(props)
    const [title, setTitle] = useState("")

    const toggleTitle = () =>{
        setTitle(props.aa.toLowerCase())
    }

    const loadFreqData = (pos, aa) => {
        if(frequency_heavy[pos]){
            const frequency = frequency_heavy[pos][aa]
            if(frequency<=0.05){
                return {
                    backgroundColor: "red"
                }
            }
            if(frequency>0.05&&frequency<=0.9){
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
        else {
            return {
                backgroundColor: "red"
            }
        }
    }
    return(
        <td onClick={() => toggleTitle()} className="bmt-line" style={loadFreqData(props.pos,props.aa)}>
            {title}
        </td>
    )
}

export default cellItem;