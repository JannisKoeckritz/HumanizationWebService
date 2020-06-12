import React,  { Component} from 'react';
import Settings from '../Settings/Settings';
import MetaView from '../MetaView/MetaView';
import ResultItem from './ResultItem';


export default class Results extends Component {

    

    state = {
        colorTheme: "4",
        annotationScheme: "kabat"
    }

    colorChangeHandler = (event) => {
        console.log("change color theme")
        this.setState({
            colorTheme: event.target.value
        })
    }

    changeAnnotation = (event) => {
        console.log("change anno theme")
        this.setState({
            annotationScheme: event.target.value
        })
    }

    render(){
    return (
        <div className="result result__box">
            <h2 className="page-title">Results</h2>
            <Settings 
                colorTheme={this.state.colorTheme} 
                changeColor={this.colorChangeHandler}
                annotationScheme={this.state.annotationScheme}
                changeAnnotation={this.changeAnnotation}
                annotation={this.props.annotation}
            />
            <MetaView meta={this.props.meta}/>

            <div className="result result__list">
                {this.props.items&&
                this.props.items.data.annotation[this.state.annotationScheme].map((entry, index) => {
                    return (<ResultItem 
                            index={index} 
                            colorTheme={this.state.colorTheme} 
                            key={index} 
                            data={entry}
                            annotationScheme={this.state.annotationScheme}
                            meta={this.props.meta} />)
                })}       
            </div>
        </div>
    );
}}