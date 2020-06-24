import React, {useState} from 'react';
import Icon from '@material-ui/core/Icon';


const blastItem = (props) => {



    let btn = null;
    if(!props.templateIDs.includes(props.seq_id)){
        btn=(
                <Icon   style={{ color: "#004777", fontSize:35, cursor:"pointer" }}
                        onClick={() => props.addTemplate(props.seq_id)}>
                    add_circle
                </Icon>
        )
        if(props.templateIDs.length >= 1){
            btn=(
                <Icon style={{ color: "#004777", fontSize:30 }}>clear</Icon>
                )
        }

    }

    const setBackground = (percent) => {
        if(percent>=90.0){
            return {
                backgroundColor: "#ADF7B6",
                padding: "2rem"
            }
        }
        if(percent>=60 && percent<90.0){
            return {
                backgroundColor: "#FFC857",
                padding: "2rem"
            }

        }
        else{
            return {
                backgroundColor: "#EE6352",
                padding: "2rem"
            }
        }

    }
    
    return(
        <li className="blast-table-item" style={setBackground(props.percent)}>
            <div className="blast-table-row blast-table-index">{props.index}</div>
            <div className="blast-table-row blast-table-index">0</div>
            {/* <div className="blast-table-row blast-table-seq">{props.seq_id}</div> */}
            <div className="blast-table-row blast-table-percent blast-table-percent-bold">{props.percent}</div>
            <div className="blast-table-row blast-table-evalue">{props.evalue}</div>
            <div className="blast-table-row blast-table-bitscore blast-table-bitscore-bold">{props.bitscore}</div>
            <div className="blast-table-row blast-table-add">
                {btn?btn:<Icon style={{ color: "#004777", fontSize:40 }}>check</Icon>}
            </div>
        </li>
    )
}

export default blastItem;