import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
// import ItemList from '../item-list';
// import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';

import './app.css';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';
import Row from '../row/row';
import ItemDetails from '../item-details';

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

    const personDetails =(
      <ItemDetails 
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}/>
    );

    const starshipDetails =(
      <ItemDetails 
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage} />
    );

    return (
      <div className="stardb-app">
        <Header />
        {/* {planet}

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}
         >
          Toggle Random Planet
        </button>
        <ErrorButton />

        <PeoplePage /> */}
      
        <Row 
          left={personDetails}
          right={starshipDetails}
        />
      </div>
    );
  };
};