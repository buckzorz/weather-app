import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {city: []}

  componentDidMount() {
    console.log('Component mounted')
    fetch('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%20in%20(%22odessa%2C%20ua%22%2C%20%22kiev%2C%20ua%22%2C%20%22lviv%2C%20ua%22%2C%20%22zhytomyr%2C%20ua%22%2C%20%22lutsk%2C%20ua%22%2C%20%22uzhhorod%2C%20ua%22%2C%20%22rivne%2C%20ua%22%2C%20%22ternopil%2C%20ua%22%2C%20%22chernivtsi%20%2Cua%22%2C%20%22ivano-frankivsk%2C%20ua%22%2C%20%22khmelnytskyi%2C%20ua%22%2C%20%22vinnytsia%2C%20ua%22%2C%20%22cherkasy%2C%20ua%22%2C%20%22kirovohrad%2C%20ua%22%2C%20%22mykolaiv%2C%20ua%22%2C%20%22kherson%2C%20ua%22%2C%20%22zaporizhia%2C%20ua%22%2C%20%22dnipropetrovsk%2C%20ua%22%2C%20%22poltava%2C%20ua%22%2C%20%22chernihiv%2C%20ua%22%2C%20%22sumy%2C%20ua%22%2C%20%22luhansk%2C%20ua%22%2C%20%22donetsk%2C%20ua%22))&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data.query.results.channel)
        this.setState({city: data.query.results.channel}, () => {
          console.log(this.state)
        })
      })
  }

  render() {
    return (
      <div className="App">
        <table>
          <caption>Weather in ukraine</caption>
          <thead>
            <tr>
              <th scope="col">City</th>
              <th scope="col">Temperature</th>
              <th scope="col">Sunrise</th>
              <th scope="col">Sunset</th>
            </tr>
          </thead>
          <tbody>
            {this.state.city.map(item => {
              return <tr>
                      <td data-label="Account">{item.location.city} </td>
                      <td data-label="Due Date">{item.item.condition.temp} F</td>
                      <td data-label="Amount">{item.astronomy.sunrise}</td>
                      <td data-label="Period">{item.astronomy.sunset}</td>
                    </tr>
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
