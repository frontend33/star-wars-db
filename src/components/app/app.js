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

import {
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
  PersonList,
  PlanetList,
  StarshipList
} from '../sw-components';


export default class App extends Component {
  swapiService = new SwapiService()
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

          const personDetails = (
            <ItemDetails
              itemId={11}
              getData={getPerson}
              getImageUrl={getPersonImage} >
      
              <Record field="gender" label="Gender" />
              <Record field="eyeColor" label="Eye Color" />
      
            </ItemDetails>
          );
      
          const starshipDetails = (
            <ItemDetails
              itemId={5}
              getData={getStarship}
              getImageUrl={getStarshipImage}>
      
              <Record field="model" label="Model" />
              <Record field="length" label="Length" />
              <Record field="costInCredits" label="Cost" />
            </ItemDetails>
          );
      

    return (
      <div>
        <div className="stardb-app">
          <Header />
          <PersonDetails itemId={11} />

          <PlanetDetails itemId={5} />

          <StarshipDetails itemId={9} />

          <PersonList>
            {({name}) => <span>{name}</span>}
          </PersonList>

          <StarshipList>
            {({name}) => <span>{name}</span>}
          </StarshipList>

          <PlanetList>
            {({name}) => <span>{name}</span>}
          </PlanetList>

          {/* <Row
            left={personDetails}
            right={starshipDetails} /> */}
        </div>
      </div>
    );
  }
}

//     return (
//       <div className="stardb-app">
//         <Header />
//         { planet }

//         <div className="row mb2 button-row">
//           <button
//             className="toggle-planet btn btn-warning btn-lg"
//             onClick={this.toggleRandomPlanet}>
//             Toggle Random Planet
//           </button>
//           <ErrorButton />
//         </div>

//         <PeoplePage />

//         {/* <Row>
          
//         </Row> */}

//        <div className="row mb2">
//           <div className="col-md-6">
//             <ItemList
//               onItemSelected={this.onPersonSelected}
//               getData={this.swapiService.getAllPlanets} />
//           </div>
//           <div className="col-md-6">
//             <ItemDetails personId={this.state.selectedPerson} />
//           </div>
//         </div>

//        <div className="row mb2">
//           <div className="col-md-6">
//             {personDetails}
//             {/* <personDetails></personDetails> */}
//             {/* <ItemList
//               onItemSelected={this.onPersonSelected}
//               getData={this.swapiService.getAllStarships} /> */}
//           </div>
//           <div className="col-md-6">
//             <ItemDetails personId={this.state.selectedPerson} />
//           </div>
//         </div> 

//       </div>
//     );
//   }
// }

