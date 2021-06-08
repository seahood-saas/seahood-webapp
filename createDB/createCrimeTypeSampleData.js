db = db.getSiblingDB("crimeSample");
db.createCollection("crime type");
crimesTypeCollection = db.getCollection("crime type");
crimesTypeCollection.remove({});
data = [
    {"Id":"1","name": "ARSON"},
    {"Id":"2","name": "ASSULT OFFENSES"},
    {"Id":"3","name": "BURGLARY/BREAKING&ENTERING"},
    {"Id":"4","name": "COUNTERFEITING/FORGERY"},
    {"Id":"5","name": "DESTRUCTION/DAMAGE/VANDALISM OF PROPERTY"},
    {"Id":"6","name": "DRIVING UNDER THE INFLUENCE"},
    {"Id":"7","name": "FRAUD OFFENSES"},
    {"Id":"8","name": "LARCENY-THEFT"},
    {"Id":"9","name": "MOTOR VEHICLE THEFT"},
    {"Id":"10","name": "ROBBERY"},
    {"Id":"11","name": "STOLEN PROPERTY OFFENSES"},
    {"Id":"12","name": "TRESPASS OF REAL POPERTY"},
    {"Id":"13","name": "WEAPON LAW VIOLATIONS"},
]
crimesTypeCollection.insertMany(data);
