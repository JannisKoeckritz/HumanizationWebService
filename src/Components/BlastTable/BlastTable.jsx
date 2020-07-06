import React from 'react';
import BlastSelector from '../BlastSelector/BlastSelector'
import BlastItem from './BlastItem';


const blastTable = (props) => {
    return (
        <div className="page-box">
            <h2 className="page-title">Select template</h2>
            <div className="page-information">This list shows the best blast hits in our database. Please select one template.</div>
            <div className="blast-subcontainer">
                <BlastSelector {...props}/>
            {
                props.templateIDs.length>=1&& <button className="btn" onClick={() => {
                    props.loadTemplates();
                }}>Backmutation</button>
            }
            </div>
            <div className="blast-table-container">
                <ul className="blast-table">
                    <li className="blast-heading blast-heading-top">
                        <div className="blast-table-heading blast-table-index">Index</div>
                        <div className="blast-table-heading blast-table-index">Germline</div>
                        <div className="blast-table-heading blast-table-seq">Sequence-ID</div>
                        <div className="blast-table-heading blast-table-percent">Identity [%]</div>
                        <div className="blast-table-heading blast-table-evalue">E-value</div>
                        <div className="blast-table-heading blast-table-bitscore">Bitscore</div>
                        <div className="blast-table-heading blast-table-add"></div>

                    </li>

                    {props.blastResults &&
                        props.blastResults.data.map((entry, index) => {
                            const splitted = entry.split("\t")
                            const germline = splitted[0]!="N/A"?splitted[0]:"no"
                            const query_id = splitted[1]
                            const name = splitted[2]
                            const identity = splitted[3]
                            // const length = splitted[4]
                            // const mismatch = splitted[4]
                            const evalue = splitted[12]
                            const bitscore = splitted[13]

                            return (
                                <BlastItem
                                    key={name}
                                    index={index}
                                    name={name}
                                    germline={germline}
                                    identity={identity}
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
                        <div className="blast-table-heading blast-table-seq">Sequence-ID</div>
                        <div className="blast-table-heading blast-table-percent">Identity [%]</div>
                        <div className="blast-table-heading blast-table-evalue">E-value</div>
                        <div className="blast-table-heading blast-table-bitscore">Bitscore</div>
                        <div className="blast-table-heading blast-table-add"></div>

                    </li>
                </ul>
            </div>
        </div>)}
export default blastTable;