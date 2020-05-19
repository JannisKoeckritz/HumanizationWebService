import React, {useState} from 'react';
import colormap from '../../assets/colors';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import ColumnChart from '../ColumnChart/ColumnChart'
import valid_amino_acids from '../../data/iupac'


const resultItem = (props) => {
    const [mouseIsEntered, setMouseEntered] = useState(false);
    const [visibility, setVisibility] = useState("hidden");
    //console.log(colormap[2][props.data.amino_acid])
    const currentColor = colormap[props.colorTheme][props.data.amino_acid]

    const translateAA = (aa) => {
        return valid_amino_acids[aa]
    }

    const mouseEnter = () => {
        console.log("Mouse entered Item -> key:", props.index)
        setMouseEntered(true);
        setVisibility("visible");
    }

    const mouseLeave = () => {
        console.log("Mouse leaved Item -> key:", props.index)
        setMouseEntered(false);
        setVisibility("hidden");
    }

    return(
        <OverlayTrigger
            trigger="hover"
            placement="auto"
            overlay={
                <Popover id={`popover-${props.index}`}>
                    <div style={{backgroundColor:"white", border:"1px solid black", padding:"10px"}}>
                    <Popover.Title as="h3">{props.data.pos} - {props.data.amino_acid} <small> ({translateAA(props.data.amino_acid)})</small></Popover.Title>
                    <Popover.Content>
                        <ColumnChart 
                            chain={props.meta.chain} 
                            aa={props.data.amino_acid} 
                            position={props.data.pos}
                            annotationScheme={props.annotationScheme}/>
                    </Popover.Content>
                    </div>

                </Popover>
            }>

        <div className="result__item" >
           <div className="result__item__aa" style={{backgroundColor:currentColor}}>
               <b>{props.data.amino_acid}</b>
           </div>
           <div className="result__item__pos">
                {props.data.pos}
           </div>
           <div className="result__item__freq">
                {props.data.frequency}
           </div>
        </div>
        </OverlayTrigger>);





}

export default resultItem;