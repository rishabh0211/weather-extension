import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import 'fontsource-roboto';
import { Paper, IconButton, InputBase, Box, Grid } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

import WeatherCard from './WeatherCard'
import { getCitiesFromLS, setCitiesToLS, getOptionsFromLS, setOptionsToLS, LocalStorageOptions } from '../utils/storage';

import './popup.css'

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState(['meerut', 'bangalore', 'error']);
  const [cityInput, setCityInput] = useState('');
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getCitiesFromLS().then(cities => setCities(cities));
    getOptionsFromLS().then(options => setOptions(options));
  }, []);

  const handleAddCity = () => {
    if (cityInput === '') return;
    const updatedCities = [...cities, cityInput];
    setCitiesToLS(updatedCities)
      .then(() => {
        setCities([...cities, cityInput]);
        setCityInput('');
      })
  };

  const handleDeleteCity = (index: number) => {
    const updatedCities = cities.filter((_, idx) => idx !== index);
    setCitiesToLS(updatedCities)
      .then(() => {
        setCities(updatedCities);
      });
  };

  const handleTempScaleChange = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric'
    };
    setOptionsToLS(updatedOptions).then(() => setOptions(updatedOptions));
  }

  if (!options) {
    return <div>Getting options!</div>
  }

  return (
    <Box mx="8px" my="16px" paddingBottom="16px">
      <Paper>
        <Box px="15px" py="5px">
          <InputBase
            placeholder='Enter city'
            value={cityInput}
            onChange={e => setCityInput(e.target.value)}
          />
          <IconButton onClick={handleAddCity}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={handleTempScaleChange}>
            {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
          </IconButton>
        </Box>
      </Paper>
      {!!options.homeCity && (
        <WeatherCard
          city={options.homeCity}
          tempScale={options.tempScale}
        />
      )}
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleDeleteCity(index)}
          tempScale={options.tempScale}
        />
      ))}
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
