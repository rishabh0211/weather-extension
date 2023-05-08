import React, { useEffect } from 'react';
import { fetchWeatherData } from '../../utils/api'

type WeatherCardProps = {
  city: string;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
  useEffect(() => {
    fetchWeatherData(city)
      .then(data => console.log(data))
      .catch(e => console.error(e));
  }, [city]);

  return (
    <div>{city}</div>
  )
}

export default WeatherCard