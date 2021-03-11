
import React, { Component } from "react";
import axios from "axios";
import Form from './Form';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeCards: [],
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/collections`).then((res) => {
      const data = res.data;
      this.setState({ data });
    });
   console.log(this.state.data);
  }

  filterCollection(collectionTitle) {
    let foundCollection = this.state.data.filter(
      (collection) => collection.title === collectionTitle
    );
    this.setState({
      activeCards: foundCollection[0].cards,
    });
    console.log("found collection", foundCollection);
  }

  displayCards() {
    if (this.state.activeCards.length > 0) {
      console.log("cards!", this.state.activeCards);
      return this.state.activeCards.map((card) => (
        <ul>
          <li key={card._id}>
            {card.word}: {card.definition}
          </li>
        </ul>
      ));
    }
  }

  mapCollection() {
    if (this.state.data.length > 0) {
      return this.state.data.map((collection) => (
        <button onClick={() => this.filterCollection(collection.title)}>
          {collection.title}
        </button>
      ));
    }
  }
  render() {
    return (
      <div>
        <div className="app-header">
          <h1>Flashy Flash Cards</h1>
        
        </div>
        <Form  />
      </div>
    );
  }
}
export default App;
