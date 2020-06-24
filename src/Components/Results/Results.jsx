import React,  { Component} from 'react';
import Settings from '../Settings/Settings';
import MetaView from '../MetaView/MetaView';
import ResultItem from './ResultItem';


export default class Results extends Component {

    constructor(props){
        super(props);
    }

    state = {
        colorTheme: "4",
    }

    colorChangeHandler = (event) => {
        console.log("change color theme")
        this.setState({
            colorTheme: event.target.value
        })
    }

    render(){
        console.log("RESULTS",this.props)
    return (
        <div className="result result__box">
            <h2 className="page-title">Results</h2>
            <Settings 
                colorTheme={this.state.colorTheme} 
                changeColor={this.colorChangeHandler}
                activeAnnotationScheme={this.props.activeAnnotationScheme}
                changeAnnotation={this.props.changeAnnotation}
                annotation={this.props.annotation}
                threshold={this.props.threshold}
                setThreshold={this.props.setThreshold}
            />
            <MetaView meta={this.props.meta} activeAnnotationScheme={this.props.activeAnnotationScheme}/>

            <div className="result result__list">
                {this.props.items&&
                this.props.items.data.annotation[this.props.activeAnnotationScheme].map((entry, index) => {
                    return (<ResultItem 
                            index={index} 
                            colorTheme={this.state.colorTheme} 
                            key={index} 
                            data={entry}
                            activeAnnotationScheme={this.props.activeAnnotationScheme}
                            meta={this.props.meta}
                            threshold={this.props.threshold}
                            />)
                })}       
            </div>
        </div>
    );
}}