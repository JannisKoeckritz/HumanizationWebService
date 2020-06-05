import React from 'react'
import Icon from '@material-ui/core/Icon';

const serviceNavigation = (props) => {

    let nextLabel = "Next";
    // if(props.activeStep===1&&props.blast_results){
    //     nextLabel="Blast"
    // }
    if(props.activeStep===2){
        nextLabel="Backmutation"
    }
    if(props.activeStep===3){
        nextLabel="Export"
    }
    if(props.activeStep===4){
        nextLabel="Download"
    }

    const navigation = null;
    if(!props.isfetching){
        return (
            <div className="serviceNav__container">
            {
                props.activeStep >=1 && props.data && <button className="btn btn__service btn__service__back" onClick={props.back}>
                    <Icon >chevron_left</Icon>
                    Back
                    </button>
            }
            {
                props.activeStep >=3 && props.activeStep <=4 && props.data && <button className="btn btn__service btn__service__next" onClick={props.next}>
                    {nextLabel}
                    <Icon >chevron_right</Icon>
                    
                    </button>
            }
            {
                props.activeStep ===1 && props.data && <button className="btn btn__service btn__service__next" onClick={() => {
                    if(!props.blastResults){
                        props.submitBlast();}
                    else{
                        props.next()
                    }}}>Blast</button>
            }
            {
                props.activeStep===2 && <button className="btn btn__service btn__service__next" onClick={() => {
                    if(!props.results){
                        props.fetchDB();

                    }else{
                        props.next()
                    }}}>Backmutation</button>
                }
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