import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class Export extends Component{

    
    toggleMutation = (mutationItem) => {
        let existsAlready = []
        this.props.downloads.forEach(mutation => {
            existsAlready.push(mutation.id)
        })
        if(existsAlready.includes(mutationItem.id)){
            this.props.removeFromDownloads(mutationItem)
        }
        else{
            this.props.addToDownloads(mutationItem)
        }
    }
    
    render(){
        const ColorCheckBox = withStyles({
            root: {
            color: "#004777",
            '&$checked': {
                color: "#004777",
            },
            },
        })((props) => <Checkbox color="default" {...props} />);
        let items = []
        this.props.mutations.map(mutationItem => {
            const identifier = mutationItem['id']
            const sequence = mutationItem['seq']
            items.push(
                <FormControlLabel
                    control={
                    <ColorCheckBox
                        onChange={() => this.toggleMutation(mutationItem)}
                        name="germline-validation"
                    />
                    }
                    label={`${identifier}: ${sequence}`}
                />
            )
        })
        return(
            <div className="page-box">
                <h2 className="page-title">
                    Export
                </h2>
                <div className="page-information">
                    Please select the hybrid sequences you want to download.
                </div>
                <div className="export-items">
                    {items}
                </div>
                
                
            </div>
        )
    }
}

export default Export;