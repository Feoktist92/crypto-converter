import { InputNumber, Select } from 'antd';
import TetherIcon from '../assets/tether.svg';
import BitcoinIcon from '../assets/bitcoin.svg';
import EthereumIcon from '../assets/ethereum.svg';

interface Props {
    value: number | null;
    currency: string;
    onChange: (value: number | null) => void;
    onCurrencyChange: (value: string) => void;
}

const CurrencyInput: React.FC<Props> = ({
    value,
    currency,
    onChange,
    onCurrencyChange,
}) => {
    return (
        <div>
            <InputNumber
                className='input'
                min={0}
                placeholder='Amount'
                size='large'
                value={value}
                onChange={onChange}
            />
            <Select
                className='select'
                size='large'
                value={currency}
                onChange={onCurrencyChange}
            >
                <Select.Option value='usdt'>
                    <TetherIcon className='icon' /> USDT
                </Select.Option>
                <Select.Option value='btc'>
                    <BitcoinIcon className='icon' /> BTC
                </Select.Option>
                <Select.Option value='eth'>
                    <EthereumIcon className='icon' /> ETH
                </Select.Option>
            </Select>
        </div>
    );
};

export default CurrencyInput;
