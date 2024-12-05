export interface AppState {
  locale?: string | null;
  apiHost: string;
  apiKey?: string | null;
  coreRegistryMode: boolean;
  configFileLoaded: boolean;
  isDarkTheme: boolean;
  isCoreRegistryUiApp: boolean;
}

const initialState: AppState = {
  locale: null,
  apiHost: 'http://localhost:31311',
  apiKey: null,
  coreRegistryMode: true,
  configFileLoaded: false,
  isDarkTheme: false,
  isCoreRegistryUiApp: false,
};

export default initialState;
