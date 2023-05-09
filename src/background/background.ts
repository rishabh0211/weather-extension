import { fetchWeatherData } from '../utils/api';
import { getCitiesFromLS, getOptionsFromLS, setCitiesToLS, setOptionsToLS, } from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  setCitiesToLS([]);
  setOptionsToLS({
    tempScale: 'metric',
    homeCity: 'Meerut',
    hasAutoOverlay: false
  });

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add city to weather extension',
    id: 'add-city'
  });

  chrome.alarms.create({
    periodInMinutes: 1 / 60
  });
});

chrome.contextMenus.onClicked.addListener((event) => {
  getCitiesFromLS().then(cities => {
    setCitiesToLS([...cities, event.selectionText])
  })
});

chrome.alarms.onAlarm.addListener((alarm) => {
  getOptionsFromLS().then(options => {
    if (!options.homeCity) return;
    fetchWeatherData(options.homeCity, options.tempScale)
      .then(data => {
        const temp = Math.round(data.main.temp);
        const scale = options.tempScale === 'metric' ? '\u2103' : '\u2109';
        chrome.action.setBadgeText({
          text: `${temp}${scale}`
        })
      })
  })
})


