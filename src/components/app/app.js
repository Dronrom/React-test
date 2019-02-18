import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
// import ItemList from '../item-list';
// import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import {SwapiServiceProvider} from '../swapi-service-context';

import './app.css';

import ErrorBoundry from '../error-boundry';
import ErrorIndicator from '../error-indicator';

import   {
          PersonList,
          PlanetList,
          StarshipList,
          PersonDetails,
          PlanetDetails,
          StarshipDetails
} from '../sw-components';

import ItemDetails, {Record} from '../item-details/item-details';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };
  
  componentDidCatch(){
    this.setState({ hasError:true })
  };

  render() {
    if (this.setState.hasError){
      return <ErrorIndicator />
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    const {getPerson, getStarship, getStarshipImage, getPersonImage} = this.swapiService;

    const personDetails = (
      <ItemDetails 
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}>

        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails =(
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
        <SwapiServiceProvider value={this.swapiService}>
          <div className="stardb-app">
            <Header />

            <PersonDetails itemId={11}/>

            <PlanetDetails itemId={6}/>

            <StarshipDetails itemId={10}/>
            
              <PersonList />
              
              <StarshipList />

              <PlanetList />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  };
};