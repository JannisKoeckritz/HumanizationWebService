import React from 'react';
import ab from '../../img/ab.png'

 const loading = () => {
        return(
            <div className="loader-container">
                <div className="loader-box" >
                    <div className="loader-cropper">
                        <img alt="Spinning antibody" src={ab} className="loader"/>
                </div>
                <p className="loader-text">Loading...</p>
                </div>
            </div>
        )}

export default loading;