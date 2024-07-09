import React from 'react';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    plugins,
    Ticks,
} from 'chart.js'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)
   


const AffiliateChart = () => {
    const data={
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            data:[8,5,2,7,9,1],
            backgroundColor:'transparent',
            borderColor:'#0654A0',
            pointBorderColor:'transparent',
            pointBorderWidth:4

        }],
        
    }

    const options = {
        responsive: true,
        plugins: {
          legend: false
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            min: 2,
            max: 10,
            ticks: {
              stepSize: 2
            }
          }
        }
      };
      
  return (
        <div className="chart" style={{height:'400px', width:'900px'}}>
             <Line data={data} option={options}/>
        </div>
  );
};

export default AffiliateChart;
