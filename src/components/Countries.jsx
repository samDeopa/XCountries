import axios from "axios";
import { useEffect, useState } from "react";
import "./Countries.css";
const CountryCard = ({ name, flag, alt }) => {
  return (
    <div className="card">
      <img src={flag} alt={alt} />
      <h2>{name}</h2>
    </div>
  );
};

export default function Flags() {
  const [countries, SetCountries] = useState([]);

  useEffect(() => {
    try {
      axios("https://restcountries.com/v3.1/all").then((res) =>
        SetCountries(res.data)
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="container">
      {countries.map((country) => (
        <CountryCard
          key={country.official}
          name={country.name.common}
          flag={country.flags.png}
          alt={country.flags.alt}
        />
      ))}
    </div>
  );
}
