import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Box, Button, Card, CardContent, Grid, Switch, TextField, Typography } from '@material-ui/core';
import { LocalStorageOptions, getOptionsFromLS, setOptionsToLS } from '../utils/storage';

import 'fontsource-roboto';
import './options.css'

type FormState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions>(null);
  const [formState, setFormState] = useState<FormState>('ready');

  useEffect(() => {
    getOptionsFromLS()
      .then(options => setOptions(options));
  }, []);

  const handleHomeCityChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { value } = e.target;
    setOptions({
      ...options,
      homeCity: value
    });
  };

  const handleSaveOptions: React.MouseEventHandler<HTMLButtonElement> = () => {
    setFormState('saving');
    setOptionsToLS(options).then(() => {
      setTimeout(() => {
        setFormState('ready');
      }, 1000);
    });
  }

  const handleOverlayChange = (shouldDisplayOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay: shouldDisplayOverlay
    });
  };

  if (!options) return null;

  const isSaving = formState === 'saving';
  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction='column' spacing={4}>
            <Grid item>
              <Typography variant='h4'>
                Weather Extension Options
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                Home city name
              </Typography>
              <TextField
                placeholder='Enter a home city name'
                fullWidth
                value={options.homeCity}
                onChange={handleHomeCityChange}
                disabled={isSaving}
              />
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                Overlay Card on Web Page
              </Typography>
              <Switch
                color='primary'
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => handleOverlayChange(checked)}
                disabled={isSaving}
              />
            </Grid>
            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={handleSaveOptions}
                disabled={isSaving}
              >
                {formState === 'ready' ? 'Save' : 'Saving'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
