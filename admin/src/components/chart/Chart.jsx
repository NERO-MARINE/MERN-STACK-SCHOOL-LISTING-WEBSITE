import "./chart.scss";
// chart import from rechart.org. Make sure to run npm install recharts first
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// chart data from recharts.org was changed to whats below.
const data = [
  {name: "January", Total: 1200},
  {name: "Feburary", Total: 2100},
  {name: "March", Total: 800},
  {name: "April", Total: 1600},
  {name: "May", Total: 900},
  {name: "June", Total: 1700},
];

const Chart = ({aspect, title}) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      {/* chart from rechart.org */}
      {/* height was changed from 100% to half the width */}
      <ResponsiveContainer width="100%" aspect={aspect}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Total" // datakey replaced with new one I created
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
