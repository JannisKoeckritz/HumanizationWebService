import React, { Component } from 'react';

class Comparison extends Component{
    
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    render () {
        const items = []
        this.props.comparison.map( (pair, index) => {
            let position = pair[0]
            let query = pair[1]
            let target = pair[2]
            if(this.props.title==="Human"){
                let style={backgroundColor: "white", color: "red"}
                if(query===target){
                    style={backgroundColor: "white", color: "#004777"}
                }
                items.push(
                    <td key={index} style={style} className="bmt-line">
                        {target}
                    </td>)
            }
            if(this.props.title==="Mouse"){
                let style={backgroundColor: "white", color: "red"}
                if(query===target){
                    style={backgroundColor: "white", color: "#004777"}
                }
                items.push(
                    <td key={index} style={style} className="bmt-line">
                        {query}
                    </td>)
            }
        })
        
        return(
            <thead>
                <tr>
                <td className="bmt-line" style={{minWidth:"75px",textAlign:"left",fontWeight:"bold",padding:"1px 15px" }}>
                    {this.props.title}
                </td>
                    {items}
                </tr>
            </thead>
        
        )

    }
}


export default Comparison;