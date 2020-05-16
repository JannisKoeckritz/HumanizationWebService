import React, {Component} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default class LabeledCheckbox extends Component {
    constructor(props){
        super(props);
        this.state = this.state.bind(this)
    }
    render(){

  const handleChange = (event) => {
   this.setState({ ...this.state, [event.target.name]: event.target.checkedHuman });
  };

  return (
    <FormGroup row >
      <FormControlLabel
        control={<Checkbox checked={this.state.checkedHuman} onChange={handleChange} name="Human sequence only" />}
        label="Secondary"
      />
    </FormGroup>
  );
}}