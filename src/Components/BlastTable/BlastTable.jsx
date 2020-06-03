import React from 'react';
import BlastSelector from '../BlastSelector/BlastSelector'
import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';



const selectButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
  }))(Button);

const blastTable = (props) => {
    console.log("BLAST TABLE",props)
    return (
        <div>
        <h2 className="result result__title">Blast Results</h2>
        <div className="blast-selector-container">
            <BlastSelector {...props}/>
        </div>
        <div className="blast-table-container">


        <ul className="blast-table">
            <li className="blast-heading">
                <div className="blast-table-heading blast-table-index">Index</div>
                <div className="blast-table-heading blast-table-seq">Sequence ID</div>
                <div className="blast-table-heading blast-table-percent">percent</div>
                <div className="blast-table-heading blast-table-evalue">e-value</div>
                <div className="blast-table-heading blast-table-bitscore">bitscore</div>
                <div className="blast-table-heading blast-table-add"></div>

            </li>

            {props.blastResults &&
                props.blastResults.data.map((entry, index) => {
                    const splitted = entry.split("\t")
                    const job_id = splitted[0]
                    const seq_db_id = splitted[1]
                    const percent = splitted[2]
                    const length = splitted[3]
                    const mismatch = splitted[4]
                    const evalue = splitted[10]
                    const bitscore = splitted[11]

                    return (
                    <li className="blast-table-item">
                        <div className="blast-table-row blast-table-index">{index}</div>
                        <div className="blast-table-row blast-table-seq">{seq_db_id}</div>
                        <div className="blast-table-row blast-table-percent">{percent}</div>
                        <div className="blast-table-row blast-table-evalue">{evalue}</div>
                        <div className="blast-table-row blast-table-bitscore">{bitscore}</div>
                        <div className="blast-table-row blast-table-add">
                            <button
                            onClick={() => {
                                props.addTemplate({key:index, value:seq_db_id});
                            }}>Select</button>
                        </div>
                    </li>
                    )
                })}

        </ul>
        </div>
        </div>)}
export default blastTable;