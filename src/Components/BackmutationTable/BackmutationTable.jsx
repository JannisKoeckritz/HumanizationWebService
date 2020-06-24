import React,  {Component} from 'react'
import AminoLine from './AminoLine';
import valid_amino_acids from '../../data/iupac';
import MetaView from './MetaData';
import frequency_data from '../../data/frequency';
import TableHead from './TableHead';
import MutationLine from './MutationLine';

class BackmutationTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            mutations: this.props.frequency,
            appliedMutations: {},
            mutatedSeq: ""
        }
    }

    handleMutation = (posAApair) => {
        let elems = []
        elems.push(posAApair)
        let obj = {}
        elems.forEach((data) => {
            obj[data[0]] = data[1]
        })
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
        this.createMutatedSequence();
        
    }

    // TODO: Unite sequence with mutations and create string for fasta file

    createMutatedSequence = () => {
        let obj = {}
        this.state.mutations[this.props.activeAnnotationScheme].map(posArray => {
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
        const tableNumber = this.props.index
        const expObj = [tableNumber, identifier, returnString]
        this.props.addEditedSequence(expObj);
    }
    

    render() {
        console.log(this.props)
        return (
        <div className="bmt-box">
            <MetaView 
                title={this.props.name}
                query={this.props.query}
                target={this.props.target}
                modified={this.props.modified}/>

                        
            <div className="bmt-table">
                <table>
                        <TableHead
                            title={"Modified"}
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
                            title={"Modified"}
                            seq={this.props.modified}
                        />
                    
                    <MutationLine
                        title={"Mutations"}
                        mutations={this.state.mutations}
                        activeAnnotationScheme={this.props.activeAnnotationScheme}
                        appliedMutations={this.state.appliedMutations}
                        chain_type={this.props.chain_type}
                        threshold={this.props.threshold}
                    />
                    
                </table>
                </div>
                {/* <button className="btn" onClick={() => this.createMutatedSequence()}>CREATE SEQUENCE</button> */}
                </div>
                
        )}
}

export default BackmutationTable;