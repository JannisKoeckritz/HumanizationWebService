import random
import json

valid_aa = ["A","C","D","E","F","G","H","I","K","L","M","N","P","Q","R","S","T","V","W","Y"]

dump_data = {}

for elem in ["kabat","imgt","chothia"]:
    dump_data[elem] = []
    for i in range(120):
        pos = str(i+1)
        random_aa = str(valid_aa[random.randint(0,len(valid_aa)-1)])
        frequency = str(round(random.random(),2))
        cdr = "false"
        if i in range(36,41) or i in range(55,75) or i in range(107,118):
            cdr = "true"
        dump_data[elem].append({"amino_acid":random_aa, "pos":pos, "frequency":frequency, "cdr": cdr})

with open("api_example.txt","w") as out:
    json.dump(dump_data, out)