import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class Export extends Component{
    state = {
        selected: {}
    }

    updateSelected = (mutationItem) => {
        
        let newSelect = this.props.downloads

        if(Object.keys(this.props.downloads).includes(Object.keys(mutationItem)[0])){
            delete newSelect[Object.keys(mutationItem)[0]]
            this.props.setDownloads(newSelect)
        }
        else{
            newSelect[Object.keys(mutationItem)[0]] = Object.values(mutationItem)[0]
            this.props.setDownloads(newSelect)
        }
    }

    clearSelected = () => {
        this.setState({
            selected: []
        })
    }

    componentDidMount(){
        this.props.setDownloads({})
    }
    
    // toggleMutation = (mutationItem) => {
    //     if(existsAlready.includes(mutationItem.id)){
    //         this.props.removeFromDownloads(mutationItem)
    //     }
    //     else{
    //         this.props.addToDownloads(mutationItem)
    //     }
    // }
    
    render(){
        console.log(this.props, this.state);
        
        const ColorCheckBox = withStyles({
            root: {
            color: "#004777",
            '&$checked': {
                color: "#004777",
            },
            },
        })((props) => <Checkbox color="default" {...props} />);
        let items = []
        Object.keys(this.props.mutations).map(mutationItem => {
            console.log()
            const identifier = mutationItem
            const sequence = this.props.mutations[mutationItem]
            items.push(
                <FormControlLabel
                    control={
                    <ColorCheckBox
                        onChange={() => {
                            let returnObj = {}
                            returnObj[mutationItem] = sequence
                            this.updateSelected(returnObj)
                        }}
                        name="germline-validation"
                        checked={Object.keys(this.props.downloads).includes(identifier)?true:false}
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