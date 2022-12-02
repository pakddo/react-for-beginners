import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const [input, setInput] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      })
  }, [])
  const onSelect = (event) => {setPrice(event.target.value)}
  const onInput =  (event) => {setInput(event.target.value)}
  console.log(input, price);
  return (
    <div>
      <h1>The Coins! {loading ? "": `(${coins.length})`}</h1> 
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <label htmlFor="usd">USD:</label>
          <input id="usd" placeholder="Input USD" type="number" onChange={onInput}/>
          <h3>You can buy {input / price} </h3>
          <select onChange={onSelect}>
              <option value="none" selected disabled hidden>Select an Option</option>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
         
        </div>
      )}

    </div>
  );
}

export default App;