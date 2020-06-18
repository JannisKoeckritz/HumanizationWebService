import React, { Component } from 'react';

class Export extends Component{
    render(){
        return(
            <div className="page-box">
                <h2 className="page-title">
                    Export
                </h2>
                <div className="page-information">
                    Download your hybrid sequnces below.
                </div>
                <button className="btn" onClick={() => {this.props.downloadFile()}}>Download</button>
            </div>
        )
    }
}

export default Export;