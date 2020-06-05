from flask import Flask, request
from flask_cors import CORS
import time
import json
import ast
from abdesign.util import create_annotation
from abdesign.util import export_to_json
import subprocess
from tempfile import NamedTemporaryFile
import re
import shlex
from humanize_db.core.db import ABDatabase

app = Flask(__name__)
CORS(app)

@app.route("/annotate",methods=['POST'])
def get_current_time():
    datastring = str(request.data.decode("utf-8"))
    #print(datastring)
    data_json = ast.literal_eval(datastring)
    #print(data_json)
    with open("api_example.txt","r") as file:
        api_data=file.readlines()
    
    results={
        "annotation": ast.literal_eval(api_data[0]),
        "meta": {"chain": "Heavy", "iso_type":"IgG", "species": "Human", "sequence": data_json["sequence"]}
    }
    #print(results)
    # results = {
    #     "annotation": {"kabat":    [{"amino_acid":"Q", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"4", "frequency":"0.98"}, {"amino_acid":"L", "pos":"5", "frequency":"0.1"},{"amino_acid":"G", "pos":"6", "frequency":"0.02"},{"amino_acid":"A", "pos":"7", "frequency":"0.98"}, {"amino_acid":"K", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"8", "frequency":"0.03"},{"amino_acid":"I", "pos":"9", "frequency":"0.98"}, {"amino_acid":"R", "pos":"10", "frequency":"0.1"},{"amino_acid":"G", "pos":"11", "frequency":"0.97"},{"amino_acid":"T", "pos":"12", "frequency":"0.98"}, {"amino_acid":"V", "pos":"13", "frequency":"0.1"},{"amino_acid":"G", "pos":"14", "frequency":"0.97"},{"amino_acid":"A", "pos":"15", "frequency":"0.98"}, {"amino_acid":"L", "pos":"16", "frequency":"0.1"},{"amino_acid":"G", "pos":"17", "frequency":"0.97"},{"amino_acid":"A", "pos":"18", "frequency":"0.98"}, {"amino_acid":"L", "pos":"19", "frequency":"0.1"},{"amino_acid":"G", "pos":"20", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"17", "frequency":"0.06"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"31", "frequency":"0.98"}, {"amino_acid":"L", "pos":"32", "frequency":"0.3"},{"amino_acid":"G", "pos":"3", "frequency":"0.17"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.02"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.07"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"}
    #         ,{"amino_acid":"C", "pos":"1", "frequency":"0.98"}, {"amino_acid":"D", "pos":"2", "frequency":"0.1"},{"amino_acid":"E", "pos":"3", "frequency":"0.97"},{"amino_acid":"F", "pos":"1", "frequency":"0.98"}, {"amino_acid":"H", "pos":"2", "frequency":"0.1"},{"amino_acid":"I", "pos":"3", "frequency":"0.97"},{"amino_acid":"K", "pos":"1", "frequency":"0.98"}, {"amino_acid":"M", "pos":"2", "frequency":"0.1"},{"amino_acid":"N", "pos":"3", "frequency":"0.97"},{"amino_acid":"P", "pos":"1", "frequency":"0.98"}, {"amino_acid":"Y", "pos":"2", "frequency":"0.1"},{"amino_acid":"P", "pos":"3", "frequency":"0.97"},{"amino_acid":"S", "pos":"1", "frequency":"0.98"}, {"amino_acid":"W", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.01"},{"amino_acid":"G", "pos":"3", "frequency":"0.7"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"}],
    #         "imgt": [{"amino_acid":"C", "pos":"1", "frequency":"0.98"}, {"amino_acid":"G", "pos":"2", "frequency":"0.1"},{"amino_acid":"Y", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"Y", "pos":"1", "frequency":"0.98"}, {"amino_acid":"K", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"I", "pos":"1", "frequency":"0.98"}, {"amino_acid":"R", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"T", "pos":"1", "frequency":"0.98"}, {"amino_acid":"V", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"R", "pos":"34", "frequency":"0.8"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"K", "pos":"105", "frequency":"0.05"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"}
    #         ,{"amino_acid":"C", "pos":"1", "frequency":"0.98"}, {"amino_acid":"D", "pos":"2", "frequency":"0.1"},{"amino_acid":"E", "pos":"3", "frequency":"0.97"},{"amino_acid":"F", "pos":"1", "frequency":"0.98"}, {"amino_acid":"H", "pos":"2", "frequency":"0.1"},{"amino_acid":"I", "pos":"3", "frequency":"0.97"},{"amino_acid":"K", "pos":"1", "frequency":"0.98"}, {"amino_acid":"M", "pos":"2", "frequency":"0.1"},{"amino_acid":"N", "pos":"3", "frequency":"0.97"},{"amino_acid":"P", "pos":"1", "frequency":"0.98"}, {"amino_acid":"Y", "pos":"2", "frequency":"0.1"},{"amino_acid":"P", "pos":"3", "frequency":"0.97"},{"amino_acid":"S", "pos":"1", "frequency":"0.98"}, {"amino_acid":"W", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"111", "frequency":"0.01"},{"amino_acid":"G", "pos":"3", "frequency":"0.02"},{"amino_acid":"A", "pos":"60", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"N", "pos":"100", "frequency":"0.48"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"L", "pos":"3", "frequency":"0.97"},{"amino_acid":"L", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"},{"amino_acid":"A", "pos":"1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"2", "frequency":"0.1"},{"amino_acid":"G", "pos":"3", "frequency":"0.97"}]},
    #     "meta": {"chain": "Heavy", "iso_type":"igG", "species": "Human", "sequence": data_json["sequence"]}
    # }
    # new_obj = create_annotation(data_json["sequence"])
    # myobj = export_to_json(new_obj, to_file=False)
    # print(myobj)
#print(results)
    time.sleep(2)
    return {"data":results}

@app.route("/blast", methods=["POST"])
def exec_blast():
    data = str(request.data.decode('utf-8'))
    print(data, type(data))
    data_json = ast.literal_eval(data)
    results = run_blast_search(data_json['sequence'], "23")
    return {"data": results}

def run_blast_search(seq, job_id):
    tmp_file = NamedTemporaryFile(prefix="blast_query_", delete=False)
    outfile = NamedTemporaryFile(prefix="blast_result_", delete=False)
    with open(tmp_file.name, "w") as file_in:
        inhalt = ">"+job_id+"\n"+seq
        file_in.write(inhalt)
    cmd=shlex.split(f'blastp -query {tmp_file.name} -db ../../../blast/db_blast_in.faa -outfmt 6 -out {outfile.name}')
    print(cmd)
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
    print(json_result)
    return json_result

    #igblastp -germline_db_V database/human_V -query ../query.faa -db ../../../blast/db_blast_in.faa -outfmt 7 -organism human 
    #IN /home/jannis/Dokumente/Uni/Bachelor/database/igblast/ncbi-igblast-1.16.0

@app.route("/search", methods=["POST"])
def fetchFromDB():
    data = str(request.data.decode('utf-8'))
    print(data, type(data))
    data_json = ast.literal_eval(data)

    meta_key = str(data_json["templateIDs"][0])
    print(meta_key)
    db = ABDatabase(**cred)
    db.close()
    db.open(**cred)
    loadedData = db.selectByMetaKey(meta_key)
    print("LOADEDDATA", loadedData)
    dataset = {
        "id": loadedData[0],
        "meta_key": loadedData[1],
        "seq": loadedData[2],
        "chain_type": loadedData[3],
        "iso_type": loadedData[4],
        "germline": loadedData[5],
        "species": loadedData[6],
        "disease": loadedData[7],
        "v_gene": loadedData[8],
        "j_gene": loadedData[9],
        "origin": loadedData[10]
    }
    print(dataset)

    db.close()
    return {"data":dataset}
    # results = run_blast_search(data_json['sequence'], "23")
    # return {"data": results}