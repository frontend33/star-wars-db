import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import './app.css';
import ErrorButton from '../error-button/error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page'
import SwapiService from '../services/swapi-service';

export default class App extends Component {
  swapiService = new SwapiService
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
          {/* <PeoplePage /> */}
          {/* <PeoplePage /> */}
          <div className="row mb2">
            <div className="col-md-6">
              {/* При клике на компонент получаем id и изменяем state selectedPerson */}
              <ItemList OnItemSelected={this.OnPersonSelected} 
              /*
              Компонент может использовать функцию для получения данных
              кроме того компонент может использовать внешнюю функцию для того что бы отрисовать его,
              именно для использования внешней функции для рендеринга построен патерн проектирования - Render функция 
              Функции которые мы передаем компоненту могут быть не только обработчиками событий
              Функция может инкапсулировать получение данных и компонент становится не зависимым от источника
              */  

              getData={this.swapiService.getAllPlanets}
              // Передаем функцию которая занимается рендерингом какой либо части компонента
              // или всего компонента паттерн называется рендер функция
              renderItem={(item) => (<span>{item.name} <button>!</button></span>)}
              />
            </div>
            <div className="col-md-6">
              {/* Получаем id из item-list и передаем id в компонент  PersonDetails */}
              <PersonDetails personId={this.state.selectedPerson}/>
            </div>
          </div>

          <div className="row mb2">
            <div className="col-md-6">
              <ItemList OnItemSelected={this.OnPersonSelected} 
              getData={this.swapiService.getAllStarships}
              renderItem={(item) => item.name}
              
              />
            </div>
            <div className="col-md-6">
              <PersonDetails personId={this.state.selectedPerson}/>
            </div>
          </div>

        </div>
      );
    }
  }
