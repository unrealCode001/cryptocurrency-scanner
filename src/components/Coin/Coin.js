import React from 'react';
import './Coin.scss'

const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  return (
    
    <div className='coin'>
        <div className='coin__row'>

            <div className='coin__each'>
                <img className='coin__pic' src={image} alt='crypto' />
                <h1 className='coin__name'>{name}</h1>
                <p className='coin__text'>{symbol}</p>
            </div>

            <div className='coin__data'>
                <p className='coin__price'>${price}</p>
                <p className='coin__volume'>${volume.toLocaleString()}</p>
                {priceChange < 0 ? (
                    <p className='coin__red'>{priceChange.toFixed(2)}%</p>
                ) : (
                    <p className='coin__green'>{priceChange.toFixed(2)}%</p>
                )}
                <p className='coin__marketcap'>
                    Mkt Cap: ${marketcap.toLocaleString()}
                </p>
            </div>
            
        </div>
    </div>
  );
};

export default Coin;