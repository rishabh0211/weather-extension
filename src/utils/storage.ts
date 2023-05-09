import { OpenWeatherTempScale } from "./types";

export type LocalStorage = {
  cities?: string[];
  options?: LocalStorageOptions;
};

export type LocalStorageOptions = {
  tempScale: OpenWeatherTempScale;
  homeCity: string;
  hasAutoOverlay: boolean;
}

export type LocalStorageKeys = Array<keyof LocalStorage>;

export function setCitiesToLS(cities: string[]): Promise<void> {
  const value: LocalStorage = { cities };
  return new Promise((resolve) => {
    chrome.storage.local.set(value, () => resolve());
  });
};

export function getCitiesFromLS(): Promise<string[]> {
  const keys: LocalStorageKeys = ['cities'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.cities ?? []);
    });
  });
};
export function setOptionsToLS(options: LocalStorageOptions): Promise<void> {
  const value: LocalStorage = { options };
  return new Promise((resolve) => {
    chrome.storage.local.set(value, () => resolve());
  });
};

export function getOptionsFromLS(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys = ['options'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.options);
    });
  });
};