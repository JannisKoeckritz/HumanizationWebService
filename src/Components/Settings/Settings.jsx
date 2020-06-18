import React, {Component, Fragment} from 'react';
import Slider from "@material-ui/core/Slider";

export default class Settings extends Component {

    constructor(props){
        super(props);
    }

    state = {
        options: [  {"name": "Scheme 1", "value":"1"} ,
                    {"name": "Zappo", "value":"2"},
                    {"name": "Scheme 3", "value":"3"},
                    {"name": "Taylor", "value":"4"}],
        threshold: [5,10]
    }

    render(){
        const options = this.state.options
        
        const handleChange = (event, newValue) => {
        this.setState({threshold: newValue})
        };

        const thresholdText = (value) => {
            return `${value}%`
        }

        const updateThreshold = (value, index) => {
            let updated = []
            const newPair = [this.props.threshold[0],this.props.threshold[1]]
            console.log(value, index, newPair)
            if(index===0){
                newPair[0] = value;
                newPair[1] = this.props.threshold[1]
            }
            if(index===1){
                newPair[1] = value;
                newPair[0] = this.props.threshold[0];
            }
            // if(newPair[0]>this.props.threshold[1]){
            //     updated = [newPair[1],newPair[0]]
            //     console.log(value, index, newPair)
                
            // }else{
            //     updated =  newPair
            //     console.log(value, index, newPair)
            // }
            console.log(updated)
            return updated
        }


        let settingsComponent = (
                <div className="settings">
                    <div className="settings-item">
                        <span className="settings-item-label">
                            Annotation Scheme:
                        </span>
                        <span className="settings-item-selector">
                            <select 
                                className="settings-item-selector-select" 
                                onChange={(event) => {this.props.changeAnnotation(event)}} 
                                value={this.props.activeAnnotationScheme}>
                                {
                                    this.props.annotation.map((item,ind) => {
                                    return <option key={ind} value={item.index} >{item}</option>
                                    })
                                }
                            </select>
                        </span>
                    </div>
                    <div className="settings-item">
                        <span className="settings-item-label">
                            Color Theme:
                        </span>
                        <span className="settings-item-selector">
                            <select 
                                className="settings-item-selector-select" 
                                onChange={(event) => {this.props.changeColor(event)}} 
                                value={this.props.colorTheme}>
                                {
                                options.map(item => {
                                return <option key={item.value} value={item.value} >{item.name}</option>
                                })
                                }}
                            </select>
                        </span>
                    </div>
                    <div className="settings-item settings-item__less-margin">
                        <span className="settings-item-label">
                            Threshold:
                        </span>
                        <span className="settings-item-input">
                            <input
                            style={{display:"inline"}}
                                type="text" 
                                value={this.props.threshold[0]}
                                onChange={event => {
                                    const { value } = event.target;
                                    this.props.setThreshold(event, updateThreshold((value, 0)))}}
                                />
                            <input
                            style={{display:"inline"}}
                                type="text" 
                                value={this.props.threshold[1]}
                                onChange={event => {
                                    const { value } = event.target;
                                    this.props.setThreshold(event, updateThreshold((value, 1)))}}
                            />
                            </span>
                    </div>
                    <div className="settings-item settings-item-slider">
                        <Slider
                            value={this.props.threshold}
                            onChange={this.props.setThreshold}
                            valueLabelDisplay="off"
                            aria-labelledby="range-slider"
                            getAriaValueText={thresholdText}
                        />
                    </div>
                </div>







            )


                                
        

        return(
            <Fragment>
                {settingsComponent}
            </Fragment>
            
            )
    }
}