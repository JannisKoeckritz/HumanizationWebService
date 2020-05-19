import React from 'react';

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
                <div className="metaview__description">
                    {props.meta.sequence}
                </div>
            </div>
        </div>

    )
}

export default metaView;