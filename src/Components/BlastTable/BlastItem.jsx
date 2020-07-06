import React, {useState} from 'react';
import Icon from '@material-ui/core/Icon';


const blastItem = (props) => {



    let btn = null;
    if(!props.templateIDs.includes(props.name)){
        btn=(
                <Icon   style={{ color: "#004777", fontSize:35, cursor:"pointer" }}
                        onClick={() => props.addTemplate(props.name)}>
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
        <li className="blast-table-item">
            <div className="blast-table-row blast-table-index">{props.index}</div>
            <div className="blast-table-row blast-table-germline">{props.germline}</div>
            <div className="blast-table-row blast-table-seq">{props.name}</div>
            <div className="blast-table-row blast-table-percent blast-table-percent-bold">{props.identity}</div>
            <div className="blast-table-row blast-table-evalue">{props.evalue}</div>
            <div className="blast-table-row blast-table-bitscore blast-table-bitscore-bold">{props.bitscore}</div>
            <div className="blast-table-row blast-table-add">
                {btn?btn:<Icon style={{ color: "#004777", fontSize:40 }}>check</Icon>}
            </div>
        </li>
    )
}

export default blastItem;