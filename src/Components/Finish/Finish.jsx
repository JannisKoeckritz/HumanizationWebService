import React, { Component } from 'react';

const finish = (props) => {
        return(
            <div className="page-box">
                <h2 className="page-title">
                    Finished download successfully!
                </h2>
                <div className="page-information">
                    Your download was finished successfully. Please check your download folder for a file named 'humanized_sequences_ ... .fasta'.
                </div>
                <button className="btn" onClick={() => props.handleReset()}>Reset</button>
                
                
            </div>
        )
    }


export default finish;