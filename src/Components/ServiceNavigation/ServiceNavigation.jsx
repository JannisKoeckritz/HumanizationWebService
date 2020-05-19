import React from 'react'

const serviceNavigation = (props) => {
    return (
        <div className="serviceNav__container">
        {
            props.activeStep >=1 && props.data && <button className="btn btn__service btn__service__back" onClick={props.back}>Back</button>
        }
        {
            props.activeStep >=1 && props.data && <button className="btn btn__service btn__service__next" onClick={props.next}>Next</button>
        }
        {
            props.activeStep ===0 && !props.isfetching &&<button className="btn-simple btn__service btn__service__example" onClick={props.loadExample}>Load Example sequence</button>
        }
        </div>
    )
}
export default serviceNavigation;