import React from 'react';
import ab from '../../img/ab_logo2.svg'

 const loading = (props) => {
        return(
            <div className="loader-container">
                <div className="loader-box" >
                    <img alt="Spinning antibody" src={ab} className="loader"/>
                </div>
                <p className="loader-text">{props.message}...</p>
            </div>
        )}

export default loading;