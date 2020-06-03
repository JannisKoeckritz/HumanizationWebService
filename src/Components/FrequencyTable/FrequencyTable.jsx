import React from 'react';
import {frequency_heavy_data, freuency_light_data} from '../../data/frequency'

const frequencyTable = (props) => {

    const activeStyle = {
        backgroundColor: "red",
        color: "white"
    }

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


    const items = getData()



    return (
        <div className="frequency-container">
                {items.map((entry, index) => {

                    if(entry.y < 1){
                        const activeStyleDict = {}
                        if(entry.x === props.aa){
                            activeStyleDict = activeStyle
                        }
                        return(
                            <div key={index} className="frequency-item" style={activeStyleDict}>
                            <span className="frequency-item-aa">
                                {entry.x}
                            </span>
                            <span className="frequency-item-value">
                                {"<1%"}
                            </span>
                        </div>

                        ) 
                    }else{
                        const activeStyleDict = {}
                        if(entry.x === props.aa){
                            activeStyleDict = activeStyle
                        }
                        return (
                        <div key={index} className="frequency-item" style={activeStyleDict}>
                            <span className="frequency-item-aa">
                                {entry.x}
                            </span>
                            <span className="frequency-item-value">
                                {`${entry.y.toFixed(2)}%`}
                            </span>
                        </div>
                        )
                        
                    }
                })}   

        </div>
    )

};

export default frequencyTable;