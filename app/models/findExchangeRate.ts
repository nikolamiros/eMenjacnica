interface FindExchangeRate {
  action: string;
  actionName: string;
  currency: string;
  amount: number;
  longitude: number;
  latitude: number;
  exchangeRates: ExchangeRates[];
  isLoadingExchangeRates: boolean;
  sortPreference: string;
  sortSettings: SortSettings;
}

interface ExchangeRates {
  distance: number;
  rate: number;
  exchangeOfficeName: string;
  exchangeOfficeAddress: string;
  exchangeOfficeCity: string;
  latitude: number;
  longitude: number;
}

interface SortSettings {
  bestRate: boolean;
  distance: boolean;
  openOnly: boolean;
}
