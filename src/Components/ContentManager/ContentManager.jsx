import React from 'react'
import SequenceForm from '../Forms/SequenceInput';
import Results from '../Results/Results';
import Spinner from '../Loading/Loading';
import BlastTable from '../BlastTable/BlastTable';
import BackmutationContainer from '../BackmutationTable/BackmutationContainer';
import Export from '../Export/Export';


const contentManager = (props) => {

    
    let content = null;
    if(props.activeStep ===0){
        content=(
            <SequenceForm 
                onSubmit={props.createAnnotation} 
                seqChangeHandler={(seq) => props.seqChangeHandler(seq)}
                querySequence={props.querySequence}
                toggleGermline={props.toggleGermline}
                loadExample={props.loadExample}
            />
        )
    }
    if(props.activeStep===1){
        content=(
            <Results items={props.querySequenceData} annotation={props.annotation} meta={props.meta}/>
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
                replaceCDR={props.replaceCDR}
            />
        )
    }
    if(props.activeStep===3){        
        content=(
            <BackmutationContainer
                results={props.templateData}
                hybridData={props.hybridData}
                meta={props.meta}
            />
        )
    }

    if(props.activeStep===4){        
        content=(
            <Export />
        )
    }

    let loading = null;
    if(props.isFetching){
        loading = <Spinner message={props.loadingMessage}/>
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