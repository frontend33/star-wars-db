import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
// import ItemList from '../item-list';
import ErrorBoundry from '../error-boundry';
import ItemDetails, { Record } from "../item-details/item-details";
// import Record from '../item-details';
import './app.css';
import ErrorButton from '../error-button/error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page'
import Row from '../Row'
import SwapiService from '../services/swapi-service';
import DummySwapiService from '../services/dummy-swapi-service'

import { SwapiServiceProvider } from '../swapi-service-context'



import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';


export default class App extends Component {
  // Можно легко менять апи и данные с тестовых на боевые
  swapiService = new DummySwapiService()
  // swapiService = new SwapiService()
  state = {
    showRandomPlanet: true,
    // selectedPerson: 5,
    hasError: false
  }
  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    })
  }

  // OnPersonSelected = (id) => {
  //   this.setState( {
  //     selectedPerson: id
  //   })
  // }

  // componentDidCatch() {
  //   console.log('componentDidCatch')
  //   this.setState({hasError: true })
  // }

  render() {

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople,
            getAllPlanets
          } = this.swapiService;

          // const personDetails = (
          //   <ItemDetails
          //     itemId={11}
          //     getData={getPerson}
          //     getImageUrl={getPersonImage} >
      
          //     <Record field="gender" label="Gender" />
          //     <Record field="eyeColor" label="Eye Color" />
      
          //   </ItemDetails>
          // );
      
          // const starshipDetails = (
          //   <ItemDetails
          //     itemId={5}
          //     getData={getStarship}
          //     getImageUrl={getStarshipImage}>
      
          //     <Record field="model" label="Model" />
          //     <Record field="length" label="Length" />
          //     <Record field="costInCredits" label="Cost" />
          //   </ItemDetails>
          // );
      

    return (
      <ErrorBoundry>
        {/* Теперь любой компонент приложения будет иметь доступ к сервису котоырй передадим в SwapiServiceProvider */}
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header />
            <PersonDetails itemId={11} />
            <PlanetDetails itemId={5} />
            <StarshipDetails itemId={9} />
            <PersonList/>
            <StarshipList/>
            <PlanetList/>

            {/* <Row
              left={personDetails}
              right={starshipDetails} /> */}
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}