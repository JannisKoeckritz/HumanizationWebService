import React from 'react';
import ab from '../img/ab.png'

 const Loading = () => {
        return(<div>
            <div className="image-cropper">
                <img src={ab} className="img-loader"/>
            </div>
            <p>Loading...</p>
            </div>
        )}

export default Loading;