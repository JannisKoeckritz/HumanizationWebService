
    
from abdesign.util.annotation import create_annotation, export_to_json
import json
from Bio.pairwise2 import align
from Bio.Seq import Seq
from ast import literal_eval
import operator

def get_name(i):
    if i == 0:
        return "VH1a"
    if i == 1:
        return "VH1b"
    if i == 2:
        return "VH2"
    if i == 3:
        return "VH3"
    if i == 4:
        return "VH4"
    if i == 5:
        return "VH5"
    if i == 6:
        return "VH6"

def create_families():
    VH1a = "QVQLVQSGAEVKKPGSSVKVSCKASGGTFSSYAISWVRQAPGQGLEWMGGIIPIFGTANYAQKFQGRVTITADESTSTAYMELSSLRSEDTAVYYCAR"
    VH1b = "QVQLVQSGAEVKKPGASVKVSCKASGYTFTSYYMHWVRQAPGQGLEWMGWINPNSGGTNYAQKFQGRVTMTRDTSISTAYMELSSLRSEDTAVYYCAR"
    VH2 = "QVQLKESGPALVKPTQTLTLTCTFSGFSLSTSGVGVGWIRQPPGKALEWLALIDWDDDKYYSTSLKTRLTISKDTSKNQVVLTMTNMDPVDTATYYCAR"
    VH3 = "EVQLVESGGGLVQPGGSLRLSCAASGFTFSSYAMSWVRQAPGKGLEWVSAISGSGGSTYYADSVKGRFTISRDNSKNTLYLQMNSLRAEDTAVYYCAR"
    VH4 = "QVQLQESGPGLVKPSETLSLTCTVSGGSISSYYWSWIRQPPGKGLEWIGYIYYSGSTNYNPSLKSRVTISVDTSKNQFSLKLSSVTAADTAVYYCAR"
    VH5 = "EVQLVQSGAEVKKPGESLKISCKGSGYSFTSYWIGWVRQMPGKGLEWMGIIYPGDSDTRYSPSFQGQVTISADKSISTAYLQWSSLKASDTAMYYCAR"
    VH6 = "QVQLQQSGPGLVKPSQTLSLTCAISGDSVSSNSAAWNWIRQSPGRGLEWLGRTYYRSKWYNDYAVSVKSRITINPDTSKNQFSLQLNSVTPEDTAVYYCAR"

    families = {}
    for i, seq in enumerate([VH1a,VH1b, VH2, VH3, VH4, VH5, VH6]):
        name = get_name(i)
        obj = create_annotation(seq)
        json_obj = export_to_json(obj, False)
        export_json = json.loads(json_obj)
        families[name] = export_json

    with open("families.json","w") as f:
        f.write(json.dumps(families))

def find_familiy(query_obj):
    #query_obj = create_annotation(query)
    json_obj = export_to_json(query_obj, False)
    loaded_obj = json.loads(json_obj)
    #print(loaded_obj["data"]["annotation"]["kabat"])
    jsonified = json.loads(loaded_obj["data"]["annotation"]["kabat"])
    
    with open('families_summary.json',"r") as f:
        data = json.load(f)
    
    sim = {}

    for fam in data.keys():
        counter = 0
        for pos in jsonified["position"].keys():
            posi = jsonified["position"][pos]
            aa = jsonified["amino_acid"][pos]
            ext = jsonified["extension"][pos]
            tog = posi
            if ext != None:
                    tog = posi+ext
            if tog in data[fam].keys():
                if data[fam][tog] == aa:
                    counter +=1
        sim[fam] = (counter)
       
    return  max(sim.items(), key=operator.itemgetter(1))[0]

def get_residues(annotationScheme, family):
    with open('key_residues.json',"r") as f:
        data = json.load(f)
    return data[family]
            

def prepare_data_for_comparison():
    with open('families.json',"r") as f:
        data = json.load(f)
    result = {}
    for fam in data.keys():
        result[fam] = {}
        jsonified = json.loads(data[fam]["data"]["annotation"]["kabat"])
        for pos in jsonified["position"].keys():
            posi = jsonified["position"][pos]
            aa = jsonified["amino_acid"][pos]
            ext = jsonified["extension"][pos]
            tog = posi
            if ext != None:
                tog = posi+ext


            result[fam][str(tog)] = aa
    print(result)
    # return result
    with open("families_summary.json","w") as f:
        f.write(json.dumps(result))

    
if __name__ == "__main__":
    query2 = "QVQLVQSGAEVKKPGSSVKVSCKASGGTFSSYAISWVRQAPGQGLEWMGGIIPIFGTANYAQKFQGRVTITADESTSTAYMELSSLRSEDTAVYYCAR"
    query = "GESLKISCAASGLSCSSHWMSWVRQAPGKGLEWVADINHDGSEKHYVDSVKGRFTISRDNAKNSVYLQMNTLRAEDTAVYYCARESGIVGASRGWDFDYWGQGTLVTVSS"
    results = find_familiy(query2)
    print(results)
    # print(results)
    # prepare_data_for_comparison()

# json_vh1a = json.loads(json_obj)
# with open("igobject.json","w") as f:
#     f.write(json.dumps(json_vh1a))
# ig_object = create_annotation(vh1a)
# print(ig_object.annotation)
# json_obj = export_to_json(ig_object, False)
# json_vh1a = json.loads(json_obj)
# with open("igobject.json","w") as f:
#     f.write(json.dumps(json_vh1a))