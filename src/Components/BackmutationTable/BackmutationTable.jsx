import React,  {Component} from 'react'
import AminoLine from './AminoLine';
import valid_amino_acids from '../../data/iupac';
import MetaView from './MetaData';
import frequency_light from '../../data/frequency_light_table.json';
import frequency_heavy from '../../data/frequency_heavy_table.json';
import TableHead from './TableHead';
class BackmutationTable extends Component {

    state = {
        activeCoordinate: [],
        Xcoord: null,
        Ycoord: null
    }

    setXY = (newCoordinates) => {
        this.setState({
            Xcoord: newCoordinates[0],
            Ycoord: newCoordinates[1]
        })
    }

    render() {
        console.log("BMT-TABLE props: ", this.props)
        return (
        <div className="bmt-box">
            {/* <h4 className="bmt-heading">Template-ID: {this.props.name}</h4> */}
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
                                    frequency={this.props.frequency[this.props.annotationScheme]}
                                    annotationScheme={this.props.annotationScheme}
                                />
                            )
                        })}
                    </tbody>

                    <TableHead
                            title={"Modified"}
                            seq={this.props.modified}
                        />
                    
                </table>
                </div></div>
                
        )}
}

export default BackmutationTable;