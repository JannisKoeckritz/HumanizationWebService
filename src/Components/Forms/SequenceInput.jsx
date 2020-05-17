import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Spinner from '../Loading/Loading'
import ResultItem from '../Results/ResultItem';
import Results from '../Results/Results';

export default class SequnceForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isfetching:false,
            sendRequest:false,
            jobId:"34",
            seq: "",
            data:null
        }
    }


    onSubmit = () => {
        this.setState({
            isfetching:true,
            sendRequest:true
        })
        console.log("Submit")
        return fetch("http://localhost:3000/",
        {
            method:"POST",
            headers:{
            "Accept":"application/json, text/plain",
            "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                "sequence":this.state.seq,
                "jobID":this.state.jobId})
        })
    .then((response) => response.json())
    .then((responseJson) =>{
        this.setState({
            isfetching:false,
            data:responseJson.data,
            dataRecieved:true
        })
        console.log(this.state.data)
    })
    .catch((error) => {
        throw error
    })
    }


    render(){

    let loadingBanner = null;
    if(this.state.isfetching){
        loadingBanner = <Spinner />
        return loadingBanner
    }

    let results = null;
    if(this.state.data){
        results = (
            <Results>
                {this.state.data.map((entry, index) => {
                    return <ResultItem key={index} data={entry} />
                })}
            </Results>
        );
    }

    let searchInput = null;
    if(!this.state.sendRequest){
        searchInput = (
            <div className="searchContainer">
            <TextField
                ref={(el) => { this.seq = el; }}
                onChange={(seq) => this.setState({seq})}
                defaultValue={this.state.seq}
                onChange={event => {
                    const { value } = event.target;
                    this.setState({ seq: value })
                }}
                id="outlined-multiline-static"
                label="Input your protein sequence here ..."
                multiline
                className="searchInput"
                rows={8}
                variant="outlined"
        /><br/>
        <button className="btn" onClick={() => {this.onSubmit()}}>SUBMIT</button>
        </div>
        )
        return searchInput
    }

    return (
    <div>
        {searchInput}
        {loadingBanner}
        {results}
    </div>

  );
}
}
