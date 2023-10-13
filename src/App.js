import { useEffect, useState } from "react";
let currency = [];

export default function App() {
  const [converted, setConverted] = useState([]);
  const [currSign, setCurrSign] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("AUD");
  const [toCurr, setToCurr] = useState("USD");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );

        if (!response.ok) throw new Error("Data not found!");

        const data = await response.json();
        setConverted(data.rates[toCurr]);
      } catch (error) {
        console.log(error.message);
      }
    }
    getData();
  }, [amount, fromCurr, toCurr]);

  useEffect(() => {
    async function getCountryRate() {
      try {
        const response = await fetch(`https://api.frankfurter.app/latest?`);
        if (!response.ok) throw new Error("Data not found!");
        const data = await response.json();
        setCurrSign(data.rates);
      } catch (error) {
        console.log(error.message);
      }
    }
    getCountryRate();
  }, []);

  for (const key in currSign) {
    currency.push(key);
  }

  return (
    <div className="container">
      <div className="form">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <select value={fromCurr} onChange={(e) => setFromCurr(e.target.value)}>
          <Currency currency={currency} />
        </select>

        <select value={toCurr} onChange={(e) => setToCurr(e.target.value)}>
          <Currency currency={currency} />
        </select>
      </div>
      {amount === 0 ? (
        ""
      ) : (
        <h1>
          {converted} {toCurr}
        </h1>
      )}
    </div>
  );
}

function Currency({ currency }) {
  return (
    <>
      {currency.map((curr, i) => (
        <option value={curr} key={curr + i}>
          {curr}
        </option>
      ))}
    </>
  );
}
