import React, { Component } from 'react';
import Cell from './Cell';


class AminoLine extends Component{
    constructor(props){
        super(props);
        
    }

    state = {
        line: this.props.frequency
    }

    render () {
        const items = []
        // console.log("AminoLine: state", this.state)
        // console.log("AminoLine: props", this.props)
        if(this.state.line){
            this.state.line.map(pair => {
                items.push(
                    <Cell
                        key={pair[0]}
                        aa={this.props.title}
                        pos={pair[0]}
                        seqpos={pair[1]}
                        />
                )
            })
    }
        
        return(
            <tr>
                <td className="bmt-line" style={{minWidth:"55px",textAlign:"left",fontWeight:"bold",padding:"1px 15px" }}>
                    {this.props.title}
                </td>
                {items}
            </tr>
        
        )

    }
}


export default AminoLine;