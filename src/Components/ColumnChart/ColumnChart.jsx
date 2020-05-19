import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries
  } from 'react-vis';
import  {freuency_light_data, frequency_heavy_data} from '../../data/frequency';



const columnChart = (props) => {
    //console.log(props)

    const getData = () => {
        if(props.chain==='Heavy'){
            const dataset = frequency_heavy_data['imgt'][props.position]
            const datalist = []
            for (let key in dataset){
              if(key===props.aa){
                datalist.push({x:key,y:dataset[key]*100, label:`${dataset[key]*100}%`, fill:1})
              }else{
                datalist.push({x:key,y:dataset[key]*100, label:`${dataset[key]*100}%`, fill:4})
              }
              
          }
                return datalist
            }
        else{
            const dataset = freuency_light_data['imgt'][props.position]
            const datalist = []
                for (let key in dataset){
                    if(key===props.aa){
                      datalist.push({x:key,y:dataset[key]*100, fill:"red"})
                    }else{
                      datalist.push({x:key,y:dataset[key]*100})
                    }
                    
                }
                return datalist
        }
    }

    


    console.log(columnChart.datalist)

    return (
      <XYPlot margin={{bottom: 70}} xType="ordinal" width={300} height={300}>
        <HorizontalGridLines />
        <XAxis tickLabelAngle={0} />
        <YAxis />
        <VerticalBarSeries
          data={getData()}
        />
      </XYPlot>
    );
}

export default columnChart;