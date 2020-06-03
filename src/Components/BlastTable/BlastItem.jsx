import React, {useState} from 'react';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';


const blastItem = (props) => {

    let btn = null;
    if(!props.templateIDs.includes(props.seq_id)){
        btn=(
                <Icon   style={{ color: green[500], fontSize:35, cursor:"pointer" }}
                        onClick={() => props.addTemplate(props.seq_id)}>
                    add_circle
                </Icon>
        )

    }
    return(
        <li className="blast-table-item">
            <div className="blast-table-row blast-table-index">{props.index}</div>
            <div className="blast-table-row blast-table-seq">{props.seq_id}</div>
            <div className="blast-table-row blast-table-percent blast-table-percent-bold">{props.percent}</div>
            <div className="blast-table-row blast-table-evalue">{props.evalue}</div>
            <div className="blast-table-row blast-table-bitscore blast-table-bitscore-bold">{props.bitscore}</div>
            <div className="blast-table-row blast-table-add">
                {btn?btn:<Icon style={{ color: green[500], fontSize:35 }}>check</Icon>}
            </div>
        </li>
    )
}

export default blastItem;