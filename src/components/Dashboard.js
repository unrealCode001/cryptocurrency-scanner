import { getAuth, signOut } from '@firebase/auth';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Coin from './Coin/Coin';
import './Dashboard.scss'


const Dashboard = ({ history }) => {
    const logout = () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('token')
                history.push('/')
            })
            .catch((e) => alert(e.message))
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            history.push('/')
        }
    },[])

    const auth = getAuth();
    const user = auth.currentUser;

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios
        .get(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        )
        .then(res => {
            setCoins(res.data);
            console.log(res.data);
        })
        .catch(error => console.log(error));
    }, []);

    const handleChange = e => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className='details'>

            <h2 className='details__title'>Welcome {user && user.displayName}, To Your Dashboard</h2>

            <input
                className='details__input'
                type='text'
                onChange={handleChange}
                placeholder='Search'
            />
   
            {filteredCoins.map(coin => {
                return (
                <Coin
                    key={coin.id}
                    name={coin.name}
                    price={coin.current_price}
                    symbol={coin.symbol}
                    marketcap={coin.total_volume}
                    volume={coin.market_cap}
                    image={coin.image}
                    priceChange={coin.price_change_percentage_24h}
                />
                );
            })}

            <div className='details__signout'>
                <button onClick={logout} className=''>Logout</button>
            </div>

        </div>
    )
}

export default Dashboard;
