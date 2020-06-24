import React from 'react';

const sliceSequence = (seq) => {
    let position = seq.length/2
    let insertion = "\n"
    let output = [seq.slice(0,position),insertion,seq.slice(position)].join("")
    return output
}



const metaView = (props) => {
    console.log("META", props)
    let regions = []
    props.meta.regions[props.activeAnnotationScheme].map((item, index) => {
        regions.push(
            <div key={index} className="mv__line">
                <div className="mv__line__title" style={{width: "25%"}}>{item.region}</div>
                <div className="mv__line__description" style={{width: "55%", textAlign:"left"}}>{item.sequence_fragment}</div>
                <div className="mv__line__description" style={{width: "15%"}}>{item.residue}</div>
                <div className="mv__line__description" style={{width: "5%"}}>{item.length}</div>
            </div>)
    })
    return(
        <div className="mv">
            <div className="mv__container">
                <div className="mv__item">
                    <div className="mv__line">
                        <div className="mv__line__title">Species</div>
                        <div className="mv__line__description">{props.meta.species}</div>
                    </div>
                    <div className="mv__line">
                        <div className="mv__line__title">Chain</div>
                        <div className="mv__line__description">{props.meta.chain_type}</div>
                    </div>
                    <div className="mv__line">
                        <div className="mv__line__title">Iso-Type</div>
                        <div className="mv__line__description">{props.meta.iso_type}</div>
                    </div>
                    {/* <div className="mv__line">
                        <div className="mv__line__title">Sequence</div>
                        <div className="mv__line__description">{sliceSequence(props.meta.sequence)}</div>
                    </div> */}
                </div>
                <div className="mv__item">
                    {regions}
                </div>
            </div>


        </div>

    )
}

export default metaView;