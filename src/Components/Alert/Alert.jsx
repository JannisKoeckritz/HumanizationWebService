import React,  {useEffect, Component} from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';




const alertBar = (props) => {
    let alertContent = null;
    if(props.showAlert){
        alertContent = (
                <Alert variant="filled" severity={props.alertType}>
                    {props.alertMessage}
                </Alert>
            );
        props.resetAlert()
    }
    return (
        <div className="alert-container">
            {alertContent}
        </div>
    )
    }

export default alertBar;