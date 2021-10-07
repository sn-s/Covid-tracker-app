import { useState, useEffect } from "react";
import CountryList from "./components/CountryList";
// Components
import GlobalInfo from "./components/GlobalInfo";
// Types
import { ResponseData } from "./types/Types";
// Styles
import styled from "@emotion/styled";

// Mock Data
const MockData = require("./MockData.json");

const Wrapper = styled.div`
  text-align: center;

  .heading {
    background-color: #e7e7e7;
  }

  h1 {
    background-color: #e7e7e7;
    margin: 0;
    padding: 10px;
  }

  h4 {
    background-color: #e7e7e7;
    margin: 0;
    padding-bottom: 10px;
  }

  hr {
    margin: 0;
    border-top: 1px solid black;
  }
`;

const App: React.FC = () => {
  const [covidData, setCovidData] = useState<ResponseData | undefined>(
    undefined
  );

  // const fetchData = async () => {
  //   const result = await fetch("https://api.covid19api.com/summary");
  //   const data: ResponseData = await result.json();
  //   setCovidData(data);
  //   console.log(data);
  // };

  useEffect(() => {
    // fetchData();
    setCovidData(MockData);
  }, []);

  return (
    <Wrapper>
      <div className="heading">
        <h1>Global Covid-19 Tracker</h1>
        <h4>Last Updated: {covidData?.Global.Date.split("T")[0]}</h4>
      </div>
      <hr />
      {covidData ? (
        <>
          <GlobalInfo globalData={covidData?.Global} />
          <CountryList
            countries={covidData?.Countries.sort(
              (a, b) => b.NewConfirmed - a.NewConfirmed
            )}
          />
        </>
      ) : (
        "Loadind data..."
      )}
    </Wrapper>
  );
};

export default App;
