import { store } from "../store/configureStore";

export const transformExchangeRates = () => {
  const findExchangeRate = store.getState().findExchangeRate;

  console.log("Ovo saljem na servis", findExchangeRate);

  return {
    action: findExchangeRate.action,
    currency: findExchangeRate.currency,
    amount: findExchangeRate.amount,
    latitude: findExchangeRate.latitude,
    longitude: findExchangeRate.longitude,
  };
};

export const exchangeRatesResponseToData = (response: any) => {
  try {
    const exchangeRates: ExchangeRates[] = [];

    response.map((item: any, index: number) => {
      exchangeRates.push({
        distance: item.distance,
        rate: item.rate,
        exchangeOfficeName: item.exchangeOfficeName,
        exchangeOfficeAddress: item.exchangeOfficeAddress,
        exchangeOfficeCity: item.exchangeOfficeCity,
        latitude: item.latitude,
        longitude: item.longitude,
      });
    });

    console.log("Vraceno sa servisa: ", exchangeRates);

    return exchangeRates;
  } catch (error) {
    console.error("Error in exchangeRatesResponseToData:", error);
    throw error;
  }
};
