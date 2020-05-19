import React, {Component} from 'react';
import Slider from "@material-ui/core/Slider";

export default class Settings extends Component {

    state = {
        options: [  {"name": "Scheme 1", "value":"1"} ,
                    {"name": "Scheme 2", "value":"2"},
                    {"name": "Scheme 3", "value":"3"},
                    {"name": "Scheme 4", "value":"4"}],
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

        const setThreshold = (value, index) => {
            const newPair = [0,0]
            console.log(newPair)
            if(index===0){
                newPair[0] = value;
                newPair[1] = this.state.threshold[1]
            }
            if(index===1){
                newPair[0] = this.state.threshold[0];
                newPair[1] = value
            }
            if(newPair[0]>newPair[1]){
                this.setState({
                    threshold: [newPair[1],newPair[0]]
                })
            }else{
                this.setState({
                    threshold: newPair
                })
            }
        }





        return(
            <div className="settings">
                <div className="settings__item settings__annotationScheme">
                    <span className="settings__item__title">
                        Annotation Scheme:
                    </span>
                    <select className="settings__item__select" onChange={(event) => {this.props.changeAnnotation(event)}} value={this.props.annotationScheme}>

                        {
                            this.props.annotation.map((item,ind) => {
                               return <option key={ind} value={item.index} >{item}</option>
                            })
                        }
                    </select>
                </div>
                <div className="settings__item slider-item">
                    <span className="settings__item__title settings__item__label">
                        Threshold:   
                        
                        <input
                            className="settings__item__input"
                            type="text" 
                            value={this.state.threshold[0]}
                            onChange={event => {
                                const { value } = event.target;
                                setThreshold(value, 0)}}
                            />% - 
                        
                        <input
                            className="settings__item__input"
                            type="text" 
                            value={this.state.threshold[1]}
                            onChange={event => {
                                const { value } = event.target;
                                this.setThreshold(value, 1)}}
                        />%
                    </span>
                    <Slider
                        className="settings__item"
                        value={this.state.threshold}
                        onChange={handleChange}
                        valueLabelDisplay="off"
                        aria-labelledby="range-slider"
                        getAriaValueText={thresholdText}
                    />

                </div>
                <div className="settings__item settings__colorScheme">
                    <span className="settings__item__title">
                        Color Scheme:
                    </span>
                    <select className="settings__item__select" onChange={(event) => {this.props.changeColor(event)}} value={this.props.colorTheme}>
                        {
                            options.map(item => {
                               return <option key={item.value} value={item.value} >{item.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }
}