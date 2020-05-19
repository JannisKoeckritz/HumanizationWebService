import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import HumanizationService from '../../Components/HumanizationService/HumanizationService';

class App extends Component {
  render() {

    return (
      <div>
        <Header />
        <HumanizationService />
        <Footer/>
      </div>
    );
  }
}

export default App;
