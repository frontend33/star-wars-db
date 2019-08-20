import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import ErrorBoundry from '../error-boundry';
import ItemDetails from '../item-details';
import Record from '../item-details';
import './app.css';
import ErrorButton from '../error-button/error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page'
import Row from '../Row'
import SwapiService from '../services/swapi-service';


export default class App extends Component {
  swapiService = new SwapiService()
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

    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

    const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage } = this.swapiService;

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
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />

          <Row
            left={personDetails}
            right={starshipDetails} />
        </div>
      </ErrorBoundry>
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

