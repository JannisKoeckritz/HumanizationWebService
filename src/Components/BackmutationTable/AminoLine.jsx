import React, { Component } from 'react';


class AminoLine extends Component{
    constructor(props){
        console.log("PROPS:",props)
        super(props);
        this.state = {
            line: props.seq.split("")
        }
        
    }

    render () {
        const items = []
        for(const[index, value] of this.state.line.entries()){
            items.push(
                <td>{value}</td>
            )
        }
        
        return(
            <tr>
                <td style={{minWidth:"45px",textAlign:"right",fontWeight:"bold",paddingRight:"15px" }}>{this.props.title}</td>
                {items}
            </tr>
        
        )

    }
}


export default AminoLine;