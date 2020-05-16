import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Spinner from './Loading'
import TableItem from './TableItem';
import Results from './Results';

const mystyles = makeStyles((theme)=> ({
    input: {
        width: '90%',
        margin: '20px'
    }
}));

export default class SequnceForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isfetching:false,
            sendRequest:false,
            jobId:"34",
            seq: "message",
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

    // let arrayData = null;
    // if(this.state.dataRecieved){
    //     let new_ds = this.state.data.map((entry,index) => {amino_acid:entry.amino_acid         
    //     })
    // }

    let loadingBanner = null;
    if(this.state.isfetching){
        loadingBanner = <Spinner />
        return loadingBanner
    }

    let results = (<div style={{backgroundColor:"red"}}><TableItem amino_acid={"No results"} /></div>);
    if(this.state.data){
        //console.log("Rendering results", this.state.data)
        results = (
            <Results>
                {this.state.data.map(entry => {
                    return <TableItem amino_acid={entry.amino_acid} />
                })}
            </Results>
        );
    }

    let searchInput = null;
    if(!this.state.sendRequest){
        searchInput = (
            <div>
            <TextField
                ref={(el) => { this.seq = el; }}
                onChange={(seq) => this.setState({seq})}
                defaultValue={this.state.seq}
                onChange={event => {
                    const { value } = event.target;
                    this.setState({ seq: value })
                }}
                id="outlined-multiline-static"
                label="Protein sequence"
                multiline
                rows={8}
                style={{width:"90%"}}
                variant="outlined"
        />
        <Button onClick={() => {this.onSubmit()}}>SUBMIT</Button>
        </div>
        )
        return searchInput
    }

    return (
    <div className='container'>
        {searchInput}
        {loadingBanner}
        {results}
    </div>

  );
}
}
