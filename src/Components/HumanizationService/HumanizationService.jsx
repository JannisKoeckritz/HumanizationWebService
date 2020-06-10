import React, { Component } from 'react'
import ProgressBar from '../Progress/Progress';
import ContentManager from '../ContentManager/ContentManager';
import ServiceNavigation from '../ServiceNavigation/ServiceNavigation';
import AlertBar from '../Alert/Alert';

class HumanizationService extends Component {

    state = {
        activeStep: 0,
        steps: ['Enter sequence', 'Analyze sequence','Choose template', 'Backmutation','Export'],
        isFetching:false,
        querySequence: " ",
        jobID:"454",

        // Alerts
        alertMessage: "",
        alertType: "success",
        showAlert: false,

        // Analyze
        querySequenceData:null,
        annotation:null,
        meta:null,

        // Blast
        blastResults : null,
        templateIDs: ["c952fc01-726e-4710-9d4a-48357872b37a"],

        //Backmutation
        templateData: null,
        hybridData: null
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

    deleteTemplate = (idToDelete) => () => {
        let newTemplates = this.state.templateIDs.filter((element) => element !== idToDelete);
        console.log("IDtoDelet",idToDelete,"newTemplates",newTemplates)
        this.setState({
            templateIDs: newTemplates
        })
        console.log("removed: ", this.state.templateIDs)
      };

    resetTemplates = () => {
        this.setState({
            templateIDs: []
        })
    }

    addTemplate = (templateId) => {
        if(!this.state.templateIDs.includes(templateId)){
            this.setState(prevState => ({
                templateIDs: [...prevState.templateIDs, templateId]
                }))
        }
        else{
            console.log("Already added")
        }
    }

    resetAlert = () => {
        setTimeout(() => {
            this.setState({
                showAlert: false
            })

        },3000)
    }

    createAnnotation = async (seq) => {
        this.setState({
            isFetching:true,
        })
        const response = await fetch("http://localhost:3000/annotate",
        {
            method:"POST",
            headers:{
            "Accept":"application/json, text/plain",
            "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "sequence":seq
            })
        })
        const json_data = await response.json();
        this.setState({
            querySequenceData:json_data,
            isFetching: false,
            annotation:Object.keys(json_data.data.annotation),
            meta: json_data.data.meta,
            alertType: "success",
            alertMessage: "Annotated successfully!",
            showAlert: true,
        })
        console.log("FETCHEDDATA: ",this.state)
        this.handleNext(this.state.activeStep)
        }

    submitBlast = async () => {
        this.setState({
            isFetching:true,
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
            isFetching: false,
            
            alertType: "success",
            alertMessage: "Execute Blast successfully!",
            showAlert: true
        })
        this.handleNext(this.state.activeStep)
        }


    fetchDB = async () => {
        this.setState({
            isFetching:true
        })
        const response = await fetch("http://localhost:3000/search",
        {
            method:"POST",
            headers:{
            "Accept":"application/json, text/plain",
            "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "templateIDs":this.state.templateIDs})
        })
        const json_data = await response.json();
        this.setState({
            templateData:json_data.data,
            isFetching: false,

            alertType: "success",
            alertMessage: "Fetched sequence data from database successfully!",
            showAlert: true
        })
        console.log("SEARCHRESULTS:",this.state.templateData)
        this.replaceCDR()
        this.handleNext(this.state.activeStep)
        }
    
    replaceCDR = async() => {
        this.setState({isFetching:true})
        const response = await fetch("http://localhost:3000/cdr",
        {
            method:"POST",
            headers:{
            "Accept":"application/json, text/plain",
            "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "templateIDs":this.state.templateIDs,
                "query": this.state.querySequence})
        })
        const json_data = await response.json();
        this.setState({
            hybridData:json_data.data,
            isFetching: false,

            alertType: "success",
            alertMessage: "Replaced CDR successfully!",
            showAlert: true
        })
        console.log("modified:",this.state.hybridData)
    }
    

    render(){



        return(
            <div className="contentContainer">
                <ProgressBar {...this.state}/>
                <ContentManager 
                    {...this.state}
                    next={() => {this.handleNext(this.state.activeStep)}}
                    back={() => {this.handleBack(this.state.activeStep)}}
                    createAnnotation={() => {this.createAnnotation(this.state.querySequence)}}
                    seqChangeHandler={(seq) => this.setSequence(seq)}
                    loadExample={this.loadExample}
                    addTemplate={this.addTemplate}
                    deleteTemplate={this.deleteTemplate}
                    resetTemplates={this.resetTemplates}
                    replaceCDR={this.replaceCDR}
                    />
                <ServiceNavigation
                    {...this.state}
                    next={() => {this.handleNext(this.state.activeStep)}}
                    back={() => {this.handleBack(this.state.activeStep)}}
                    loadExample={this.loadExample}
                    submitBlast={this.submitBlast}
                    resetTemplates={this.resetTemplates}
                    fetchDB={this.fetchDB}
                    replaceCDR={this.replaceCDR}
                    />
                {this.state.isFetching?null:<AlertBar  
                    alertMessage={this.state.alertMessage}
                    alertType={this.state.alertType}
                    showAlert={this.state.showAlert}
                    resetAlert={this.resetAlert}/>}
            </div>
        )

    }
}

export default HumanizationService;