import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import CurrencyInput from './components/CurrencyInput';
import { fetchCurrencyRates } from './api/api';
import SwapIcon from './assets/swap.svg';

import './styles/App.css';

interface CurrencyRates {
    [key: string]: number;
}

const App: React.FC = () => {
    const [currencyRates, setCurrencyRates] = useState<CurrencyRates>({
        usdt: 0,
        btc: 0,
        eth: 0,
    });
    const [fromCurrency, setFromCurrency] = useState('usdt');
    const [toCurrency, setToCurrency] = useState('btc');
    const [fromAmount, setFromAmount] = useState<number | null>(null);
    const [toAmount, setToAmount] = useState<number | null>(null);

    useEffect(() => {
        const fetchAndSetRates = async () => {
            const rates = await fetchCurrencyRates();
            setCurrencyRates({
                usdt: rates.tether.usd,
                btc: rates.bitcoin.usd,
                eth: rates.ethereum.usd,
            });
        };
        fetchAndSetRates();
    }, []);

    const handleFromAmountChange = (value: number | null) => {
        if (value !== null) {
            setFromAmount(value);
            const exchangeRate =
                currencyRates[fromCurrency] / currencyRates[toCurrency];
            const toAmount = +(value * exchangeRate).toFixed(3);
            setToAmount(toAmount);
        }
    };

    const handleToAmountChange = (value: number | null) => {
        if (value !== null) {
            setToAmount(value);
            const exchangeRate =
                currencyRates[fromCurrency] / currencyRates[toCurrency];
            const fromAmount = +(value / exchangeRate).toFixed(3);
            setFromAmount(fromAmount);
        }
    };

    const handleFromCurrencyChange = (value: string) => {
        setFromCurrency(value);
        const exchangeRate = currencyRates[toCurrency] / currencyRates[value];
        setFromAmount(
            toAmount !== null ? +(toAmount * exchangeRate).toFixed(3) : null
        );
    };

    const handleToCurrencyChange = (value: string) => {
        setToCurrency(value);
        const exchangeRate = currencyRates[fromCurrency] / currencyRates[value];
        setToAmount(
            fromAmount !== null ? +(fromAmount * exchangeRate).toFixed(3) : null
        );
    };

    return (
        <>
            <Typography.Title level={2} className='title'>
                Crypto Converter
            </Typography.Title>
            <div className='container'>
                <CurrencyInput
                    value={fromAmount}
                    currency={fromCurrency}
                    onChange={handleFromAmountChange}
                    onCurrencyChange={handleFromCurrencyChange}
                />
                <SwapIcon className='swap' />
                <CurrencyInput
                    value={toAmount}
                    currency={toCurrency}
                    onChange={handleToAmountChange}
                    onCurrencyChange={handleToCurrencyChange}
                />
            </div>
        </>
    );
};

export default App;
