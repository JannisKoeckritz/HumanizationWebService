import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalBarSeries
  } from 'react-vis';
import {frequency_data} from '../../data/frequency';



const columnChart = (props) => {
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
        if(props.chain_type==='Heavy'){
            const dataset = frequency_data[props.activeAnnotationScheme]["heavy"][props.position]
            const datalist = []
            for (let key in dataset){
              if(key===props.aa){
                datalist.push({x:key,y:dataset[key]*100, label:`${dataset[key]*100}%`, fill:1})
              }else{
                datalist.push({x:key,y:dataset[key]*100, label:`${dataset[key]*100}%`, fill:2})
              }
              
          }
                return datalist.sort(compare)
            }
        else{
            const dataset = frequency_data[props.activeAnnotationScheme]["light"][props.position]
            const datalist = []
                for (let key in dataset){
                    if(key===props.aa){
                      datalist.push({x:key,y:dataset[key]*100, fill:1})
                    }else{
                      datalist.push({x:key,y:dataset[key]*100, fill:2})
                    }
                    
                }
                return datalist
        }
    }

    


    return (
      <XYPlot margin={{bottom: 40}} xType="ordinal" width={300} height={300}>
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