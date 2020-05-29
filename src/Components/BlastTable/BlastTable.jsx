import React from 'react';
import BlastSelector from '../BlastSelector/BlastSelector'



const blastTable = (props) => {
    console.log("BLAST TABLE",props)
    return (
        <div>
        <h2 className="result result__title">Blast Results</h2>
        <div className="blast-selector-container">
            <BlastSelector {...props}/>
        </div>
        <table className="blast-table">
            <thead className="blast-table-heading">
            <tr className="blast-table-row">
                <td>index</td>
                <td>job_id</td>
                <td>seq_db_id</td>
                <td>percent</td>
                <td>length</td>
                <td>mismatch</td>
                <td>evalue</td>
                <td>bitscore</td>
                <td>add</td>
            </tr>
            </thead>
            <tbody>
            {props.blastResults &&
                props.blastResults.data.map((entry, index) => {
                    const splitted = entry.split("\t")
                    const job_id = splitted[0]
                    const seq_db_id = splitted[1]
                    const percent = splitted[2]
                    const length = splitted[3]
                    const mismatch = splitted[4]
                    const gapopen = splitted[5]
                    const qstart = splitted[6]
                    const qend = splitted[7]
                    const sstart = splitted[8]
                    const send = splitted[9]
                    const evalue = splitted[10]
                    const bitscore = splitted[11]

                    return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{job_id}</td>
                        <td>{seq_db_id}</td>
                        <td>{percent}</td>
                        <td>{length}</td>
                        <td>{mismatch}</td>
                        <td>{evalue}</td>
                        <td>{bitscore}</td>
                        <td><button 
                            className="btn-simple btn-simple-green btn-round"
                            onClick={() => {
                                props.addBlastResult({key:index, value:seq_db_id})
                            }}>+</button></td>
                    </tr>)
                })}
                </tbody>
        </table>
        </div>
    )
}

export default blastTable;