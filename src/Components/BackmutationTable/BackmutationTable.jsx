import React,  {Component} from 'react'
import AminoLine from './AminoLine';
import valid_amino_acids from '../../data/iupac';
import MetaView from './MetaData';
import frequency_data from '../../data/frequency';
import TableHead from './TableHead';
import MutationLine from './MutationLine';
import InfoLine from './InfoLine';
import Comparison from './Comparison'

class BackmutationTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            frequency: this.props.frequency,
            appliedMutations: {},
            mutatedSeq: ""
        }
    }

    handleMutation = (posAApair) => {
        console.log(posAApair)
        let obj = {}
        obj[posAApair[0]] = posAApair[1]
        if(this.state.appliedMutations[posAApair[0]]===obj[posAApair[0]]){
            let newState = {...this.state.appliedMutations}
            delete newState[posAApair[0]]
            this.setState({
                appliedMutations: {
                    ...newState
                }
            })
        }else{
            this.setState({
                appliedMutations: {
                    ...this.state.appliedMutations,
                    ...obj
                }
            })
        }
        
    }

    componentDidUpdate(prevProps, prevState){
        console.log(prevState, this.state)
        if(prevState.appliedMutations!==this.state.appliedMutations){
            this.createMutatedSequence()
        }
    }

    createMutatedSequence = () => {
        let obj = {}
        this.state.frequency[this.props.activeAnnotationScheme].map(posArray => {
            obj[posArray[0]] = posArray[1]
        })
        let mutatedPositions = this.state.appliedMutations
        Object.keys(mutatedPositions).sort().map(pos => {
            obj[pos] = mutatedPositions[pos]
        })

        var collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
        let returnString = ""
        Object.keys(obj).sort(collator.compare).map(position => {
            returnString = returnString.concat(obj[position])
        })
        const identifier = this.props.name
        const tableNumber = this.props.table
        const expObj = [tableNumber, identifier, returnString]
        console.log("exportobject", expObj)
        this.props.addEditedSequence(expObj);
    }


    render() {
        console.log("PROPS",this.props)
        console.log("state",this.state)
        return (
        <div className="bmt-box">
            <MetaView 
                title={this.props.name}
                query={this.props.query}
                target={this.props.target}
                modified={this.props.modified}
                templateMeta={this.props.templateMeta}
                table={this.props.table}
                />

                        
            <div className="bmt-table">
                <table>
                        <TableHead
                            title={"CDR-grafted"}
                            seq={this.props.modified}
                        />


                    <tbody>
                        {Object.keys(valid_amino_acids).map((aa, index) => {
                            return(
                                <AminoLine
                                    key={index}
                                    title={aa} 
                                    seq={this.props.modified}
                                    frequency={this.props.frequency[this.props.activeAnnotationScheme]}
                                    activeAnnotationScheme={this.props.activeAnnotationScheme}
                                    chain_type={this.props.chain_type}
                                    handleMutation={this.handleMutation}
                                    appliedMutations={this.state.appliedMutations}
                                    threshold={this.props.threshold}
                                />
                            )
                        })}
                    
                    </tbody>

                    <TableHead
                            title={"CDR-grafted"}
                            seq={this.props.modified}
                        />
                    
                    <MutationLine
                        title={"Mutations"}
                        mutations={this.state.frequency}
                        activeAnnotationScheme={this.props.activeAnnotationScheme}
                        appliedMutations={this.state.appliedMutations}
                        chain_type={this.props.chain_type}
                        threshold={this.props.threshold}
                    />
                    {this.props.showInfos&&Object.keys(this.props.residues).map((property, index) => {
                        return(
                        <InfoLine
                            key={index}
                            title={property}
                            frequency={this.props.frequency[this.props.activeAnnotationScheme]}
                            activeAnnotationScheme={this.props.activeAnnotationScheme}
                            data={this.props.residues[property]}
                            mutations={this.state.frequency}

                        />)
                    })}
                    <Comparison
                            title={"Query"}
                            comparison={this.props.comparison[this.props.activeAnnotationScheme]}
                            activeAnnotationScheme={this.props.activeAnnotationScheme}

                        />
                    
                    <Comparison
                            title={"Template"}
                            comparison={this.props.comparison[this.props.activeAnnotationScheme]}
                            activeAnnotationScheme={this.props.activeAnnotationScheme}

                        />
                    
                </table>
                </div>
                {/* <button className="btn" onClick={() => this.createMutatedSequence()}>CREATE SEQUENCE</button> */}
                </div>
                
        )}
}

export default BackmutationTable;