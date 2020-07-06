import React from 'react'
import Icon from '@material-ui/core/Icon';

const serviceNavigation = (props) => {

    let nextLabel = "Next";

    if(props.activeStep===2){
        nextLabel="Backmutation"
    }
    if(props.activeStep===4){
        nextLabel="Download"
    }

    const navigation = null;
    if(!props.isFetching){
        return (
            <div className="serviceNav__container">
            {
                props.activeStep >=1 && props.querySequenceData && <button className="btn btn__service btn__service__back" onClick={props.back}>
                    <Icon >chevron_left</Icon>
                    Back
                    </button>
            }
            {/* {
                props.activeStep >=3 && props.activeStep <=4 && props.querySequenceData && <button className="btn btn__service btn__service__next" onClick={() => {
                    props.getMutatedSequences();
                }}>
                    Select for export
                    
                    </button>
            } */}
            {
                props.activeStep ===1 && props.querySequenceData && <button className="btn btn__service btn__service__next" onClick={() => {
                        props.submitBlast();
                }}>Blast</button>
            }
            {
                props.activeStep===2 && <button className="btn btn__service btn__service__next" onClick={() => {
                        props.loadTemplates();
                    }}>Backmutation</button>
                }
            {
                props.activeStep===4 && <button className="btn btn__service btn__service__next" onClick={() => {
                    props.selectSequencesForDownload();
                    }}>Export</button>
                }
            {/* {
                props.activeStep===3 && <button className="btn btn__service btn__service__next" onClick={() => {
                    if(props.templateData){
                        props.replaceCDR();

                    }else{
                        props.next()
                    }}}>Load</button>
                } */}
            
            
            </div>
        )
    }

    return(
        <div>
            {navigation}
        </div>

    )
}
export default serviceNavigation;