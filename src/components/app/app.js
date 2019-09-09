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

import { BrowserRouter as Router, Route } from "react-router-dom";
import { StarshipDetails } from "../sw-components";

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
    return (
      <ErrorBoundry>
        {/* Теперь любой компонент приложения будет иметь доступ к сервису котоырй передадим в SwapiServiceProvider */}
        {/* Если значение которое используем в приложении обновились, то и компоненты ниже по иерархии тоже обновятся */}
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Route path="/" exact render={() => <h2>Welcome to starDB</h2>} />
              <Route path="/people" render={() => <h2>People</h2>}></Route>
              <Route path="/people" component={PeoplePage}></Route>
              <Route path="/planets" component={PlanetsPage}></Route>
              <Route path="/starships" exact component={StarshipsPage} />
              <Route
                path='/starships/:id'
                // В рендер функцию роутер передаст объект с тремя специальными параметрами 
                render={({match}) => {
                  const { id } = match.params
                  console.log('params',match)
                  console.log('params',match.params)
                  return <StarshipDetails itemId={id}/>
                }}
              />
              {/* <Row left={<PersonList />} right={<PersonDetails itemId={11} />} /> */}
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
