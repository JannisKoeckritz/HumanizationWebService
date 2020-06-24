import React, { Component } from 'react';
import BackmutationTable from './BackmutationTable';
import Slider from "@material-ui/core/Slider";


class BackmutationContainer extends Component {
    constructor(props){
        super(props);
    }

    state = {
        source:this.props.querySequence,
        targets:this.props.templateData,
        modified:this.props.modified,
        chain_type: this.props.meta.chain_type,
        activeAnnotationScheme: this.props.activeAnnotationScheme,
        mutations: []
    }

    addEditedSequence = (mutatedSeqObj) => {
        const tableNumber = mutatedSeqObj[0]
        const identifier = mutatedSeqObj[1]
        const sequence = mutatedSeqObj[2]
        let currentState = this.state.mutations

        const ids = []
        currentState.forEach(elem => {
            ids.push(elem['id'])
        })
        if(ids.includes(identifier)){
            currentState.map(elem => { 
                if(elem['id']===identifier){
                    elem['seq'] = sequence
                }
            })
        }else{
            currentState.push({'id':identifier, 'seq': sequence})
        }
        console.log("current state",currentState)

        this.setState({
            mutations: currentState
        })

    }



    render(){
        return(
            <div className="backmutation-container">
                <h2 className="page-title">
                    Backmutation
                </h2>
                <div className="page-information">
                    Apply mutations for every pair of query sequence and template you chose before.
                </div>
                <div className="settings">
                    <div className="settings-item">
                    <div className="settings-item settings-item-slider">
                        <Slider
                            value={this.props.threshold}
                            onChange={this.props.setThreshold}
                            valueLabelDisplay="on"
                            aria-labelledby="range-slider"
                            // getAriaValueText={thresholdText}
                        />
                    </div>
                    </div>
                </div>

                {
                    Object.keys(this.props.hybridData).map((hybridSeq, index)=>{
                        return (
                            <BackmutationTable
                                key={hybridSeq}
                                name={hybridSeq}
                                table={index}
                                query={this.state.source}
                                target={this.props.hybridData[hybridSeq]["target_seq"]}
                                modified={this.props.hybridData[hybridSeq]["mod_seq"]}
                                frequency={this.props.hybridData[hybridSeq]["frequency"]}
                                mutations={this.props.hybridData[hybridSeq]["mutations"]}
                                activeAnnotationScheme={this.state.activeAnnotationScheme}
                                chain_type={this.state.chain_type}
                                addModified={this.addModified}
                                addEditedSequence={this.addEditedSequence}
                                threshold={this.props.threshold}
                            />
                        )
                    })
                }

                <button className="btn" style={{float:"right"}}onClick={() => {
                    console.log(this.state)
                    this.props.getMutatedSequences(this.state.mutations)
                }}>
                    Apply mutations
                </button>
                    
            </div>
        )
    }
}

export default BackmutationContainer;