import React, {Component} from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom'

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
import { StarshipDetails } from '../sw-components';

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
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange}/>

              <RandomPlanet /> 
             <Route path="/" 
                    render={() => <h2>Welcome to StarDB</h2>}
                    exact/>
             <Route path="/people" 
                    render={() => <h2>People</h2>}
                    exact/>
             <Route path="/people" component={PeoplePage}/>
             <Route path="/planet" component={PlanetPage}/>
             <Route path="/starship" component={StarshipPage} exact/>
             <Route path="/starship/:id" 
                    render={({ match }) =>{
                      const { id } = match.params
                      return <StarshipDetails itemId={id}/>
                    }}/>
          </div>
          </Router> 
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  };
};