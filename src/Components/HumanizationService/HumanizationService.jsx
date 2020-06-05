import React, { Component } from 'react'
import ProgressBar from '../Progress/Progress';
import ContentManager from '../ContentManager/ContentManager';
import ServiceNavigation from '../ServiceNavigation/ServiceNavigation';
import AlertBar from '../Alert/Alert';
import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';

class HumanizationService extends Component {

    state = {
        isfetching:false,
        sendRequest:false,
        jobID:"34",
        querySequence: " ",
        data:null,
        activeStep: 0,
        steps: ['Enter sequence', 'Analyze sequence','Choose template', 'Backmutation','Export'],
        finished: false,
        blastResults : null,
        alertMessage: "",
        alertType: "success",
        showAlert: false,
        templateIDs: ["c952fc01-726e-4710-9d4a-48357872b37a"],
        results: null
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
        console.log("FETCHEDDATA: ",this.state)
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
        this.handleNext(this.state.activeStep)
        }


    fetchDB = async () => {
        this.setState({
            isfetching:true
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
            results:json_data.data,
            isfetching: false,

            alertType: "success",
            alertMessage: "Fetched sequence data from database successfully!",
            showAlert: true
        })
        console.log("SEARCHRESULTS:",this.state.dbEntry)
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
                    loadExample={this.loadExample}
                    addTemplate={this.addTemplate}
                    deleteTemplate={this.deleteTemplate}
                    resetTemplates={this.resetTemplates}
                    />
                <ServiceNavigation
                    {...this.state}
                    next={() => {this.handleNext(this.state.activeStep)}}
                    back={() => {this.handleBack(this.state.activeStep)}}
                    loadExample={this.loadExample}
                    submitBlast={this.submitBlast}
                    resetTemplates={this.resetTemplates}
                    fetchDB={this.fetchDB}
                    />
                {this.state.isfetching?null:<AlertBar  
                    alertMessage={this.state.alertMessage}
                    alertType={this.state.alertType}
                    showAlert={this.state.showAlert}
                    resetAlert={this.resetAlert}/>}
            </div>
        )

    }
}

export default HumanizationService;