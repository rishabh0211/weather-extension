import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, CardActions, Button } from '@material-ui/core';

import { fetchWeatherData } from '../../utils/api'
import { OpenWeatherTempScale, WeatherApiResponse } from '../../utils/types';

type WeatherCardProps = {
  city: string;
  onDelete?: () => void;
  tempScale: OpenWeatherTempScale,
};

type WeatherCardState = 'loading' | 'error' | 'ready';

const WeatherCardContainer: React.FC<{
  children: React.ReactNode,
  onDelete?: () => void,
}> = ({
  children,
  onDelete
}) => {
    return (
      <Box mx={"4px"} my={"16px"}>
        <Card>
          <CardContent>
            {children}
          </CardContent>
          <CardActions>
            {onDelete && (
              <Button color='secondary' onClick={onDelete}>Delete</Button>
            )}
          </CardActions>
        </Card>
      </Box>
    );
  };

const WeatherCard: React.FC<WeatherCardProps> = ({ city, onDelete, tempScale }) => {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('loading');

  useEffect(() => {
    fetchWeatherData(city, tempScale)
      .then(data => {
        setWeatherData(data);
        setCardState('ready');
      })
      .catch(e => {
        setCardState('error');
      });
  }, [city, tempScale]);

  if (cardState == 'loading' || cardState == 'error') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant='body1'>
          {
            cardState === 'loading' ?
              'Loading...'
              :
              'Error: Could not retrieve weather data for this city.'
          }
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant='h5'>{city}</Typography>
      <Typography variant='body1'>{Math.round(weatherData.main.temp)}</Typography>
      <Typography variant='body1'>Feels like: {Math.round(weatherData.main.feels_like)}</Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard