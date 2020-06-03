import React, { Component } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import HumanizationService from '../../Components/HumanizationService/HumanizationService';
import Contact from '../../Components/Contact/Contact';

class App extends Component {
  render() {

    return (
      <div>
        <Header />
        <HumanizationService />
        <Contact/>
        <Footer/>
      </div>
    );
  }
}

export default App;
