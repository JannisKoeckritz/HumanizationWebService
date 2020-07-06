import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';


const metaData = (props) => {
    return (
        <div className="btm-meta">
            <ExpansionPanel boxshadow={0}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <span className="bmt-head">
                        <span className="bmt-head-item">
                            Template: {props.title} Table {props.table}
                        </span>
                        <span className="bmt-head-item">
                            <InfoIcon/>
                        </span>
                    </span>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >CDR-grafted: </span>{props.modified}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >Query:</span> {props.query}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >Target:</span> {props.target}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >Chain:</span> {props.templateMeta["chain_type"]}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >Species:</span> {props.templateMeta["species"]}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >Germline:</span> {props.templateMeta["germline"]==="0"?"no":props.templateMeta["germline"]}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >Iso-Type:</span> {props.templateMeta["iso_type"]}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >V-Gene:</span> {props.templateMeta["v_gene"]}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >J-Gene:</span> {props.templateMeta["j_gene"]}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >Disease:</span> {props.templateMeta["disease"]}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        <span style={{fontWeight:"bold"}} >Origin:</span> {props.templateMeta["origin"]}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default metaData;