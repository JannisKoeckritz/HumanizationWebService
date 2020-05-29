import React from 'react'

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
                props.activeStep >=1 && props.data && <button className="btn btn__service btn__service__back" onClick={props.back}>Back</button>
            }
            {
                props.activeStep >=2 && props.activeStep <=4 && props.data && <button className="btn btn__service btn__service__next" onClick={props.next}>{nextLabel} </button>
            }
            {
                props.activeStep ===1 && props.data && <button className="btn btn__service btn__service__next" onClick={() => {
                    if(!props.blastResults){
                        props.submitBlast();}
                    else{
                        props.next()
                    }}}>BLAST</button>
            }
             {
                props.activeStep ===0 && !props.isfetching &&<button className="btn-simple btn__service btn__service__example" onClick={props.loadExample}>Load Example sequence</button>
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