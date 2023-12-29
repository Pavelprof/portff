import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ["#0088FE","#00C49F","#FFBB28","#FF8042","#FF8042","#8884d8","#E6194B","#3CB44B","#FFE119","#4363D8","#F58231","#911EB4","#46F0F0","#F032E6","#BCF60C","#FABEBE","#008080","#E6BEFF","#9A6324","#FFFAC8","#800000","#AAFFC3","#808000","#FFD8B1","#000075","#808080"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const valueFormatted = new Intl.NumberFormat('ru-RU').format(data.value);

    // Стили для тултипа
    const tooltipStyles = {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '10px',
      paddingRight: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    };

    return (
      <div className="custom-tooltip" style={tooltipStyles}>
        <p className="label">{`${data.name}: ${valueFormatted}`}</p>
      </div>
    );
  }

  return null;
};


export const AssetPieChart = ({ data }) => {
  return (
    <PieChart width={800} height={450}>
      <Pie
        data={data}
        cx={400}
        cy={200}
        labelLine={false}
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  );
};
