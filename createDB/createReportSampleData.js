db = db.getSiblingDB("crimeSample");
db.createCollection("reports");
reportsCollection = db.getCollection("reports");
reportsCollection.remove({});
reportsCollection.insert({
  reportId: 1,
  hoodId: 1,
  crimeId: 1,
});
reportsCollection.insert({
  reportId: 2,
  hoodId: 2,
  crimeId: 2,
});
reportsCollection.insert({
  reportId: 3,
  hoodId: 1,
  crimeId: 3,
});
reportsCollection.insert({
  reportId: 4,
  hoodId: 2,
  crimeId: 4,
});
reportsCollection.insert({
  reportId: 5,
  hoodId: 2,
  crimeId: 5,
});
reportsCollection.insert({
  reportId: 6,
  hoodId: 3,
  crimeId: 6,
});
reportsCollection.insert({
  reportId: 7,
  hoodId: 3,
  crimeId: 7,
});
reportsCollection.insert({
  reportId: 8,
  hoodId: 2,
  crimeId: 8,
});
reportsCollection.insert({
  reportId: 9,
  hoodId: 1,
  crimeId: 9,
});
reportsCollection.insert({
  reportId: 10,
  hoodId: 3,
  crimeId: 10,
});
reportsCollection.insert({
  reportId: 11,
  hoodId: 1,
  crimeId: 11,
});

