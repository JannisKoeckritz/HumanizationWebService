from humanize_db.core.db import ABDatabase
from decouple import config
from tqdm import tqdm
import logging




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

def addLetterToPosition():
    alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    db = ABDatabase(**credentials)
    db.close()
    tables = ['chothia_annotation']
    for table in tables:
        for pos in tqdm(range(100,115)): #set to (1,200)
            db.open(**credentials)
            results = db.selectByPosition(table, pos)
            logging.info(f"Updating {len(results)} results with position {pos}")
            resultsdict = {}
            for ind, r in enumerate(results):
                resultsdict[ind] = list(r)
            for i, r in enumerate(resultsdict.keys()):
                nextItemId = i+1
                item_id = resultsdict[r][0]
                meta_key = resultsdict[r][1]
                position = resultsdict[r][2]
                letter = position[-1]
                try:
                    nextItem = resultsdict[nextItemId]
                    next_item_id = nextItem[0]
                    next_meta_key = nextItem[1]
                    next_position = nextItem[2]
                    next_letter = next_position[-1]
                    if item_id+1 == next_item_id and meta_key == next_meta_key:
                        if letter in alph:
                            nextLetter = returnNextLetter(letter)
                            if nextLetter:
                                resultsdict[nextItemId][2] += str(nextLetter)
                        else:
                            nextLetter = "A"
                            if nextLetter:
                                resultsdict[nextItemId][2] += str(nextLetter)
                except Exception as err:
                    logging.debug(err)
                    continue

            logging.info(f"Start updating.")
            updateResults = []
            counter = 0
            for resultItem in resultsdict.keys():
                resultId = resultsdict[resultItem][0]
                resultKey = resultsdict[resultItem][1]
                resultPos = resultsdict[resultItem][2]
                if str(pos) != str(resultPos):
                    counter +=1
                    updateResults.append({"id":resultId,"meta_key":str(resultKey),"new_position":str(resultPos)})
            logging.info(f"Updated {counter} values.")
            db.updateMultipleEntries(table=table, entries=updateResults)
            logging.info("Finished updating.")
            db.close()
            

def returnNextLetter(letter):
    alph = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    try:
        indexOfLetter = alph.index(letter)
        return alph[indexOfLetter+1]
    except Exception as err:
        #print(err)
        return False

if __name__ == "__main__":
    logging.basicConfig(filename="logger.log",level=logging.DEBUG,format="%(asctime)s:%(levelname)s:%(message)s")
    addLetterToPosition()