import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundry from "../error-boundry";
import "./app.css";
import SwapiService from "../services/swapi-service";
import DummySwapiService from "../services/dummy-swapi-service";
// import Row from "../Row";
import { SwapiServiceProvider } from "../swapi-service-context";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";

export default class App extends Component {
  // Можно легко менять апи и данные с тестовых на боевые
  // swapiService = new SwapiService()
  state = {
    showRandomPlanet: true,
    // Чтоб бы правильно изменять значения, необходимо правильно перенести наш свапи сервис
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    console.log("click");
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log("Switch to", Service.name);
      return {
        swapiService: new Service()
      };
    });
  };

  render() {
    // const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <ErrorBoundry>
        {/* Теперь любой компонент приложения будет иметь доступ к сервису котоырй передадим в SwapiServiceProvider */}
        {/* Если значение которое используем в приложении обновились, то и компоненты ниже по иерархии тоже обновятся */}
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange} />
           <RandomPlanet/>

            <PeoplePage /> 
          <PlanetsPage />
            <StarshipsPage />
            {/* <Row left={<PersonList />} right={<PersonDetails itemId={11} />} /> */}

            {/* <Row
              left={<StarshipList />}
              right={<StarshipDetails itemId={9} />}
            />

            <Row left={<PlanetList />} right={<PlanetDetails itemId={5} />} /> */}
          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
