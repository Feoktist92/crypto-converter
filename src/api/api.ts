import axios, { AxiosResponse } from 'axios';

const API_KEY = 'CG-nkwfj54bwccXEcZVp96td4YZ';
const BASE_URL = 'https://api.coingecko.com/api/v3/';

interface CurrencyRatesResponse {
    [key: string]: {
        usd: number;
    };
}

interface CurrencyRate {
    usd: number;
}

interface CurrencyRatesResponse {
    bitcoin: CurrencyRate;
    ethereum: CurrencyRate;
    tether: CurrencyRate;
}

export const fetchCurrencyRates = async (): Promise<CurrencyRatesResponse> => {
    try {
        const response: AxiosResponse<CurrencyRatesResponse> = await axios.get(
            `${BASE_URL}/simple/price`,
            {
                params: {
                    ids: 'tether,bitcoin,ethereum',
                    vs_currencies: 'usd',
                },
                headers: {
                    'x-cg-demo-api-key': API_KEY,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching currency rates:', error);
        return {
            bitcoin: { usd: 0 },
            ethereum: { usd: 0 },
            tether: { usd: 0 },
        };
    }
};
