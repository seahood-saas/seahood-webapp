db = db.getSiblingDB("crimeSample");
db.createCollection("hoods");
hoodsCollection = db.getCollection("hoods");
hoodsCollection.remove({});
hoodsCollection.insert({
  hoodId: 1,
  beat: "W2",
  name: "ALASKA JUNCTION",
  reports: [
    {
      reportId: 1,
    },
    {
      reportId: 3,
    },
    {
      reportId: 9,
    },
    {
      reportId: 11,
    },
  ],
});

hoodsCollection.insert({
  hoodId: 2,
  beat: "W1",
  name: "ALKI",
  reports: [
    {
      reportId: 2,
    },
    {
      reportId: 4,
    },
    {
      reportId: 5,
    },
    {
      reportId: 8,
    },
  ],
});
hoodsCollection.insert({
  hoodId: 3,
  beat: "J1",
  name: "BALLARD NORTH",
  reports: [
    {
      reportId: 6,
    },
    {
      reportId: 7,
    },
    {
      reportId: 10,
    },
  ],
});


hoodsCollection.insert({
    hoodId: 4,
    beat: "B1",
    name: "BALLARD SOUTH",
    reports: [

    ],
  });

hoodsCollection.insert({
hoodId: 5,
beat: "D1",
name: "BELLTOWN",
reports: [

],
});
hoodsCollection.insert({
hoodId: 6,
beat: "N1",
name: "BITTERLAKE",
reports: [

],
});


hoodsCollection.insert({
hoodId: 7,
beat: "S2",
name: "BRIGHTON/DUNLAP",
reports: [

],
});


hoodsCollection.insert({
hoodId: 8,
beat: "E1",
name: "CAPITOL HILL",
reports: [

],
});


hoodsCollection.insert({
hoodId: 9,
beat: "G2",
name: "CENTRAL AREA/SQUIRE PARK",
reports: [
    

],
});



hoodsCollection.insert({
hoodId: 10,
beat: "K3",
name: "CHINATOWN/INTERNATIONAL DISTRICT",
reports: [

],
});

hoodsCollection.insert({
hoodId: 11,
beat: "R2",
name: "CLAREMONT/RIANIER VISTA",
reports: [

],
});

hoodsCollection.insert({
hoodId: 12,
beat: "R3",
name: "COLUMBIA CITY",
reports: [

],
});


hoodsCollection.insert({
hoodId: 13,
beat: "W1",
name: "COMMERCIAL DUWAMISH",
reports: [

],
});

hoodsCollection.insert({
hoodId: 14,
beat: "W1",
name: "COMMERCIAL HARBOR ISLAND",
reports: [

],
});

hoodsCollection.insert({
hoodId: 15,
beat: "M2",
name: "DOWNTOWN COMMERCIAL",
reports: [

],
});

hoodsCollection.insert({
hoodId: 16,
beat: "C1",
name: "EASTLAKE-EAST",
reports: [

],
});

hoodsCollection.insert({
hoodId: 17,
beat: "D3",
name: "EASTLAKE-WEST",
reports: [

],
});
hoodsCollection.insert({
hoodId: 18,
beat: "W3",
name: "FAUTLEROY SW",
reports: [

],
});

hoodsCollection.insert({
hoodId: 19,
beat: "E3",
name: "FIRST HILL",
reports: [

],
});
hoodsCollection.insert({
hoodId: 20,
beat: "B2",
name: "FREMONT",
reports: [

],
});

hoodsCollection.insert({
hoodId: 21,
beat: "R3",
name: "GENESEE",
reports: [

],
});

hoodsCollection.insert({
hoodId: 22,
beat: "O3",
name: "GEORGETOWN",
reports: [

],
});

hoodsCollection.insert({
hoodId: 23,
beat: "J1",
name: "GREENWOOD",
reports: [

],
});

hoodsCollection.insert({
hoodId: 24,
beat: "F1",
name: "HIGH POINT",
reports: [

],
});

hoodsCollection.insert({
hoodId: 25,
beat: "F3",
name: "HIGHLAND PARK",
reports: [

],
});

hoodsCollection.insert({
hoodId: 26,
beat: "L1",
name: "LAKE CITY",
reports: [

],
});


hoodsCollection.insert({
hoodId: 27,
beat: "R3",
name: "LAKEWOOD/SEWARD PARK",
reports: [

],
});