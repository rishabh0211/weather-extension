// TODO: content script
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card } from '@material-ui/core';
import WeatherCard from '../components/WeatherCard';

import './contentScript.css';
import { getOptionsFromLS, LocalStorageOptions } from '../utils/storage';
import { Messages } from '../utils/message';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    getOptionsFromLS().then(options => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  useEffect(() => {
    let listenerFn = function (msg: Messages) {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    };
    chrome.runtime.onMessage.addListener(listenerFn);

    return () => chrome.runtime.onMessage.removeListener(listenerFn)
  }, [isActive]);

  if (!options) return null;

  return (
    <>
      {isActive && (
        <Card className='overlay-card'>
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
        </Card>
      )}
    </>
  )
}

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);
