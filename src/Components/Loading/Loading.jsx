import React from 'react';
import ab from '../../img/ab_logo.svg'

 const loading = () => {
        return(
            <div className="loader-container">
                <div className="loader-box" >
                    <img alt="Spinning antibody" src={ab} className="loader"/>
                    <p className="loader-text">Loading...</p>
                </div>
            </div>
        )}

export default loading;