// Components
import { Bar } from "react-chartjs-2";
// Types
import { Country } from "../types/Types";
// Styles
import styled from "@emotion/styled";

interface Props {
  countries: Country[];
  sort: string;
}

const ChartWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BarChart: React.FC<Props> = ({ countries, sort }) => {
  const generateChartData = () => {
    const data: number[] = [];
    const labels: string[] = [];

    countries.forEach((country) => {
      labels.push(country.Country);
      switch (sort) {
        case "New Cases":
          return data.push(country.NewConfirmed);
        case "New Deaths":
          return data.push(country.NewDeaths);
        case "Total Cases":
          return data.push(country.TotalConfirmed);
        case "Total Deaths":
          return data.push(country.TotalDeaths);
        default:
          return data.push(country.NewConfirmed);
      }
    });

    return {
      labels,
      datasets: [
        {
          label: sort,
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: { size: 20 },
          usePointStyle: true,
          pointStyle: "dash",
        },
      },
    },
  };

  return (
    <ChartWrapper>
      <Bar data={generateChartData()} options={options} />
    </ChartWrapper>
  );
};

export default BarChart;
