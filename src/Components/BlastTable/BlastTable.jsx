import React from 'react';



const blastTable = (props) => {
    console.log("BLAST TABLE",props)
    return (
        <table style={{textAlign:"center"}}>
            <thead>
            <tr>
                <td>index</td>
                <td>job_id</td>
                <td>seq_db_id</td>
                <td>percent</td>
                <td>length</td>
                <td>mismatch</td>
                <td>gapopen</td>
                <td>qstart</td>
                <td>qend</td>
                <td>sstart</td>
                <td>send</td>
                <td>evalue</td>
                <td>bitscore</td>
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
                        <td>{gapopen}</td>
                        <td>{qstart}</td>
                        <td>{qend}</td>
                        <td>{sstart}</td>
                        <td>{send}</td>
                        <td>{evalue}</td>
                        <td>{bitscore}</td>
                    </tr>)
                })}
                </tbody>
        </table>
    )
}

export default blastTable;