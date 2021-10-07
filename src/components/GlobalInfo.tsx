// Types
import { Global } from "../types/Types";
// Styles
import styled from "@emotion/styled";

interface Props {
  globalData: Global;
}

const Wrapper = styled.div`
  background-color: #e7e7e7;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

const CasesBox = styled.div`
  flex-direction: row;
`;

const GlobalInfo: React.FC<Props> = ({ globalData }) => {
  return (
    <Wrapper>
      <CasesBox>
        <h2>New Cases WorldWide</h2>
        <h3>
          New Confirmed:{" "}
          {new Intl.NumberFormat().format(globalData.NewConfirmed)}
        </h3>
        <h3>
          New Deaths: {new Intl.NumberFormat().format(globalData.NewDeaths)}
        </h3>
      </CasesBox>
      <CasesBox>
        <h2>Total Cases WorldWide</h2>
        <h3>
          Total Confirmed:{" "}
          {new Intl.NumberFormat().format(globalData.TotalConfirmed)}
        </h3>
        <h3>
          Total Deaths: {new Intl.NumberFormat().format(globalData.TotalDeaths)}
        </h3>
      </CasesBox>
    </Wrapper>
  );
};

export default GlobalInfo;
