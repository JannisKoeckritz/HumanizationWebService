import React, { Component } from 'react';
import BackmutationTable from './BackmutationTable';


class BackmutationContainer extends Component {
    constructor(props){
        super(props);
    }

    state = {
        source:this.props.querySequence,
        targets:this.props.templateData,
        modified:[],
        chain_type: this.props.meta.chain_type,
        activeAnnotationScheme: this.props.activeAnnotationScheme
    }

    addModified = (modifiedSequence) => {
        if(!this.state.modified.includes(modifiedSequence)){
            this.setState(prevState => ({
                modified: [...prevState.modified, modifiedSequence]
                }))
        }
        else{
            console.log("Already added")
        }
    }  



    render(){
        console.log("BackmutationContainer: ",this.props)
        return(
            <div className="backmutation-container">
                <h2 className="page-title">
                    Backmutation
                </h2>
                <div className="page-information">
                    Apply mutations for every pair of query sequence and template you chose before.
                </div>

                {
                    Object.keys(this.props.hybridData).map((hybridSeq, index)=>{
                        //console.log("hybridSeq",hybridSeq)
                        return (
                            <BackmutationTable
                                key={hybridSeq}
                                name={hybridSeq}
                                table={index}
                                query={this.state.source}
                                target={this.props.hybridData[hybridSeq]["target_seq"]}
                                modified={this.props.hybridData[hybridSeq]["mod_seq"]}
                                frequency={this.props.hybridData[hybridSeq]['frequency']}
                                activeAnnotationScheme={this.state.activeAnnotationScheme}
                                chain_type={this.state.chain_type}
                                // addModified={this.addModified}
                            />
                        )
                    })
                }
                    
            </div>
        )
    }
}

export default BackmutationContainer;