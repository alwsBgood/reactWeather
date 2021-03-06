import React, { Component } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/journal/bootstrap.css";

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Kiev", cityID: "703448" },
  { name: "Mukachevo", cityID: "700646" },
  { name: "Odessa", cityID: "698740" },
  { name: "Donetsk", cityID: "709717" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const cityID = this.props.cityID;
    const URL = "http://api.openweathermap.org/data/2.5/weather?id=" +
      cityID +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current Temperature: {weatherData.main.temp}°</p>
        <p>Current Pressure: {weatherData.main.pressure}mm.hr.st</p>
        <p>Clouds: {weatherData.clouds.all}%</p>
        <p>Wind Speed: {weatherData.wind.speed} m/hr</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              React Simple Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} cityID={PLACES[activePlace].cityID} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;