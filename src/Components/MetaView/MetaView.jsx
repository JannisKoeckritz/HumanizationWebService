import React from 'react';

const sliceSequence = (seq) => {
    let position = seq.length/2
    let insertion = "\n"
    let output = [seq.slice(0,position),insertion,seq.slice(position)].join("")
    return output
}

const metaView = (props) => {
    return(
        <div className="metaview__container">
            <div className="metaview__container__sub__element">
                <div className="metaview__title">
                    Species:
                </div>
                <div className="metaview__description">
                    {props.meta.species}
                </div>
            </div>
            <div className="metaview__container__sub__element">
                <div className="metaview__title">
                    Chain:
                </div>
                <div className="metaview__description">
                    {props.meta.chain}
                </div>
            </div>
            <div className="metaview__container__sub__element">
                <div className="metaview__title">
                    Iso-Type:
                </div>
                <div className="metaview__description">
                    {props.meta.iso_type}
                </div>
            </div>
            <div className="metaview__container__element">
                <div className="metaview__title">
                    Sequence:
                </div>
                <div className="metaview__description" style={{textAlign:"center"}}>
                    {sliceSequence(props.meta.sequence)}
                </div>
            </div>
        </div>

    )
}

export default metaView;