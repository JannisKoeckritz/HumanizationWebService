import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';


const metaData = (props) => {
    return (
        <div className="btm-meta">
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <div className="bmt-head">ID: {props.title}</div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="bmt-details">
                        Query: {props.query}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                <div className="bmt-details">
                        Target: {props.target}
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails>
                <div className="bmt-details">
                        Modified: {props.modified}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
}

export default metaData;