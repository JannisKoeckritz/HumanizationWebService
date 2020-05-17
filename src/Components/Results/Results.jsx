import React,  {useState} from 'react';

const Results = (props) => {
    return (
        <div className="result__box">
            <h2 className="result__title">Results</h2>
            <div className="result__list">

                {props.children}
            </div>
        </div>
    );
}

export default Results;