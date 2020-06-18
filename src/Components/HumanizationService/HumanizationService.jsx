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
        querySequence: "",
        germline:false,
        job_id:null,

        // Alerts
        alertMessage: "",
        alertType: "success",
        showAlert: false,

        //Loading
        loadingMessage:"Loading",

        // Analyze
        querySequenceData:null,
        annotation:null,
        meta:null,
        chain_type:null,
        activeAnnotationScheme:'kabat',
        threshold: [0,2],

        // Blast
        blastResults : null,
        templateIDs: [],

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
            querySequence: "GESLKISCAASGLSCSSHWMSWVRQAPGKGLEWVADINHDGSEKHYVDSVKGRFTISRDNAKNSVYLQMNTLRAEDTAVYYCARESGIVGASRGWDFDYWGQGTLVTVSS"
        })
    }

    toggleGermline=()=>{
        this.setState({
            germline: !this.state.germline,
        })
      }

    changeAnnotation = (event) => {
        this.setState({
            activeAnnotationScheme: event.target.value
        })
    }

    setThreshold = (event, newList) => {
        if(newList[0] > newList[1]){
            const first = newList[1]
            const second = newList[0]
            this.setState({threshold: [first, second]})
        }
        else{
            this.setState({threshold: newList})
        }
        console.log(this.state.threshold)
    }
    
    deleteTemplate = (idToDelete) => () => {
        let newTemplates = this.state.templateIDs.filter((element) => element !== idToDelete);
        this.setState({
            templateIDs: newTemplates
        })
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

    checkInputSequence = (seq) => {
        seq = seq.replace(/(\r\n|\n|\r|>)/gm,"");
        return seq
    }

    createAnnotation = async (seq) => {
        this.setState({
            loadingMessage:"Creating annotation",
            isFetching:true,
        })
        seq = this.checkInputSequence(seq)
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
            if(![201,200].includes(response.status)){
                this.setState({
                    isFetching:false,
                    alertType: "error",
                    alertMessage: `${response.status} - ${response.statusText}`,
                    showAlert: true
                })
            } else {

                const json_data = await response.json();
                this.setState({
                    querySequenceData:json_data,
                    job_id:json_data.job_id,
                    isFetching: false,
                    annotation:Object.keys(json_data.data.annotation),
                    meta: json_data.data.meta,
                    chain_type: json_data.data.meta.chain_type,
                    alertType: "success",
                    alertMessage: "Annotated successfully!",
                    showAlert: true,
                })
                
            this.handleNext(this.state.activeStep)
            }
       }


    submitBlast = async () => {
        this.setState({
            loadingMessage:"Searching in Blast database",
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
                "chain_type": this.state.chain_type,
                "germline": this.state.germline,
                "job_id":this.state.job_id})
        })
        if(![201,200].includes(response.status)){
            this.setState({
                isFetching:false,
                alertType: "error",
                alertMessage: `${response.status} - ${response.statusText}`,
                showAlert: true
            })
        } else {
            const json_data = await response.json();
            this.setState({
                blastResults:json_data,
                isFetching: false,
                
                alertType: "success",
                alertMessage: "Execute Blast successfully!",
                showAlert: true
            })
            console.log("BLAST RESULTS", this.state.blastResults)
            this.handleNext(this.state.activeStep)
        }
    }


    loadTemplates = async () => {
        this.setState({
            loadingMessage:"Loading template data",
            isFetching:true
        })
        const response = await fetch("http://localhost:3000/templates",
        {
            method:"POST",
            headers:{
            "Accept":"application/json, text/plain",
            "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "templateIDs":this.state.templateIDs})
        })
        if(![201,200].includes(response.status)){
            this.setState({
                isFetching:false,
                alertType: "error",
                alertMessage: `${response.status} - ${response.statusText}`,
                showAlert: true
            })
        } else {
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
    }
    
    replaceCDR = async() => {
        this.setState({isFetching:true})
        const response = await fetch("http://localhost:3000/humanize",
        {
            method:"POST",
            headers:{
            "Accept":"application/json, text/plain",
            "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "templateData":this.state.templateData,
                "sequence": this.state.querySequence})
        })
        if(![201,200].includes(response.status)){
            this.setState({
                isFetching:false,
                alertType: "error",
                alertMessage: `${response.status} - ${response.statusText}`,
                showAlert: true
            })
        } else {
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
    }

    downloadFile = async() => {
        this.setState({isFetching: true});
        let fetch_url = `http://localhost:3000/export/${this.state.job_id}`
        console.log(fetch_url)
        const response = await fetch(fetch_url)
        if(![201,200].includes(response.status)){
            this.setState({
                isFetching:false,
                alertType: "warning",
                alertMessage: `${response.status} - ${response.statusText} - Please generate FASTA file before.`,
                showAlert: true
            })
        } else {
            response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = "humanized_sequences.fasta";
                    a.click()
                });
            this.setState({
                isFetching:false,
                alertType: "success",
                alertMessage: "Downloaded file successfully.",
                showAlert: true
            })
        }
    }

    selectSequencesForDownload = async() => {
        this.setState({isFetching:true})
        const response = await fetch("http://localhost:3000/export",
        {
            method:"POST",
            headers:{
            "Accept":"application/json, text/plain",
            "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "sequences": [{"id": "dfb7d39-389dh389d-dg3-33d", "seq": "GESLKISCAASGLSCSSHWMSWVRQAPGKGLEWVADINHDGSEKHYVDSVKGRFTISRDNAKNSVYLQMNTLRAEDTAVYYCARESGIVGASRGWDFDYWGQGTLVTVSS"},{"id": "dfb7d39-389dh389d-dg3-33d", "seq": "GESLKISCAASGLSCSSHWMSWVRQAPGKGLEWVADINHDGSEKHYVDSVKGRFTISRDNAKNSVYLQMNTLRAEDTAVYYCARESGIVGASRGWDFDYWGQGTLVTVSS"}],
                "job_id": this.state.job_id
            })

        })
        if(![201,200].includes(response.status)){
            this.setState({
                isFetching:false,
                alertType: "error",
                alertMessage: `${response.status} - ${response.statusText}`,
                showAlert: true
            })
        } else {
            this.setState({
                isFetching:false,
                alertType: "success",
                alertMessage: "Created FASTA successfully!",
                showAlert: true
            })
        }
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
                    toggleGermline={this.toggleGermline}
                    changeAnnotation={this.changeAnnotation}
                    setThreshold={this.setThreshold}
                    loadExample={this.loadExample}
                    addTemplate={this.addTemplate}
                    deleteTemplate={this.deleteTemplate}
                    resetTemplates={this.resetTemplates}
                    replaceCDR={this.replaceCDR}
                    downloadFile={this.downloadFile}
                    />
                <ServiceNavigation
                    {...this.state}
                    next={() => {this.handleNext(this.state.activeStep)}}
                    back={() => {this.handleBack(this.state.activeStep)}}
                    loadExample={this.loadExample}
                    submitBlast={this.submitBlast}
                    resetTemplates={this.resetTemplates}
                    loadTemplates={this.loadTemplates}
                    replaceCDR={this.replaceCDR}
                    selectSequencesForDownload={this.selectSequencesForDownload}
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