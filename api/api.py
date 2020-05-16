from flask import Flask, request
from flask_cors import CORS
import time
import json
import ast

app = Flask(__name__)
CORS(app)

@app.route("/",methods=['POST'])
def get_current_time():
    datastring = str(request.data.decode("utf-8"))
    #print(datastring)
    results = [{"amino_acid":"A", "pos":"L1", "frequency":"0.98"}, {"amino_acid":"L", "pos":"L2", "frequency":"0.1"},{"amino_acid":"G", "pos":"L3", "frequency":"0.97"}]
    print(results)
    data_json = ast.literal_eval(datastring)
    time.sleep(5)
    return {"data":results}