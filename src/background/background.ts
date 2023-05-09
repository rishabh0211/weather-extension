import { setCitiesToLS, setOptionsToLS } from '../utils/storage'

chrome.runtime.onInstalled.addListener(() => {
  setCitiesToLS([]);
  setOptionsToLS({
    tempScale: 'metric',
    homeCity: 'Meerut',
  });
});
