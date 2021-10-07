// Components
import Flags from "country-flag-icons/react/3x2";
// Types
import { Country } from "../types/Types";
// Styles
import styled from "@emotion/styled";
import { useState } from "react";

interface Props {
  country: Country;
  activeCountries: Country[];
  onItemClick: (country: Country) => void;
}

interface ListContentProps {
  isActive: boolean;
}

const ListItem = styled.li`
  list-style-type: none;
  flex: 0 0 30%;
  text-align: center;
  cursor: pointer;

  @media (min-width: 420px) {
    flex: 0 0 20%;
  }
`;

const ListContent = styled.div<ListContentProps>`
  border-radius: 10px;
  background-color: ${(props) =>
    props.isActive ? "rgb(255,165,0, 0.5)" : "#e7e7e7"};
  margin: 5px;
  padding: 10px 0;

  .isActive {
    background-color: "rgb(255,165,0, 0.5)";
  }

  .card-header {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .title-style {
    padding: 5px;
    font-weight: bold;
  }

  .flag-style {
    width: 35px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 5px;
  }

  li span {
    font-weight: bold;
  }
`;

const CountryItem: React.FC<Props> = ({
  country,
  activeCountries,
  onItemClick,
}) => {
  const initialState = activeCountries.includes(country) ? true : false;
  const [isActive, setIsActive] = useState<boolean>(initialState);

  const handleOnClick = (country: Country) => {
    onItemClick(country);
    setIsActive(!isActive);
  };

  const Flag = Flags[country.CountryCode];

  return (
    <ListItem key={country.ID} onClick={() => handleOnClick(country)}>
      <ListContent isActive={isActive}>
        <div className="card-header">
          <div className="flag-style">
            <Flag />
          </div>
          <div className="title-style">{country.Country}</div>
        </div>
        <ul>
          <li>
            New Cases:{" "}
            <span>{Intl.NumberFormat().format(country.NewConfirmed)}</span>
          </li>
          <li>
            New Deaths:{" "}
            <span>{Intl.NumberFormat().format(country.NewDeaths)}</span>
          </li>
          <li>
            Total Cases:{" "}
            <span>{Intl.NumberFormat().format(country.TotalConfirmed)}</span>
          </li>
          <li>
            Total Deaths:{" "}
            <span>{Intl.NumberFormat().format(country.TotalDeaths)}</span>
          </li>
        </ul>
      </ListContent>
    </ListItem>
  );
};

export default CountryItem;
