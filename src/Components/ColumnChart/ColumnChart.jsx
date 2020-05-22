import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries
  } from 'react-vis';
import  {freuency_light_data, frequency_heavy_data} from '../../data/frequency';



const columnChart = (props) => {
    //console.log(props)
    function compare(a, b) {
      const amino_acid_one = a.x.toUpperCase();
      const amino_acid_two = b.x.toUpperCase();
    
      let comparison = 0;
      if (amino_acid_one > amino_acid_two) {
        comparison = 1;
      } else if (amino_acid_one < amino_acid_two) {
        comparison = -1;
      }
      return comparison;
    }

    const getData = () => {
        if(props.chain==='Heavy'){
            const dataset = frequency_heavy_data['imgt'][props.position]
            const datalist = []
            for (let key in dataset){
              if(key===props.aa){
                datalist.push({x:key,y:dataset[key]*100, label:`${dataset[key]*100}%`, fill:1})
              }else{
                datalist.push({x:key,y:dataset[key]*100, label:`${dataset[key]*100}%`, fill:5})
              }
              
          }
                return datalist.sort(compare)
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