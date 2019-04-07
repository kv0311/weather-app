import React from 'react';
import Titles from './components/Title'
import Form from './components/Form'
import Weather from './components/Weather'
const Api_Key = "8d2de98e089f1c28e1a22fc19a24ef04";
class App extends React.Component{
  constructor(){
    super()
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
    this.getWeather.bind(this)
  }
  getWeather= (e) => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault()
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`)
    .then(response =>response.json())
    .then(json=>{
      if(city && country){
        this.setState({
          temperature: json.main.temp,
          city: json.name,
          country: json.sys.country,
          humidity: json.main.humidity,
          description: json.weather[0].description,
          error: ""
      })}});
  }
  render(){
    return(
      
      <div>
        <Titles />
        <Form loadWeather={this.getWeather}></Form>
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error} />
      </div>
   )
  }
}
export default App;
