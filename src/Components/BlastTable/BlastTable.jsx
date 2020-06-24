import React from 'react';
import BlastSelector from '../BlastSelector/BlastSelector'
import BlastItem from './BlastItem';


const blastTable = (props) => {
    return (
        <div className="page-box">
            <h2 className="page-title">Select template</h2>
            <div className="page-information">This list shows the best blast hits in our database. Please select one template.</div>
            <div className="blast-selector-container">
                <BlastSelector {...props}/>
            </div>
            <div className="blast-table-container">
                <ul className="blast-table">
                    <li className="blast-heading blast-heading-top">
                        <div className="blast-table-heading blast-table-index">Index</div>
                        <div className="blast-table-heading blast-table-index">Germline</div>
                        {/* <div className="blast-table-heading blast-table-seq">Sequence-ID</div> */}
                        <div className="blast-table-heading blast-table-percent">Identity [%]</div>
                        <div className="blast-table-heading blast-table-evalue">E-value</div>
                        <div className="blast-table-heading blast-table-bitscore">Bitscore</div>
                        <div className="blast-table-heading blast-table-add"></div>

                    </li>

                    {props.blastResults &&
                        props.blastResults.data.map((entry, index) => {
                            const splitted = entry.split("\t")
                            //const job_id = splitted[0]
                            const seq_id = splitted[1]
                            const percent = splitted[2]
                            // const length = splitted[3]
                            // const mismatch = splitted[4]
                            const evalue = splitted[10]
                            const bitscore = splitted[11]

                            return (
                                <BlastItem
                                    key={seq_id}
                                    index={index}
                                    seq_id={seq_id}
                                    percent={percent}
                                    evalue={evalue}
                                    bitscore={bitscore}
                                    addTemplate={props.addTemplate}
                                    deleteTemplate={props.deleteTemplate}
                                    templateIDs={props.templateIDs}
                                />
                            )
                        })}
                    <li className="blast-heading">
                        <div className="blast-table-heading blast-table-index">Index</div>
                        <div className="blast-table-heading blast-table-index">Germline</div>
                        {/* <div className="blast-table-heading blast-table-seq">Sequence-ID</div> */}
                        <div className="blast-table-heading blast-table-percent">Identity [%]</div>
                        <div className="blast-table-heading blast-table-evalue">E-value</div>
                        <div className="blast-table-heading blast-table-bitscore">Bitscore</div>
                        <div className="blast-table-heading blast-table-add"></div>

                    </li>
                </ul>
            </div>
        </div>)}
export default blastTable;