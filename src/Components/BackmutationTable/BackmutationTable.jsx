import React, { Component } from 'react';
import valid_amino_acids from '../../data/iupac';
import AminoLine from './AminoLine';

class BackmutationTable extends Component {
    constructor(props){
        super(props);
    }

    state = {
        source:"EVKLVESGAGVVKPGGSLKLSCEASGFSFSRYVMSWVRQTPEKRLEWVASISSGGRTYYPGSEMGRFTISRDSARNILYLQMSSLKSEDTAMFYCAREDYYGGRYWYFDVWGAGTTVTVSSA",
        target:this.props.results.seq,
        modified:"",
        metaId:"51b50889-0ca5-4a62-ae44-da47c73ca23f"
    }



    render(){
        return(
            <div className="backmutation-container">
                <h2>
                    BackmutationTable
                </h2>
                <div className="bmt-table">
                    <table>
                        <thead>

                            <AminoLine 
                                title={"Source"}
                                seq={this.state.source} 
                                className="bmt-source"
                            />
                            <AminoLine 
                                title={"Target"}
                                seq={this.state.target}
                                className="bmt-target"
                            />
                        </thead>
                        <tbody>
                            {Object.keys(valid_amino_acids).map(aa => {
                                return(
                                    <AminoLine  title={aa} 
                                                seq={this.state.target}
                                                className="bmt-aa"/>
                                )
                            })}
                        </tbody>
                        <thead>
                            <AminoLine 
                                title={"Modified"}
                                seq={this.state.source} 
                                className="bmt-source"
                            />
                            <AminoLine 
                                title={"Source"}
                                seq={this.state.source} 
                                className="bmt-source"
                            />
                            <AminoLine 
                                title={"Target"}
                                seq={this.state.target}
                                className="bmt-target"
                            />
                        </thead>
                    </table>
                </div>
                    
            </div>
        )
    }
}

export default BackmutationTable;