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
  const [onMount, setOnMount] = useState(false);

  const [flagsToRender, setFlagsToRender] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    try {
      axios("https://restcountries.com/v3.1/all")
        .then((res) => SetCountries(res.data))
        .then(() => setOnMount(true));
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    if (filter === "") {
      setFlagsToRender([...countries]);
    } else {
      setFlagsToRender(
        countries.filter((country) => country.name.common.includes(filter))
      );
      console.log(flagsToRender);
    }
  }, [onMount, filter]);

  return (
    <div className="parent">
      <input
        type="text"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className="inputField"
      />
      <div className="container">
        {flagsToRender.map((country) => (
          <CountryCard
            key={country.name.official}
            name={country.name.common}
            flag={country.flags.png}
            alt={country.flags.alt}
          />
        ))}
      </div>
    </div>
  );
}
