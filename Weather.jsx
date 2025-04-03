/*import React, { useEffect, useState } from 'react';
import './Weather.css'; // Ensure correct spelling
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
    const inputRef =useRef()
    const [weatherData,setWeatherData]=useState(false)
    const allicons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,



    }
    const search =async(city)=>{
        try {
            const url='https://api.openweathermap.org/data/2.5/weather?q=${city }&units=metric&appid=${import.meta.env.VITE_APP_ID}';

          const response= await fetch(url);
          const data=await response.json();
          console.log(data);
          const icon=allicons[data.weather[0].icon] || clear_icon;
          setWeatherData({
           humidity:data.main.humidity,
           windspeed:data.wind.speed,
           temperature:Math.floor(data.main.temp),
           location:data.name,
           icon:icon


          })
        } catch (error) {
            
        }

    }
    useEffect(()=>{
        search("London");
    },[])
  return (
    <div className="weather-container">
     <div className="search-bar">
        <input ref={inputRef}type="text" placeholder='search'/>
        <img src={search_icon} alt="" />
     </div>
     <img src={weatherData.icon} alt="" onclick={()=>search(inputRef.current.value)} className='weather-icon'/>
     <p className='temperature'>{weatherData.temperature} °C</p>
     <p className='location' >{weatherData.location}</p>
     <div className="weather-data">
        <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
                <p>{weatherData.humidity}</p>
                <span>humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={wind_icon} alt="" />
            <div>
                <p>{weatherData.windspeed}km/h</p>
                <span>wind speed</span>
            </div>
        </div>

     </div>
    </div>
  );
}

export default Weather;*/

/*import React, { useEffect } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {
    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch data");
            const data = await response.json();
            console.log("Weather Data:", data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        search("london");
    }, []);

    return (
        <div className="weather-container">
            <div className="search-bar">
                <input type="text" placeholder="Search"/>
                <img src={search_icon} alt="Search" />
            </div>
            <img src={clear_icon} alt="Weather Icon" className="weather-icon"/>
            <p className="temperature">16 °C</p>
            <p className="location">London</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="Humidity"/>
                    <div>
                        <p>91%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="Wind"/>
                    <div>
                        <p>3.6km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;*/
import React, { useEffect, useState, useRef } from "react";
import "./Weather.css"; 
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if(city===""){
        alert("enter City name");
        return;

    }
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    
    setError(""); // Clear any previous errors

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
       if(!response.ok){
        alert(data.message);
        return;
       }
      
      if (data.cod !== 200) {
        setError("City not found! Try again.");
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      // Clear input after search
      inputRef.current.value = "";
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Something went wrong! Try again.");
    }
  };

  useEffect(() => {
    search("London"); // Default city on load
  }, []);

  return (
    <div className="weather-container">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Enter city name..." />
        <img
          src={search_icon}
          alt="Search"
          onClick={() => search(inputRef.current.value)} // Trigger search on click
          style={{ cursor: "pointer" }}
        />
      </div>
    


      {error && <p className="error-message">{error}</p>} {/* Display errors */}

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature} °C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windspeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;



