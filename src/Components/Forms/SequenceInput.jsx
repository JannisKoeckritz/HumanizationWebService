import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Spinner from '../Loading/Loading'
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const ColorCheckBox = withStyles({
    root: {
      color: "#004777",
      '&$checked': {
        color: "#004777",
      },
    },
  })((props) => <Checkbox color="default" {...props} />);

const sequnceForm = (props) => {

    let loadingBanner = null;
    if(props.isfetching){
        loadingBanner = <Spinner />
        return loadingBanner
    }

    let searchInput = null;
    if(!props.sendRequest){
        searchInput = (
            <div className="searchContainer page-box">
                <h2 className="page-title">Enter sequence</h2>
                <p className="page-information">Please enter your sequence in the form below.</p>
                <TextField
                    value={props.querySequence}
                    onChange={event => {
                        const { value } = event.target;
                        props.seqChangeHandler(value)
                    }}
                    id="outlined-multiline-static"
                    label="Input your protein sequence here ..."
                    multiline
                    className="searchInput"
                    rows={9}
                    variant="outlined"
            />
            <div className="link-container link-container-between">
            <span>
            <FormControlLabel
                control={
                <ColorCheckBox
                    name="germline-validation"
                />
                }
                label="Use germline sequences only"
            />
            </span>
            <span className="link-container">
                <a className="link" onClick={() => props.loadExample()}>Load example</a>
                <button className="btn" onClick={props.onSubmit}>SUBMIT</button>
            </span>
            </div>
        </div>
        )
        return searchInput
    }

    return (
    <div>
        {searchInput}
    </div>

  );
}
export default sequnceForm;
