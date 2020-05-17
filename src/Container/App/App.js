import React, { Component, setState} from 'react';
import Progress from '../../Components/Progress/Progress';
import SequnceForm from '../../Components/Forms/SequenceInput';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

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
        <div className="contentContainer">
          <Progress 
            form={<SequnceForm/>}
          />
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
