import React, { Component } from 'react';
import BackmutationTable from './BackmutationTable';
import Slider from "@material-ui/core/Slider";
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class BackmutationContainer extends Component {
    constructor(props){
        super(props);
    }

    state = {
        source:this.props.querySequence,
        modified:this.props.modified,
        chain_type: this.props.meta.chain_type,
        activeAnnotationScheme: this.props.activeAnnotationScheme,
        showInfos: true,
        showComparison: true,

        
        mutations: {"unmutated":Object.values(this.props.hybridData)[0].mod_seq},
        added_tables: []
    }

    addEditedSequence = (mutatedSeqObj) => {

        const tableNumber = mutatedSeqObj[0]
        const identifier = mutatedSeqObj[1]
        const sequence = mutatedSeqObj[2]
        let currentState = this.state.mutations
        currentState[tableNumber] = sequence

        // const ids = []
        // currentState.forEach(elem => {
        //     ids.push(elem['id'])
        // })
        // if(ids.includes(identifier)){
        //     currentState.map(elem => { 
        //         if(elem['id']===identifier){
        //             elem['seq'] = sequence
        //         }
        //     })
        // }else{
        //     currentState.push({'id':identifier, 'seq': sequence})
        // }
        console.log("current state",currentState)

        this.setState({
            mutations: currentState
        })

    }

    toggleAdditionalInfos = () => {
        this.setState({
            showInfos: !this.state.showInfos
        })

    }

    toggleComparison = () => {
        this.setState({
            showComparison: !this.state.showComparison
        })

    }

    createNewTable = () => {
        console.log("STATE ON CREATE TABLE", this.state)
        this.setState(prevState => {
            const added_tables = [...prevState.added_tables, prevState.added_tables.length+2]
            return {
                added_tables
            }
        })
    }

    

    render(){
        const ColorCheckBox = withStyles({
            root: {
            color: "#004777",
            '&$checked': {
                color: "#004777",
            },
            },
        })((props) => <Checkbox color="default" {...props} />);

        console.log(this.props)
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
                    <div className="settings-item">
                        <span className="bmc-frequency-indicator bmc-frequency-indicator-low">{"<="+this.props.threshold[0]+"%"}</span>
                        <span className="bmc-frequency-indicator bmc-frequency-indicator-medium">{">"+this.props.threshold[0]+"% and <"+this.props.threshold[1]+"%"}</span>
                        <span className="bmc-frequency-indicator bmc-frequency-indicator-high">{">="+this.props.threshold[1]+"%"}</span>
                    </div>
                    <div className="settings-item">
                        <FormControlLabel
                            control={
                                <ColorCheckBox
                                onChange={() => this.toggleAdditionalInfos()}
                                name="germline-validation"
                                checked={this.state.showInfos}
                                />
                            }
                            label={"Show important residues"}
                        />
                    </div>
                    <div className="settings-item">
                        <FormControlLabel
                            control={
                                <ColorCheckBox
                                onChange={() => this.toggleComparison()}
                                name="germline-validation"
                                checked={this.state.showComparison}
                                />
                            }
                            label={"Show comparison"}
                        />
                    </div>
                </div>

                {
                    Object.keys(this.props.hybridData).map((hybridSeq, index)=>{
                        return (
                            <div>
                                <BackmutationTable
                                    key={hybridSeq}
                                    name={hybridSeq}
                                    table={1}
                                    query={this.props.hybridData[hybridSeq]["vr"]}
                                    templateMeta={this.props.results[hybridSeq]}
                                    target={this.props.hybridData[hybridSeq]["target_seq"]}
                                    modified={this.props.hybridData[hybridSeq]["mod_seq"]}
                                    frequency={this.props.hybridData[hybridSeq]["frequency"]}
                                    mutations={this.props.hybridData[hybridSeq]["mutations"]}
                                    residues={this.props.hybridData[hybridSeq]["residues"]}
                                    activeAnnotationScheme={this.state.activeAnnotationScheme}
                                    chain_type={this.state.chain_type}
                                    addModified={this.addModified}
                                    addEditedSequence={this.addEditedSequence}
                                    threshold={this.props.threshold}
                                    showInfos={this.state.showInfos}
                                    comparison={this.props.hybridData[hybridSeq]["comparison"]}
                                />
                            </div>
                        )
                    })
                }

                {this.state.added_tables.map( tableId => {
                    let hybridSeq = Object.keys(this.props.hybridData)[0]
                            return (
                                <div>
                                <BackmutationTable
                                    key={tableId}
                                    name={hybridSeq}
                                    table={tableId}
                                    query={this.props.hybridData[hybridSeq]["vr"]}
                                    templateMeta={this.props.results[hybridSeq]}
                                    target={this.props.hybridData[hybridSeq]["target_seq"]}
                                    modified={this.props.hybridData[hybridSeq]["mod_seq"]}
                                    frequency={this.props.hybridData[hybridSeq]["frequency"]}
                                    mutations={this.props.hybridData[hybridSeq]["mutations"]}
                                    residues={this.props.hybridData[hybridSeq]["residues"]}
                                    activeAnnotationScheme={this.state.activeAnnotationScheme}
                                    chain_type={this.state.chain_type}
                                    addModified={this.addModified}
                                    addEditedSequence={this.addEditedSequence}
                                    threshold={this.props.threshold}
                                    showInfos={this.state.showInfos}
                                    comparison={this.props.hybridData[hybridSeq]["comparison"]}
                                    showComparison={this.state.showComparison}
                                />
                                </div>
                            )
                })}

                <table className="add-mutation-table" onClick={() => this.createNewTable()}>
                    <tbody>
                        <tr>
                            <td>Add mutation +</td>
                        </tr>
                    </tbody>
                </table>


                <button className="btn" style={{float:"right"}} onClick={() => {
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