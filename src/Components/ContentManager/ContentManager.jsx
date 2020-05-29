import React from 'react'
import SequenceForm from '../Forms/SequenceInput';
import Results from '../Results/Results';
import Spinner from '../Loading/Loading';
import BlastTable from '../BlastTable/BlastTable';



const contentManager = (props) => {

    
    let content = null;
    if(props.activeStep ===0){
        content=(
            <SequenceForm 
            onSubmit={props.fetchData} 
            seqChangeHandler={(seq) => props.seqChangeHandler(seq)}
            querySequence={props.querySequence}/>
        )
    }
    if(props.activeStep===1){
        content=(
            <Results items={props.data} annotation={props.annotation} meta={props.meta}/>
        )
    }
    if(props.activeStep===2){
        content=(
            <BlastTable 
                blastResults={props.blastResults}
                selectedBlastResults={props.selectedBlastResults}
                addBlastResult={props.addBlastResult}
                deleteBlastResult={props.deleteBlastResult}
                resetBlastResults={props.resetBlastResults}
            />
        )
    }

    let loading = null;
    if(props.isfetching && props.sendRequest){
        loading = <Spinner />
    }

    return (
        <div>
        {
            loading?loading:content
        }
        </div>
    )
}
export default contentManager;