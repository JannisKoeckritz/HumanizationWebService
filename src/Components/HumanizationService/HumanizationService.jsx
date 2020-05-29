import React, { Component } from 'react'
import ProgressBar from '../Progress/Progress';
import ContentManager from '../ContentManager/ContentManager';
import ServiceNavigation from '../ServiceNavigation/ServiceNavigation';
import AlertBar from '../Alert/Alert';

class HumanizationService extends Component {

    state = {
        isfetching:false,
        sendRequest:false,
        jobID:"34",
        querySequence: " ",
        data:null,
        activeStep: 0,
        steps: ['Enter sequence', 'Analyze sequence','Choose template', 'Apply backmutation','Export'],
        finished: false,
        blastResults : null,
        selectedBlastResults : [],
        alertMessage: "",
        alertType: "success",
        showAlert: false
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

    addBlastResult = (newItem) => {
        let resultArray = [...this.state.selectedBlastResults]
        resultArray.push(newItem)
        this.setState({
            selectedBlastResults: resultArray
        })
    }

    deleteBlastResult = (chipToDelete) => () => {
        let chipData = this.state.selectedBlastResults.filter((chip) => chip.key !== chipToDelete.key);
        this.setState({
            selectedBlastResults: chipData
        })
      };

    resetBlastResults = () => {
        this.setState({
            selectedBlastResults: []
        })
    }

    resetAlert = () => {
        setTimeout(() => {
            this.setState({
                showAlert: false
            })

        },3000)
    }

    fetchData = async (seq, id) => {
        this.setState({
            isfetching:true,
            sendRequest: true
        })
        const response = await fetch("http://localhost:3000/annotate",
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
            meta: json_data.data.meta,
            alertType: "success",
            alertMessage: "Annotated successfully!",
            showAlert: true,
        })
        console.log(this.state)
        this.handleNext(this.state.activeStep)
        }

    submitBlast = async () => {
        this.setState({
            isfetching:true,
            sendBlast: true
        })
        const response = await fetch("http://localhost:3000/blast",
        {
            method:"POST",
            headers:{
            "Accept":"application/json, text/plain",
            "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "sequence":this.state.querySequence,
                "jobID":this.state.jobID})
        })
        const json_data = await response.json();
        this.setState({
            blastResults:json_data,
            isfetching: false,
            alertType: "success",
            alertMessage: "Execute Blast successfully!",
            showAlert: true
        })
        console.log(this.state.blastResults)
        this.handleNext(this.state.activeStep)
        }


    render(){



        return(
            <div className="contentContainer">
                <ProgressBar {...this.state}/>
                {this.state.isfetching?null:<AlertBar  
                    alertMessage={this.state.alertMessage}
                    alertType={this.state.alertType}
                    showAlert={this.state.showAlert}
                    resetAlert={this.resetAlert}/>}
                <ContentManager 
                    {...this.state}
                    next={() => {this.handleNext(this.state.activeStep)}}
                    back={() => {this.handleBack(this.state.activeStep)}}
                    fetchData={() => {this.fetchData(this.state.querySequence, this.state.jobID)}}
                    seqChangeHandler={(seq) => this.setSequence(seq)}
                    addBlastResult={this.addBlastResult}
                    deleteBlastResult={this.deleteBlastResult}
                    resetBlastResults={this.resetBlastResults}
                    />
                <ServiceNavigation
                    {...this.state}
                    next={() => {this.handleNext(this.state.activeStep)}}
                    back={() => {this.handleBack(this.state.activeStep)}}
                    loadExample={this.loadExample}
                    submitBlast={this.submitBlast}
                    resetBlastResults={this.resetBlastResults}
                    />
            </div>
        )

    }
}

export default HumanizationService;