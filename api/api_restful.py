from flask import Flask, request
from flask_restful import Resource, Api, abort, reqparse
import os
from decouple import config
from abdesign.util.annotation import create_annotation, export_to_json
from abdesign.humanization import replace_cdr
import json
import random
from tempfile import NamedTemporaryFile
import shlex
import subprocess
from humanize_db.core.db import ABDatabase

app = Flask(__name__)
api = Api(app)

DB_USER = config("FLASK_DB_USER")
DB_PWD = config("FLASK_DB_PWD")
DB_NAME = config("FLASK_DB_NAME")

credentials = {
    "user": DB_USER,
    "password": DB_PWD,
    "database": DB_NAME,
    "host": "localhost",
    "port": "5432"
}

#/annotate
class Annotation(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('sequence', required=True, type=str, help="This field cannot be blank.")
    
    def post(self):
        data = Annotation.parser.parse_args()
        seq = data['sequence']
        job_id = create_job_id()
        export_object, meta_data = create_json_annotation_data(seq)
        if export_object and meta_data:
            #print({'data': {'annotation': export_object, 'meta': meta_data},'job_id': str(job_id)})
            return {'data': {'annotation': export_object, 'meta': meta_data},'job_id': str(job_id)}, 201
        return {'message': "Error while parsing data. Please contact the Developer."}, 500

#/blast
class BlastSearch(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('sequence', required=True, type=str, help="This field cannot be blank.")
    parser.add_argument('chain_type', required=True, type=str, help="This field cannot be blank.")
    parser.add_argument('job_id', required=True, type=str, help="This field cannot be blank.")

    def post(self):
        data = BlastSearch.parser.parse_args()
        seq = data['sequence']
        chain_type = data['chain_type']
        job_id = data['job_id']
        blast_results = run_blast_search(seq, chain_type, job_id)
        if blast_results:
            return {'data':blast_results}, 201
        return {'message': "Error while parsing data. Please contact the Developer."}, 500

#/templates
class Templates(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('templateIDs', required=True, help="This field cannot be blank.", action="append")
    
    def post(self):
        data = Templates.parser.parse_args()
        templateIDs = data['templateIDs']
        export_object = {}
        print(data)

        for meta_key in templateIDs:
            dbentry = load_entry_by_meta_key(meta_key)
            print(dbentry)
            if dbentry:
                export_object[meta_key] = dbentry
        if export_object:
            return {'data': export_object}, 200
        return {'message': "Error while parsing data. Please contact the Developer."}, 500
    
    def get(self, templateID):
        dbentry = load_entry_by_meta_key(templateID)
        print(dbentry)
        export_object = {}
        if dbentry:
            export_object[templateID] = dbentry
        else:
            return {'message': "Could not find template ID in database"}, 404
        if export_object:
            return {'data': export_object}, 200
        return {'message': "Error while parsing data. Please contact the Developer."}, 500

#/humanize
class Humanization(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument("sequence", required=True, type=str, help="This field cannot be blank.")
    parser.add_argument("templateData", required=True, help="This field cannot be blank.")
    
    def post(self):
        data = Humanization.parser.parse_args()
        sequence = data["sequence"]
        templateData = data["templateData"]
        hybridData = humanize(sequence, templateData)
        if hybridData:
            return {'data': hybridData}, 200
        else:
            return {'message': "Error while parsing data. Please contact the Developer."}, 500

#/entry
class DatabaseEntry(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('sequence', required=True, type=str, help="This field cannot be blank.")

    def get(self, sequence):
        dbentry = load_entry_by_seq(sequence)
        print(dbentry)
        export_object = {}
        if dbentry:
            export_object[sequence] = dbentry
        if export_object:
            return {'data': export_object}, 200
        else:
            return {'message': "Could not find sequence in DB."}, 404
        return {'message': "Error while parsing data. Please contact the Developer."}, 500

#/export
class Export(Resource):
    def post(self, job_id, sequences):
        content = createFasta(sequences)
        if content:
            return {'data': content}, 201
        return {'data': None}, 500


#Functions to export in other modules / components
def abort_if_id_not_exists(meta_id):
    IDs = []
    if meta_id not in IDs:
        abort(404, message=f"Meta key {meta_id} does not exist.")

#TODO: Add frequency to datasets
def create_json_annotation_data(seq):
    try:
        ig_object = create_annotation(seq)
        #print(ig_object)
        json_ig_object = export_to_json(ig_object, to_file=False)
        loaded = json.loads(json_ig_object)
        #print(loaded)
        meta = loaded['meta']
        if meta['chain_type'].upper() == "H":
            chain_type = "Heavy"
        else:
            chain_type = meta['chain_type']
        meta_data = {
            "sequence":meta['seq'],
            "chain_type":chain_type,
            "humaness":0,
            "iso_type":"IgG",
            "species":meta["species"]
        }
        export_object = {}
        for annotationScheme in loaded['data']['annotation']:
            export_object[annotationScheme] = []
            aSchemeData = json.loads(loaded['data']['annotation'][annotationScheme])
            for key in aSchemeData['position'].keys():
                working_directory = aSchemeData
                amino_acid = working_directory['amino_acid'][key]
                position = working_directory['position'][key]
                chain = working_directory['chain'][key]
                frequency = str(round(random.random(),2))
                extension = working_directory['extension'][key] if working_directory['extension'][key] else ""
                cdr = working_directory['cdr'][key]
                dataset = {'pos': str(position)+str(extension), "amino_acid": amino_acid, "chain_type": chain,"frequency":frequency, "cdr": cdr}
                export_object[annotationScheme].append(dataset)
        # print(export_object)
        return export_object, meta_data
    except Exception as err:
        print(err)
        return None, None

def run_blast_search(seq, chain_type, job_id):
    tmp_file = NamedTemporaryFile(prefix="blast_query_", delete=True)
    outfile = NamedTemporaryFile(prefix="blast_result_", delete=True)
    with open(tmp_file.name, "w") as file_in:
        inhalt = ">"+job_id+"\n"+seq
        file_in.write(inhalt)
    print(inhalt, seq, chain_type, job_id)
    if chain_type in ["H", "Heavy", "heavy", "h"]:
        cmd=shlex.split(f'blastp -query {tmp_file.name} -db ../../../blast/heavy_blastDB.faa -outfmt 6 -out {outfile.name}')
    else:
        cmd=shlex.split(f'blastp -query {tmp_file.name} -db ../../../blast/light_blastDB.faa -outfmt 6 -out {outfile.name}')
    process = subprocess.run(cmd)
    output = process.stdout
    errors = process.stderr
    if errors:
        print(errors)
    with open(outfile.name,"r") as out:
        lines = out.readlines()
    json_result = []
    for ind, elem in enumerate(lines[:21]):
        json_result.append(elem)
    return json_result

def load_entry_by_meta_key(meta_key):
    db = ABDatabase(**credentials)
    db.close()
    db.open(**credentials)
    dbentry = db.selectByMetaKey(meta_key)
    if dbentry:
        dataset = {
            "id": dbentry[0],
            "meta_key": dbentry[1],
            "seq": dbentry[2],
            "chain_type": dbentry[3],
            "iso_type": dbentry[4],
            "germline": dbentry[5],
            "species": dbentry[6],
            "disease": dbentry[7],
            "v_gene": dbentry[8],
            "j_gene": dbentry[9],
            "origin": dbentry[10]
        }
        db.close()
        return dataset
    else:
        db.close()
        return None

def load_entry_by_seq(sequence):
    db = ABDatabase(**credentials)
    db.close()
    db.open(**credentials)
    dbentry = db.selectBySequence(sequence)
    if dbentry:
        dataset = {
            "id": dbentry[0],
            "meta_key": dbentry[1],
            "seq": dbentry[2],
            "chain_type": dbentry[3],
            "iso_type": dbentry[4],
            "germline": dbentry[5],
            "species": dbentry[6],
            "disease": dbentry[7],
            "v_gene": dbentry[8],
            "j_gene": dbentry[9],
            "origin": dbentry[10]
        }
        db.close()
        return dataset
    else:
        db.close()
        return None

def humanize(sequence, templateData):
    results={}
    string_template = str(templateData).replace("'", '"')
    loadedTempData = json.loads(string_template)
    ig_query = create_annotation(sequence)
    json_query, meta_query = create_json_annotation_data(sequence)
    for tempID in loadedTempData.keys():
        ig_target = create_annotation(loadedTempData[tempID]["seq"])
        json_target, meta_target = create_json_annotation_data(ig_target.sequence)
        modified =  replace_cdr(ig_query, ig_target)
        json_modified, meta_modified = create_json_annotation_data(modified.sequence) 
        
        frequency_annotation_data = {"kabat": [[0, "E"], [1, "S"], [2, "L"], [3, "K"], [4, "I"], [5, "S"], [6, "C"], [7, "K"], [8, "G"], [9, "S"], [10, "G"], [11, "F"], [12, "S"], [13, "F"], [14, "T"], [15, "R"], [16, "Y"], [17, "V"], [18, "M"], [19, "S"], [20, "W"], [21, "V"], [22, "R"], [23, "Q"], [24, "M"], [25, "P"], [26, "G"], [27, "K"], [28, "G"], [29, "L"], [30, "E"], [31, "W"], [32, "M"], [33, "G"], [34, "S"], [35, "I"], [36, "S"], [37, "S"], [38, "G"], [39, "G"], [40, "R"], [41, "T"], [42, "Y"], [43, "Y"], [44, "P"], [45, "G"], [46, "S"], [47, "E"], [48, "M"], [49, "G"], [50, "H"], [51, "V"], [52, "T"], [53, "I"], [54, "S"], [55, "A"], [56, "D"], [57, "K"], [58, "S"], [59, "I"], [60, "S"], [61, "T"], [62, "A"], [63, "Y"], [64, "L"], [65, "Q"], [66, "W"], [67, "S"], [68, "S"], [69, "L"], [70, "K"], [71, "A"], [72, "S"], [73, "D"], [74, "T"], [75, "A"], [76, "I"], [77, "Y"], [78, "Y"], [79, "C"], [80, "A"], [81, "R"], [82, "E"], [83, "D"], [84, "Y"], [85, "Y"], [86, "G"], [87, "G"], [88, "R"], [89, "Y"], [90, "W"], [91, "Y"], [92, "F"], [93, "D"], [94, "V"], [95, "W"], [96, "G"], [97, "Q"], [98, "G"], [99, "S"], [100, "L"], [101, "V"], [102, "T"], [103, "V"], [104, "S"], [105, "S"]]}

        id_result = {
            "query": json_query,
            "target": json_target,
            "modified": json_modified,
            "mod_seq": modified.sequence,
            "target_seq": ig_target.sequence,
            "frequency": frequency_annotation_data
        }
        results[tempID] = id_result
    return results



def create_job_id():
    return random.randint(0,1000)

def createFasta():
    pass

api.add_resource(Annotation, '/annotate')
api.add_resource(BlastSearch, '/blast')
api.add_resource(Templates, '/templates','/templates/<string:templateID>')
api.add_resource(DatabaseEntry, '/entry/<string:sequence>')
api.add_resource(Humanization, '/humanize')

if __name__ == "__main__":
    app.run(port=6000)
