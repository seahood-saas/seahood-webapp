db = db.getSiblingDB("crimeSample");
db.createCollection("users");
usersCollection = db.getCollection("users");
usersCollection.remove({});

usersCollection.insert({
    ssoId: "1a2b3c",
    name: "Jasmine Rice",
    email: "jasminerice@gmail.com",
});
usersCollection.insert({
    ssoId: "456xyz",
    name: "Jennifer Aberham",
    email: "jenny@gmail.com",
});
usersCollection.insert({
    ssoId: "4x5y6z",
    name: "Jake Riley",
    email: "jriley@gmail.com",
});
usersCollection.insert({
    ssoId: "hello555",
    name: "Timothy Math",
    email: "ticktocktim@gmail.com",
});
usersCollection.insert({
    ssoId: "testing123",
    name: "Simmon Ray",
    email: "simray@gmail.com",
});
usersCollection.insert({
    ssoId: "123abc",
    name: "Dorthy Kentucky",
    email: "friendlydorthy@gmail.com",
});
usersCollection.insert({
    ssoId: "testingabc",
    name: "Morthy McMorthy",
    email: "morthyception@gmail.com",
});
usersCollection.insert({
    ssoId: "eazyish",
    name: "Ishlar Goon",
    email: "ishlar@gmail.com",
});
usersCollection.insert({
    ssoId: "johnnyd69123abc",
    name: "Johnny Depp",
    email: "johnnyd69@gmail.com",
});

