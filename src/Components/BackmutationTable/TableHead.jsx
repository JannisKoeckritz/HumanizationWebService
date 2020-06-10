import React, { Component } from 'react';

class TableHead extends Component{
    constructor(props){
        super(props);
        
    }

    state = {
        line: this.props.seq.split("")
    }

    render () {
        const items = []
        for(const[index, value] of this.state.line.entries()){
            items.push(
                <td className="bmt-line">
                    {value}
                </td>
            )
        }
        
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


export default TableHead;