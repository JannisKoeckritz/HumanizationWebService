import React, { Component, setState} from 'react';
import './css/main.scss';
import Stepper from './Components/Stepper';
import SequnceForm from './Components/SequenceForm';
import Header from './Components/Header';
import Footer from './Components/Footer';

class App extends Component {
  render() {

    const fetchData = async () => {
    const response = await fetch("http://localhost:3000/",
    {
        method:"POST",
        headers:{
        "Accept":"application/json, text/plain",
        "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            "sequence":"ABDHJFVJZDIÖUFÖD",
            "jobID":34})
    })
    const data = await response.json();
    console.log(data)
  }

    return (
      <div>
        <Header />
        <div className="content">
          <Stepper />
          <SequnceForm />
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
