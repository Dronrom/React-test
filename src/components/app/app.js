import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import PeoplePage from '../pages/people-page';
import PlanetPage from '../pages/planet-page';
import StarshipPage from '../pages/starship-page'

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

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
    swapiService: new SwapiService()
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service()
      };
    })
  }
  
  componentDidCatch(){
    this.setState({ hasError:true })
  };

  render() {
    if (this.setState.hasError){
      return <ErrorIndicator />
    }

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header onServiceChange={this.onServiceChange}/>

            <RandomPlanet /> 

            <PeoplePage />

            <PlanetPage />

             <StarshipPage />

          </div>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  };
};