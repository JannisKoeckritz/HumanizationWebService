import React from 'react';
import TextField from '@material-ui/core/TextField';
import Spinner from '../Loading/Loading'

const sequnceForm = (props) => {

    let loadingBanner = null;
    if(props.isfetching){
        loadingBanner = <Spinner />
        return loadingBanner
    }

    let searchInput = null;
    if(!props.sendRequest){
        searchInput = (
            <div className="searchContainer">
            <TextField
                //ref={(el) => { props.querySequence = el; }}
                //onChange={(seq) => props.seqChangeHandler(seq)}
                value={props.querySequence}
                //defaultValue={props.querySequence}
                onChange={event => {
                    const { value } = event.target;
                    props.seqChangeHandler(value)
                }}
                id="outlined-multiline-static"
                label="Input your protein sequence here ..."
                multiline
                className="searchInput"
                rows={8}
                variant="outlined"
        />
               
        <button className="btn" onClick={props.onSubmit}>SUBMIT</button>
        </div>
        )
        return searchInput
    }

    return (
    <div>
        {searchInput}
        {loadingBanner}
    </div>

  );
}
export default sequnceForm;
