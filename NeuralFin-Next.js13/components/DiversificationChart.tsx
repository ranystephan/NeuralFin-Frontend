import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

interface DiversificationChartProps {
  diversification: { [symbol: string]: number[] };
}

const DiversificationChart: React.FC<DiversificationChartProps> = ({ diversification }) => {
  const symbols = Object.keys(diversification);
  const data = symbols.map((symbol) => diversification[symbol]);

  return (
    <Plot
      data={[
        {
          z: data,
          x: symbols,
          y: symbols,
          type: 'heatmap',
          colorscale: 'Viridis',
        },
      ]}
      layout={{
        width: 550,
        height: 300,
        title: '',
        paper_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent background
        plot_bgcolor: 'rgba(0, 0, 0, 0)', // Transparent plot area background
        font: {
          color: 'white', // Set text color to white
        },
        margin: {
          l: 60, // Left margin
          r: 60, // Right margin
          t: 20, // Top margin
          b: 60, // Bottom margin
          pad: 2, // Padding between the plot and the container
        },
      }}
    />
  );
};

export default DiversificationChart;


