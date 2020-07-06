import React, { Component } from 'react';

class InfoLine extends Component{
    
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    render () {
        const items = []
        this.props.frequency.map( (pair, index) => {
            let position = pair[0]
            if(Object.keys(this.props.data).includes(position)){
                const same = this.props.mutations[this.props.activeAnnotationScheme].filter( pair => pair[0]===position && pair[1]===this.props.data[position])
                let style={backgroundColor: "red", color: "white"}
                if(same.length>0){
                    style={backgroundColor: "#004777", color: "white"}
                }
                items.push(
                <td key={index} style={style} className="bmt-line">
                    {this.props.data[position]}
                </td>)
            }else{
                items.push(
                 <td key={index} className="bmt-line"></td>
                )
            }

        })
        
        return(
            <thead>
                <tr>
                <td className="bmt-line" style={{minWidth:"75px",textAlign:"left",fontWeight:"bold",padding:"1px 15px" }}>
                    {this.capitalizeFirstLetter(this.props.title)}
                </td>
                    {items}
                </tr>
            </thead>
        
        )

    }
}


export default InfoLine;