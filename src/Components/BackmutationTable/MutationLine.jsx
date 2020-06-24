import React, { Component } from 'react';
import {frequency_data} from '../../data/frequency';

class MutationLine extends Component{

    getChainType = (ct) => {
        if(this.props.chain_type.includes("eav")){
            return "heavy"
        }else{
            return "light"
        }

    }


    loadFreqData = (anntotationScheme, pos, aa) => {
        const frequency = frequency_data[anntotationScheme][this.getChainType()][pos][aa]
        //console.log(frequency);
        
            if(frequency<=0.05){
                return {
                    backgroundColor: "red"
                }
            }
            if(frequency>0.05&&frequency<=0.75){
                return {
                    backgroundColor: "yellow"
                }
            }
            if(frequency>0.75){
                return {
                    backgroundColor: "green"
                }
            }
        }

    render () {
        const items = []
        this.props.mutations[this.props.activeAnnotationScheme].map((position, index) => {
            if(Object.keys(this.props.appliedMutations).includes(position[0])){
                let newAA = this.props.appliedMutations[position[0]].toLowerCase()
                items.push(
                    <td key={index} className="bmt-line bmt-mutated" style={this.loadFreqData(this.props.activeAnnotationScheme,position[0],newAA.toUpperCase())}>
                        {newAA}
                    </td>
                )
            }else{
                items.push(
                    <td key={index} className="bmt-line" style={this.loadFreqData(this.props.activeAnnotationScheme,position[0],position[1])}>
                        {position[1]}
                    </td>
                )
                
            }
        });
        
        return(
            <thead>
            <tr>
            <td className="bmt-line" style={{minWidth:"55px",textAlign:"left",fontWeight:"bold",padding:"1px 15px" }}>
                {this.props.title}
            </td>
                {items}
            </tr>
            </thead>
        
        )

    }
}


export default MutationLine;