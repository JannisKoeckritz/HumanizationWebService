import React,  {useEffect, Component} from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';




const alertBar = (props) => {
    let alertContent = null;
    if(props.showAlert){
        alertContent = (
                <Snackbar>
                <Alert variant="outlined" severity={props.alertType}>
                    {/* <AlertTitle>{props.alertType.toUpperCase()}</AlertTitle> */}
                    {props.alertMessage}
                </Alert>
                </Snackbar>
            );
        props.resetAlert()
    }
    return (
        <div>
            {alertContent}
        </div>
    )
    }

export default alertBar;