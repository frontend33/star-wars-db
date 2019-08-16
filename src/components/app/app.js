import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './app.css';
import ErrorButton from '../error-button/error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page'

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    selectedPerson: 5,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    })
  }

  OnPersonSelected = (id) => {
    this.setState( {
      selectedPerson: id
    })
  }

  componentDidCatch() {
    console.log('componentDidCatch')
    this.setState({hasError: true })
  }

  render() {

    if(this.state.hasError) {
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ?  <RandomPlanet /> : null
      return (
        <div className="stardb-app">
          <Header />
          { planet }
  
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
          <PeoplePage />
          <PeoplePage />
          <PeoplePage />
          {/* <div className="row mb2">
            <div className="col-md-6">
              <ItemList OnItemSelected={this.OnPersonSelected} />
            </div>
            <div className="col-md-6">
              <PersonDetails personId={this.state.selectedPerson}/>
            </div>
          </div> */}
        </div>
      );
    }
  }
