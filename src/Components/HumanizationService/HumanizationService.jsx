import React, { Component } from 'react'
import ProgressBar from '../Progress/Progress';
import ContentManager from '../ContentManager/ContentManager';
import ServiceNavigation from '../ServiceNavigation/ServiceNavigation';

class HumanizationService extends Component {

    state = {
        isfetching:false,
        sendRequest:false,
        jobID:"34",
        querySequence: " ",
        data:null,
        activeStep: 0,
        steps: ['Enter sequence', 'Analyze sequence','Choose template', 'Apply backmutation','Export'],
        finished: false
    }

    handleNext = (oldStepIndex) => {
        if(oldStepIndex<=(this.state.steps.length-1)){
            this.setState({
                activeStep: oldStepIndex+1
            })
        }
    }

    handleBack = (oldStepIndex) => {
        if(oldStepIndex>=(1)){
        this.setState({
            activeStep: oldStepIndex-1
        })}
    }

    handleReset = () => {
        this.setState({activeStep:0})
    }

    recieveFinished = () =>{
        this.setState({
            finished: true
        })
    }

    setSequence = (seqString) => {
        this.setState({
            querySequence:seqString
        })
    }

    loadExample = () => {
        this.setState({
            querySequence: "EVKLVESGAGVVKPGGSLKLSCEASGFSFSRYVMSWVRQTPEKRLEWVASISSGGRTYYPGSEMGRFTISRDSARNILYLQMSSLKSEDTAMFYCAREDYYGGRYWYFDVWGAGTTVTVSSA"
        })
    }

    fetchData = async (seq, id) => {
        this.setState({
            isfetching:true,
            sendRequest: true
        })
        const response = await fetch("http://localhost:3000/",
        {
            method:"POST",
            headers:{
            "Accept":"application/json, text/plain",
            "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "sequence":seq,
                "jobID":id})
        })
        const json_data = await response.json();
        this.setState({
            data:json_data,
            isfetching: false,
            annotation:Object.keys(json_data.data.annotation),
            meta: json_data.data.meta
        })
        // console.log("[HS] isfetching, sendRequest:", this.state.isfetching, this.state.sendRequest)
        // console.log(this.state)
        this.handleNext(this.state.activeStep)
        }
    render(){



        return(
            <div className="contentContainer">
                <ProgressBar {...this.state}/>
                <ContentManager 
                    {...this.state}
                    next={() => {this.handleNext(this.state.activeStep)}}
                    back={() => {this.handleBack(this.state.activeStep)}}
                    fetchData={() => {this.fetchData(this.state.querySequence, this.state.jobID)}}
                    seqChangeHandler={(seq) => this.setSequence(seq)}
                    />
                <ServiceNavigation
                    {...this.state}
                    next={() => {this.handleNext(this.state.activeStep)}}
                    back={() => {this.handleBack(this.state.activeStep)}}
                    loadExample={this.loadExample}
                    />
            </div>
        )

    }
}

export default HumanizationService;