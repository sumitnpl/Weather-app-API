import React, { useState } from 'react'
import './Weatherapp.scss'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
import night_icon from '../Assets/moon_6711119.png'

const Weatherapp = () => {
  //write your api key here
  let api_key="your_api_key";
  const [wicon,setwicon] = useState(cloud_icon);

  const search =async (e)=>{
    e.preventDefault();
    const element= document.getElementsByClassName("cityInput")
    if (element[0].value === ""){
      return 0;
    }
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    let response = await fetch(url);
    let data = await response.json();
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");
    const humidity =document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-speed");
    if (data.weather[0].icon == "01d"){
      setwicon(clear_icon);
    }else if (data.weather[0].icon == "01n"){
      setwicon(night_icon)
    }else if(data.weather[0].icon == "02d"|| data.weather[0].icon == "02n"){
      setwicon(cloud_icon);
    }else if(data.weather[0].icon == "04d"|| data.weather[0].icon == "04n"){
      setwicon(drizzle_icon);
    }else if(data.weather[0].icon == "09d"|| data.weather[0].icon == "09n"){
      setwicon(rain_icon)
    }
    temperature[0].innerHTML= data.main.temp + "°C";
    location[0].innerHTML= element[0].value;
    humidity[0].innerHTML = data.main.humidity + "%";
    wind[0].innerHTML = data.wind.speed + "km/h";
    
    
  }
  return (
    <div className='container'>
      <form onSubmit={(e)=>{search(e)}}>
          <input type='text' className='cityInput' placeholder='Search Here for City'
        />
          <button className='search-icon' type='submit'>
            <img src={search_icon} />
          </button>
       </form>
      <div className='weather-image'>
      <img style={{ width: "120px", marginTop: "20px" }} src={wicon} />
      </div>
      <div className='weather-temp'>24°c</div>
      <div style={{ textTransform: "capitalize"}} className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} className='icon' />
          <div className='data'>
            <div className='humidity-percent'>67%</div>
            <div className='text'>Humidity</div>
          </div>
          </div>
          <div className='element'>
          <img src={wind_icon} className='icon' />
          <div className='data'>
            <div className='wind-speed'>18 km/h</div>
            <div className='text'>Wind Speed</div>
          </div>

        </div>
      </div>
    
    </div>
  )
}

export default Weatherapp;