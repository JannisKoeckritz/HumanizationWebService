import React, {useState} from 'react';
import colormap from '../../assets/colors';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import ColumnChart from '../ColumnChart/ColumnChart'
import FrequencyTable from '../FrequencyTable/FrequencyTable'
import valid_amino_acids from '../../data/iupac'


const resultItem = (props) => {
    const currentColor = colormap[props.colorTheme][props.data.amino_acid]

    const translateAA = (aa) => {
        return valid_amino_acids[aa]
    }

    const isCDR = (str) => {
        if(str.includes("CDR")){
            return { backgroundColor: "#D9D9D9"}
        }
        else{
            return {}
        }
    }

    if(!props.data.amino_acid.includes("-")){
        return(
            <div>
                <OverlayTrigger
                    trigger={["hover","focus"]}
                    placement="auto"
                    overlay={
                        <Popover id={`popover-${props.index}`}>
                            <div style={{backgroundColor:"white", border:"1px solid black", padding:"10px"}}>
                            <Popover.Title as="h3">
                                {props.meta.chain_type[0].toUpperCase()+props.data.pos} - {props.data.amino_acid} 
                                <small style={{marginRight:"10px"}}> ({translateAA(props.data.amino_acid)})</small>
                                {props.data.frequency < 0.1 ? <span className="rare_indicator"></span>:<span className="indicator_empty"></span>}    
                            </Popover.Title>
                            <Popover.Content>
                                <div className="popover-flexbox">
                                <ColumnChart 
                                    chain_type={props.meta.chain_type} 
                                    aa={props.data.amino_acid} 
                                    position={props.data.pos}
                                    annotationScheme={props.annotationScheme}/>
                                <FrequencyTable
                                    chain_type={props.meta.chain_type} 
                                    aa={props.data.amino_acid} 
                                    position={props.data.pos} />
                                </div>
                            </Popover.Content>
                            </div>

                        </Popover>
                    }>
                
                <div className="result__item" style={isCDR(props.data.cdr)} >
                <div className="result__item__aa" style={{backgroundColor:currentColor}}>
                    <b>{props.data.amino_acid}</b>
                </div>
                <div className="result__item__pos">
                        {props.meta.chain_type[0].toUpperCase()+props.data.pos}
                </div>
                <div className="result__item__freq">
                        {props.data.frequency}
                </div>
                </div>
                </OverlayTrigger>
                <div className="item_rare_indicator">
                        {props.data.frequency < 0.1 ? <span className="rare_indicator"></span>:<span className="indicator_empty"></span>}
                </div>

            </div>);
    }
else{
    return <span></span>
}






}

export default resultItem;