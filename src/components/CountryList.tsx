import React, { useState } from "react";
//Components
import CountryItem from "./CountryItem";
import BarChart from "./BarChart";
// Types
import { Country } from "../types/Types";
// Styles
import styled from "@emotion/styled";

interface Props {
  countries: Country[];
}

const SelectWrapper = styled.div`
  text-align: end;
  margin: 15px;
  font-size: 20px;
  font-weight: bold;

  select {
    font-size: 25px;
  }
`;

const ListWrapper = styled.div`
  margin-top: 5px;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const CountryList: React.FC<Props> = ({ countries }) => {
  const [sortCountries, setSortCountries] = useState<Country[]>(countries);
  const [activeCountries, setActiveCountries] = useState<Country[]>(
    countries.slice(0, 5)
  );
  const [sort, setSort] = useState("New Cases");

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    setSortCountries((prevState) => {
      switch (event.target.value) {
        case "New Cases":
          return prevState.sort((a, b) => b.NewConfirmed - a.NewConfirmed);
        case "New Deaths":
          return prevState.sort((a, b) => b.NewDeaths - a.NewDeaths);
        case "Total Cases":
          return prevState.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed);
        case "Total Deaths":
          return prevState.sort((a, b) => b.TotalDeaths - a.TotalDeaths);
        default:
          return prevState.sort((a, b) => b.NewConfirmed - a.NewConfirmed);
      }
    });
  };

  const onCountryClick = (country: Country) => {
    // check if clicked country is already in the activeCountry array
    const isCountryActive = activeCountries.includes(country);

    if (isCountryActive) {
      // if country exists, remove it from the array
      setActiveCountries((prevState) =>
        prevState.filter((activeCountry) => activeCountry !== country)
      );
    } else {
      // if country doesn't exist, add it to the array
      setActiveCountries((prevState) => [...prevState, country]);
    }
  };

  return (
    <div>
      <SelectWrapper>
        <label htmlFor="sort">Sort by: </label>
        <select name="sort" id="sort" value={sort} onChange={handleSort}>
          <option value="New Cases">New Cases</option>
          <option value="New Deaths">New Deaths</option>
          <option value="Total Cases">Total Cases</option>
          <option value="Total Deaths">Total Deaths</option>
        </select>
      </SelectWrapper>
      {activeCountries.length > 0 && (
        <BarChart countries={activeCountries} sort={sort} />
      )}
      <hr />
      <ListWrapper>
        {sortCountries.map((country) => (
          <CountryItem
            key={country.ID}
            country={country}
            activeCountries={activeCountries}
            onItemClick={onCountryClick}
          />
        ))}
      </ListWrapper>
    </div>
  );
};

export default CountryList;
