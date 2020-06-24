import React from 'react'
import SequenceForm from '../Forms/SequenceInput';
import Results from '../Results/Results';
import Spinner from '../Loading/Loading';
import BlastTable from '../BlastTable/BlastTable';
import BackmutationContainer from '../BackmutationTable/BackmutationContainer';
import Export from '../Export/Export';
import Finish from '../Finish/Finish';


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
            <Results
                activeAnnotationScheme={props.activeAnnotationScheme}
                changeAnnotation={props.changeAnnotation} 
                items={props.querySequenceData} 
                annotation={props.annotation} 
                meta={props.meta}
                threshold={props.threshold}
                setThreshold={props.setThreshold}
            />
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
                querySequence={props.querySequence}
                results={props.templateData}
                hybridData={props.hybridData}
                meta={props.meta}
                activeAnnotationScheme={props.activeAnnotationScheme}
                changeAnnotation={props.changeAnnotation}
                threshold={props.threshold}
                setThreshold={props.setThreshold}
                modified={props.modified}
                getMutatedSequences={props.getMutatedSequences}
                threshold={props.threshold}
                setThreshold={props.setThreshold}
            />
        )
    }

    if(props.activeStep===4){        
        content=(
            <Export
                downloadFile={props.downloadFile}
                mutations={props.modified}
                downloads={props.toDownload}
                addToDownloads={props.addToDownloads}
                removeFromDownloads={props.removeFromDownloads}
            />
        )
    }

    if(props.activeStep===5){
        content=(
            <Finish
                handleReset={props.reset}
            />
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