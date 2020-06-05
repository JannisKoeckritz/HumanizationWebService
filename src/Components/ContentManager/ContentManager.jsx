import React from 'react'
import SequenceForm from '../Forms/SequenceInput';
import Results from '../Results/Results';
import Spinner from '../Loading/Loading';
import BlastTable from '../BlastTable/BlastTable';
import BackmutationTable from '../BackmutationTable/BackmutationTable';



const contentManager = (props) => {

    
    let content = null;
    if(props.activeStep ===0){
        content=(
            <SequenceForm 
                onSubmit={props.fetchData} 
                seqChangeHandler={(seq) => props.seqChangeHandler(seq)}
                querySequence={props.querySequence}
                loadExample={props.loadExample}
            />
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
                templateIDs={props.templateIDs}
                addTemplate={props.addTemplate}
                deleteTemplate={props.deleteTemplate}
                resetTemplates={props.resetTemplates}
                templateIDs={props.templateIDs}
            />
        )
    }
    if(props.activeStep===3){
        content=(
            <BackmutationTable
                results={props.results}/>
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